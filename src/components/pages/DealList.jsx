import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCreate from "../common/form/BtnCreate";
import InputSearch from "../common/form/InputSearch";
import PageFooter from "../common/PageFooter";
import PageHeader from "../common/PageHeader";
import BtnProductDelete from "../common/table/BtnProductDelete";
import BtnProductEdit from "../common/table/BtnProductEdit";
import FilterOption from "../common/table/FilterOption";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const DealList = () => {
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
    "DEALER",
    "MANAGER",
    "QTY",
    "AMOUNT",
    "DUE",
    "STATUS",
    "DATE",
    "ACTION",
  ];

  const columnData = [
    {
      path: "dealer.company",
      label: "Dealer",
      content: (data) => data.dealer.company,
    },
    {
      path: "dealer.name",
      label: "Manager",
      content: (data) => data.dealer.name,
    },
    {
      path: "dealer.name",
      label: "Manager",
      content: (data) => data.products.length,
    },
    {
      path: "deal_value",
      label: "Amount",
      content: (data) => data.deal_value,
    },
    {
      path: "due",
      label: "Due",
      content: (data) => data.due,
    },
    {
      path: "status",
      label: "status",
      content: (data) => {
        if (data.payment_status === "paid") {
          return (
            <div className="inline-flex font-medium bg-green-100 text-green-600 rounded-full text-center px-2.5 py-0.5">
              Paid
            </div>
          );
        } else
          return (
            <div className="inline-flex font-medium bg-yellow-100 text-yellow-600 rounded-full text-center px-2.5 py-0.5">
              Unpaid
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
          <BtnProductEdit />{" "}
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
      .get(`${config.SERVER_URL}/api/admin/deals`)
      .then((res) => {
        isLoaded && setData(res.data.data.deal);
        console.log(res.data.data.deal);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);

  const deleteItem = (itemId, itemName) => {
    axios
      .delete(`http://localhost:3050/api/admin/deals/${itemId}`)
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
        if (item.payment_status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item.dealer.company.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.dealer.name.toLowerCase().includes(searchKey.toLowerCase())
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
        title="DEALS"
        render={
          <>
            <BtnCreate title="Create Product" to="./create" />
          </>
        }
      />
      <div className="">
        <div className="overflow-x-auto">
          <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[34rem] overflow-y-auto relative">
            <TableHeader
              tableName="DEAL LIST"
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
                      { name: "Paid", value: "paid" },
                      { name: "Risidual", value: "risidual" },
                      { name: "Unpaid", value: "unpaid" },
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

export default DealList;
