import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCreate from "../common/form/BtnCreate";
import InputSearch from "../common/form/InputSearch";
import SelectCompForTable from "../common/form/SelectCompForTable";
import PageFooter from "../common/PageFooter";
import PageHeader from "../common/PageHeader";
import BtnProductDelete from "../common/table/BtnProductDelete";
import BtnProductEdit from "../common/table/BtnProductEdit";
import FilterOption from "../common/table/FilterOption";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const OrderList = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [data, setData] = useState();
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    status: "all",
    paymentStatus: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
  });

  const columnHeader = [
    "ORDER ID",
    "CUSTOMER NAME",
    "CITY",
    "CALL STATUS",
    "PHONE",
    "PAYMENT STATUS",
    "ORDER PLACED",
    "STATUS",
    "ACTION",
  ];
  const changeOrderStatus = (id, key, value) => {
    // console.log(id);
    // console.log(key);
    // console.log(value);
    let tempData = data.map((item) => {
      if (item._id === id) {
        item[key] = value;
      }
      return item;
    });
    setData(tempData);
    axios
      .put(`${config.SERVER_URL}/api/admin/orders/${id}`, { [key]: value })
      .then((res) => {
        alert.success("Order was updated suceesfully!");
      })
      .catch((error) => {
        alert.error("Something wrong please try again");
        console.log(error);
      });
  };
  const columnData = [
    {
      path: "id",
      label: "Order Id",
      content: (data) => (
        <Link to={`/orders/${data._id}`}>
          <h1 className="uppercase hover:text-indigo-500">
            {data._id.slice(-10)}
          </h1>
        </Link>
      ),
    },
    {
      path: "productName",
      label: "Product Name",
      content: (data) => data.user.name,
    },

    {
      path: "city",
      label: "City",
      content: (data) => data.address.city,
    },
    {
      path: "call_status",
      label: "Call Status",
      content: (data) => (
        <SelectCompForTable
          id={data._id}
          name="call_status"
          value={data.call_status}
          handler={changeOrderStatus}
          options={[
            { name: "No Call", value: "no_call" },
            { name: "One Time", value: "one_time" },
            { name: "Two Time", value: "two_time" },
            { name: "Three Time", value: "three_time" },
          ]}
        />
      ),
    },
    {
      path: "phone",
      label: "Phone",
      content: (data) => data.address.phone,
    },
    {
      path: "paymentStatus",
      label: "Payment Status",
      content: (data) => (
        <SelectCompForTable
          id={data._id}
          name="paymentStatus"
          value={data.paymentStatus}
          handler={changeOrderStatus}
          options={[
            { name: "Unpaid", value: "pending" },
            { name: "Paid", value: "complete" },
          ]}
        />
      ),
    },
    {
      path: "createdAt",
      label: "Order Placed",
      content: (data) => data.createdAt.split("T")[0],
    },
    {
      path: "status",
      label: "status",
      content: (data) => (
        <SelectCompForTable
          id={data._id}
          name="status"
          value={data.status}
          handler={changeOrderStatus}
          options={[
            { name: "Pending", value: "pending" },
            { name: "Processing", value: "processing" },
            { name: "Shipping", value: "Shipped" },
            { name: "Delivered", value: "delivered" },
            { name: "Returned", value: "returned" },
            { name: "Cancelled", value: "cancelled" },
          ]}
        />
      ),
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
                deleteItem(data._id, data.name)
              )
            }
          />
        </>
      ),
    },
  ];

  // fetch orders
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/orders`)
      .then((res) => {
        isLoaded && setData(res.data.data.orders);
        // console.log(res.data.data.orders);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);

  const deleteItem = (itemId, itemName) => {
    axios
      .delete(`http://localhost:3050/api/admin/orders/${itemId}`)
      .then((res) => {
        const tempData = data.filter((item) => {
          if (item._id === itemId) return false;
          else return true;
        });
        setData([...tempData]);
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
    } else if (option === "paymentStatus") {
      setOptions({ ...options, paymentStatus: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { status, paymentStatus, searchKey } = options;

    let filteredItems = [...data];

    if (status !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (paymentStatus !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.paymentStatus === paymentStatus) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }
    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item._id.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.user.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.address.city.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.address.phone.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.createdAt.toLowerCase().includes(searchKey.toLowerCase())
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
        title="ORDERS"
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
              tableName="ORDER LIST"
              numberOfItem={filteredItems.length}
              filterOptions={
                <>
                  <InputSearch placeholder="Search order..." handler={search} />
                  <FilterOption
                    label="Paymnet"
                    filterBy="paymentStatus"
                    options={[
                      { name: "Pending", value: "pending" },
                      { name: "Complete", value: "complete" },
                    ]}
                    onChangeHandler={setFilterOptions}
                  />
                  <FilterOption
                    label="Status"
                    filterBy="status"
                    options={[
                      { name: "Pending", value: "pending" },
                      { name: "Processing", value: "processing" },
                      { name: "Shipping", value: "shipped" },
                      { name: "Delivered", value: "delivered" },
                      { name: "Returned", value: "returned" },
                      { name: "Cancelled", value: "cancelled" },
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

export default OrderList;
