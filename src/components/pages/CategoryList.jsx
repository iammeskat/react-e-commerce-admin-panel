import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import BtnModal from "../common/form/BtnModal";
import InputSearch from "../common/form/InputSearch";
import PageFooter from "../common/PageFooter";
import PageHeader from "../common/PageHeader";
import BtnProductDelete from "../common/table/BtnProductDelete";
import BtnProductEdit from "../common/table/BtnProductEdit";
import BtnSorting from "../common/table/BtnSorting";
import FilterOption from "../common/table/FilterOption";
import ItemImg from "../common/table/ItemImg";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const CategoryList = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    status: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
  });
  const getParentName = (id) => {
    let parent = categories.find(function (cat) {
      return cat._id === id;
    });
    return parent["name"];
  };
  // console.log(getParentName("625d2a9725ebf6fb519ca9cc"));
  const columnHeader = [
    "NAME",
    "PARENT",
    "STATUS",
    "CREATED AT",
    "UPDATED AT",
    "ACTION",
  ];

  const columnData = [
    {
      content: (category) => (
        <ItemImg link={""} imgLink={""} title={category.name} />
      ),
    },
    {
      content: (category) =>
        category.parent_id ? getParentName(category.parent_id) : "",
    },
    {
      content: (category) => {
        if (category.status === "active") {
          return (
            <div className="inline-flex font-medium bg-green-100 text-green-600 rounded-full text-center px-2.5 py-0.5">
              Active
            </div>
          );
        } else
          return (
            <div className="inline-flex font-medium bg-yellow-100 text-yellow-600 rounded-full text-center px-2.5 py-0.5">
              Inactive
            </div>
          );
      },
    },
    { content: (category) => category.createdAt.split("T")[0] },
    { content: (category) => category.updatedAt.split("T")[0] },

    {
      content: (category) => (
        <div className="text-right pr-6">
          <BtnProductEdit
            onClickHandler={() =>
              contextData.handleModal("category", "update", {
                name: category.name,
                status: category.status,
                id: category._id,
                parent_id: category.parent_id,
              })
            }
          />{" "}
          <BtnProductDelete
            handler={() =>
              contextData.handlerDeleteModal(() =>
                deleteItem(category._id, category.name)
              )
            }
          />
        </div>
      ),
    },
  ];

  // fetch categories
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/categories`, config.headers)
      .then((res) => {
        isLoaded && setCategories(res.data.data.categories);
        console.log(res.data.data.categories);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);

  const deleteItem = (itemId, itemName) => {
    axios
      .delete(
        `http://localhost:3050/api/admin/categories/${itemId}`,
        config.headers
      )
      .then((res) => {
        const tempProdcuts = categories.filter((item) => {
          if (item._id === itemId) return false;
          else return true;
        });
        setCategories([...tempProdcuts]);
        contextData.handlerDeleteModal();
        alert.success(
          `The product '${itemName}' has been successfully deleted.`
        );
      })
      .catch((error) => {
        contextData.handlerDeleteModal();
        console.log(error);
        alert.error("Failed to delete the product!");
      });
  };

  const setFilterOptions = (option, value) => {
    if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { status, searchKey } = options;

    let filteredItems = [...categories];

    if (status !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.name.toLowerCase().includes(searchKey.toLowerCase())) {
          return true;
        } else return false;
      });
      filteredItems = [...tempItems];
    }
    return filteredItems;
  };

  const search = (keyword) => {
    setTimeout(() => {
      setOptions({ ...options, searchKey: keyword, activePage: 1 });
    }, 300);
  };

  const paginateItems = (items) => {
    const { activePage, pageCount } = options;
    const start = (activePage - 1) * pageCount;
    const paginatedItems = items.slice(start, start + pageCount);
    return paginatedItems;
  };

  const handleClickPage = (page, totalPage) => {
    if (page < 1 || page > totalPage) return;
    setOptions({ ...options, activePage: page });
  };

  let filteredItems = categories ? filterItems() : [];
  let paginatedItems = categories ? paginateItems(filteredItems) : [];

  return (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 transition-all duration-200">
      <PageHeader
        title="CATEGORIES"
        render={
          <>
            <InputSearch placeholder="Search categories..." handler={search} />
            <BtnModal
              title="Category"
              onClickHandler={() =>
                contextData.handleModal("category", "create")
              }
            />
          </>
        }
      />
      <div className="">
        <div className="overflow-x-auto">
          <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[33.5rem] overflow-y-auto relative">
            <TableHeader
              tableName="CATEGORY LIST"
              numberOfItem={filteredItems.length}
              filterOptions={
                <>
                  <FilterOption
                    label="Status"
                    filterBy="status"
                    options={[
                      { name: "Active", value: "active" },
                      { name: "Inactive", value: "inactive" },
                    ]}
                    onChangeHandler={setFilterOptions}
                  />
                  <BtnSorting />
                </>
              }
            />
            <Table
              columnHeader={columnHeader}
              columns={columnData}
              items={paginatedItems}
              activePage={options.activePage}
              pageCount={options.pageCount}
            />
          </div>
        </div>
        {categories.length > options.pageCount ? (
          <PageFooter
            totalItems={filteredItems.length}
            pageCount={options.pageCount}
            activePage={options.activePage}
            onClickPage={handleClickPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CategoryList;
