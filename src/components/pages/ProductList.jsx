import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCreate from "../common/form/BtnCreate";
import InputSearch from "../common/form/InputSearch";
import IconEdit from "../common/icons/IconEdit";
import PageFooter from "../common/PageFooter";
import PageHeader from "../common/PageHeader";
import BtnProductDelete from "../common/table/BtnProductDelete";
import FilterOption from "../common/table/FilterOption";
import Table from "../common/table/Table";
import TableHeader from "../common/table/TableHeader";

const ProductList = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [products, setProducts] = useState();
  const [brands, setBrands] = useState();
  const [categories, setCategories] = useState();
  const [options, setOptions] = useState({
    activePage: 1,
    pageCount: 20,
    selectedCategory: "all",
    selectedBrand: "all",
    status: "all",
    searchKey: "all",
    sortColumn: { path: "asc", order: "createdAt" },
  });

  const columnHeader = [
    "PRODUCT NAME",
    "CATEGORY",
    "BRAND",
    "QUANTITY",
    "SALE",
    "CREATED AT",
    "MRP",
    "STATUS",
    "ACTION",
  ];

  const columnData = [
    {
      path: "productName",
      label: "Product Name",
      content: (product) => (
        <div>
          <Link
            to={`./${product._id}`}
            className="flex items-center space-x-2 hover:text-indigo-500"
          >
            <img
              className="h-10 w-10 rounded-full border-2 border-gray-200"
              src={
                product.photos.length > 0
                  ? "http://localhost:3050/file/images/" + product.photos[0]
                  : // product.photos[0].split("/")[2]
                    "../images/product.webp"
              }
              alt=""
            />
            <p>{product.name}</p>
          </Link>
        </div>
      ),
    },
    {
      path: "category",
      label: "Category",
      content: (product) => product.category[0]["name"],
    },
    {
      path: "brand",
      label: "Brand",
      content: (product) => product.brand.name,
    },
    {
      path: "quantity",
      label: "Quantity",
      content: (product) => product.quantity,
    },
    {
      path: "sale",
      label: "Sale",
      content: (product) => "sale",
    },
    {
      path: "createdAt",
      label: "Created At",
      content: (product) => product.createdAt.split("T")[0],
    },
    {
      path: "price",
      label: "Price",
      content: (product) => product.price,
    },
    {
      path: "status",
      label: "status",
      content: (product) => {
        if (product.status === "active") {
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
      path: "action",
      label: "Action",
      content: (product) => (
        <div className="flex space-x-2">
          <Link to={`${product._id}/update`}>
            <div className="aspect-square w-8 h-8 rounded-full bg-slate-200 p-1 text-indigo-700 hover:bg-slate-300">
              <IconEdit />
            </div>
          </Link>
          <BtnProductDelete
            handler={() =>
              contextData.handlerDeleteModal(() =>
                deleteProduct(product._id, product.name)
              )
            }
          />
        </div>
      ),
    },
  ];

  // fetch products
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/products`)
      .then((res) => {
        isLoaded && setProducts(res.data.data.products);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);

  // fetch categories
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/categories`)
      .then((res) => {
        isLoaded && setCategories(res.data.data.categories);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  // fetch brands
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`http://localhost:3050/api/admin/brands`)
      .then((res) => {
        isLoaded && setBrands(res.data.data.brands);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  const deleteProduct = (itemId, itemName) => {
    axios
      .delete(`${config.SERVER_URL}/api/admin/products/${itemId}`)
      .then((res) => {
        const tempProdcuts = products.filter((item) => {
          if (item._id === itemId) return false;
          else return true;
        });
        setProducts([...tempProdcuts]);
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
    if (option === "category") {
      setOptions({ ...options, selectedCategory: value, activePage: 1 });
    } else if (option === "brand") {
      setOptions({ ...options, selectedBrand: value, activePage: 1 });
    } else if (option === "status") {
      setOptions({ ...options, status: value, activePage: 1 });
    }
  };

  const filterItems = () => {
    const { selectedCategory, selectedBrand, status, searchKey } = options;

    let filteredItems = [...products];

    if (selectedBrand !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.brand.name === selectedBrand) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }

    if (status !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (item.status === status) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }

    if (selectedCategory !== "all") {
      const tempItems = filteredItems.filter((item) => {
        const categories = item.category.map(({ name }) => name);

        if (categories.includes(selectedCategory)) return true;
        else return false;
      });
      filteredItems = [...tempItems];
    }

    if (searchKey !== "all") {
      const tempItems = filteredItems.filter((item) => {
        if (
          item.name.toLowerCase().includes(searchKey.toLowerCase()) ||
          item.brand.name.toLowerCase().includes(searchKey.toLowerCase())
        ) {
          return true;
        } else return false;
      });
      filteredItems = [...tempItems];
    }

    // setOptions({ ...options, activePage: 1 });
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

  let filteredItems = products ? filterItems() : [];
  let paginatedItems = products ? paginateItems(filteredItems) : [];

  return (
    products &&
    brands &&
    categories && (
      <div
        id="main-section"
        className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 bg-slate-200 transition-all duration-200"
      >
        <PageHeader
          title="PRODUCTS"
          render={
            <>
              <InputSearch placeholder="Search products..." handler={search} />
              <BtnCreate title="Create Product" to="./create" />
            </>
          }
        />
        <div className="">
          <div className="overflow-x-auto">
            <div className="bg-white shadow-lg rounded-sm border border-gray-200 mb-2 min-w-[60rem] h-[34rem] overflow-y-auto relative">
              <TableHeader
                tableName="PRODUCT LIST"
                numberOfItem={filteredItems.length}
                filterOptions={
                  <>
                    <FilterOption
                      label="Category"
                      filterBy="category"
                      options={
                        categories &&
                        categories.map((item) => {
                          return { name: item.name, value: item.name };
                        })
                      }
                      onChangeHandler={setFilterOptions}
                    />
                    <FilterOption
                      label="Brand"
                      filterBy="brand"
                      options={
                        brands &&
                        brands.map((item) => {
                          return { name: item.name, value: item.name };
                        })
                      }
                      onChangeHandler={setFilterOptions}
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
          {products.length > options.pageCount ? (
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
    )
  );
};

export default ProductList;
