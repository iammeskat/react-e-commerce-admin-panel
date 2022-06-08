import { useState } from "react";
import ProductShortDetails from "./ProductShortDetails";
import ProdcutSpecification from "./ProductSpecification";

const ProductDescription = (props) => {
  const data = props.data;
  const [tab, setTab] = useState(1);
  const changeTab = (val) => {
    setTab(val);
  };
  return (
    <div className="description pt-6 text-gray-700 font-medium">
      <h2>Product Description</h2>
      <div className="pt-4">
        <div className="">
          <button
            onClick={() => changeTab(1)}
            id="btn-speci"
            className={`px-4 py-2 font-medium border-b-2  ${
              tab === 1
                ? "text-teal-500 border-teal-500"
                : "hover:text-indigo-900"
            }`}
          >
            Specification
          </button>
          <button
            onClick={() => changeTab(2)}
            id="btn-details"
            className={`px-4 py-2 font-medium border-b-2  ${
              tab === 2
                ? "text-teal-500 border-teal-500"
                : "hover:text-indigo-900"
            }`}
          >
            Details
          </button>
        </div>
        {tab === 1 ? (
          <ProdcutSpecification
            category={data.category}
            brand={data.brand}
            weight={data.weight ? data.weight : "N/A"}
            color={data.color ? data.color : "N/A"}
          />
        ) : (
          <ProductShortDetails />
        )}
      </div>
    </div>
  );
};

export default ProductDescription;
