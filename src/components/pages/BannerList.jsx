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
import FilterOption from "../common/table/FilterOption";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const BannerList = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [data, setData] = useState();
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    status: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
  });

  const columnHeader = [
    "IMAGE",
    "TITLE",
    "SIZE",
    "STATUS",
    "CREATED AT",
    "ACTION",
  ];

  const columnData = [
    {
      path: "productName",
      label: "Product Name",
      content: (data) => (
        <div className="flex items-center space-x-2">
          <img
            className="h-16 w-32 my-2 mr-2 border-gray-200"
            src={data.image_path ? data.image_path : "../images/product.webp"}
            alt=""
          />
        </div>
      ),
    },
    {
      path: "title",
      label: "title",
      content: (data) => "Banner Title",
    },
    {
      path: "size",
      label: "Size",
      content: (data) => data.size,
    },
    {
      path: "status",
      label: "status",
      content: (data) => {
        if (data.status === "active") {
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
    {
      path: "createdAt",
      label: "Created At",
      content: (data) => data.createdAt.split("T")[0],
    },

    {
      path: "action",
      label: "Action",
      content: (data) => (
        <>
          <BtnProductEdit
            onClickHandler={() =>
              contextData.handleModal("banner", "update", {
                status: data.status,
                id: data._id,
                link_to: data.link_to,
                size: data.size,
              })
            }
          />{" "}
          <BtnProductDelete
            handler={() =>
              contextData.handlerDeleteModal(() =>
                deleteItem(data._id, data.title)
              )
            }
          />
        </>
      ),
    },
  ];

  // fetch banners
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/banners`)
      .then((res) => {
        isLoaded && setData(res.data.data.banner);
        console.log(res.data.data.banner);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);

  const deleteItem = (itemId, itemName) => {
    axios
      .delete(`http://localhost:3050/api/admin/banners/${itemId}`)
      .then((res) => {
        const tempData = data.filter((item) => {
          if (item._id === itemId) return false;
          else return true;
        });
        setData([...tempData]);
        contextData.handlerDeleteModal();
        alert.success(
          `The banner '${itemName}' has been successfully deleted.`
        );
      })
      .catch((error) => {
        contextData.handlerDeleteModal();
        console.log(error);
        alert.error("Failed to delete the banner!");
      });
  };

  const setFilterOptions = (option, value) => {
    if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { status, searchKey } = options;

    let filteredItems = [...data];

    if (status !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item.title.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.description.toLowerCase().includes(searchKey.toLowerCase())
        ) {
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

  let filteredItems = data ? filterItems() : [];
  let paginatedItems = data ? paginateItems(filteredItems) : [];

  return data ? (
    <div
      id="main-section"
      className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 bg-slate-200 transition-all duration-200"
    >
      <PageHeader
        title="BANNERS"
        render={
          <>
            <BtnModal
              title="Banner"
              onClickHandler={() => contextData.handleModal("banner", "create")}
            />
          </>
        }
      />
      <div className="">
        <div className="overflow-x-auto">
          <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[34rem] overflow-y-auto relative">
            <TableHeader
              tableName="BANNER LIST"
              numberOfItem={filteredItems.length}
              filterOptions={
                <>
                  <InputSearch
                    placeholder="Search slider..."
                    handler={search}
                  />
                  <FilterOption
                    label="Status"
                    filterBy="status"
                    options={[
                      { name: "Active", value: "active" },
                      { name: "Inactive", value: "inactive" },
                      { name: "Discontinued", value: "discontinued" },
                    ]}
                    onChangeHandler={setFilterOptions}
                  />
                  <button className="bg-gray-200 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                      />
                    </svg>
                  </button>
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
        {data.length > options.pageCount ? (
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
  ) : (
    ""
  );
};

export default BannerList;
