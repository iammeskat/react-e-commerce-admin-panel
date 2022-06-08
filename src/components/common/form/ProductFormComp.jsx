import axios from "axios";
import { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config";
import InputCatComp from "./InputCatComp";
import InputComp from "./InputComp";
import InputMultipleImgComp from "./InputMultipleImgComp";
import SelectComp from "./SelectComp";
import TextAreaComp from "./TextAreaComp";

const ProductFormComp = () => {
  const alert = useAlert();
  const history = useNavigate();
  const [categories, setCategories] = useState();
  const [brands, setBrands] = useState();
  const [data, setData] = useState({
    name: null,
    price: null,
    description: null,
    category: null,
    brand: null,
    quantity: null,
    photos: null,
    unitPrice: null,
    size: null,
    color: null,
    weight: null,
    status: null,
  });
  const [errors, setError] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    brand: "",
    quantity: "",
    photos: "",
    unitPrice: "",
    size: "",
    color: "",
    weight: "",
    status: "",
  });
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
      .get(`${config.SERVER_URL}/api/admin/brands`)
      .then((res) => {
        isLoaded && setBrands(res.data.data.brands);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);

  const handleFormData = (key, value) => {
    // console.log(value);
    let tempData = { ...data };

    tempData[key] = value;

    setData(tempData);

    if (errors[key]) {
      let tempErrors = { ...errors };
      tempErrors[key] = "";
      setError(tempErrors);
    }
  };

  const errorHandler = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...data })) {
      if (!value) {
        error[key] = `${key} is required`;
      }
    }
    if (!error) {
      return false;
    } else {
      setError(error);
      return true;
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const hasErrors = errorHandler();
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return;
    }
    axios
      .post(`${config.SERVER_URL}/api/admin/products`, data)
      .then((res) => {
        // console.log(res.data);
        alert.success(`Success`);
        history("/products");
      })
      .catch((error) => {
        alert.error(`Failed`);
        console.log(error.response.data.errors);
      });
  };

  return brands ? (
    <form
      action=""
      encType="multipart/form-data"
      onSubmit={(e) => formSubmitHandler(e)}
    >
      <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-gray-700">
        <div className="grow space-y-4">
          <div className="flex flex-col bg-white rounded p-4 space-y-4">
            <InputComp
              handler={handleFormData}
              errMsg={errors.name}
              label="Product Title"
              id="product-tile"
              name="name"
              type="text"
              placeholder="Enter product title"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectComp
                handler={handleFormData}
                errMsg={errors.brand}
                label="Brand"
                id="brand"
                name="brand"
                options={
                  brands &&
                  brands.map((item) => {
                    return { value: item._id, name: item.name };
                  })
                }
              />

              <SelectComp
                handler={handleFormData}
                errMsg={errors.category}
                label="Category"
                id="category"
                name="category"
                options={
                  categories &&
                  categories.map((item) => {
                    return { value: item._id, name: item.name };
                  })
                }
              />
            </div>
            <InputCatComp
              handler={handleFormData}
              errMsg={errors.category}
              categories={categories}
              values={[]}
            />
            <TextAreaComp
              handler={handleFormData}
              errMsg={errors.shortDescription}
              label="Short Description"
              id="shortDescription"
              name="shortDescription"
              placeholder="Enter short description"
              rows="3"
            />
            <TextAreaComp
              handler={handleFormData}
              errMsg={errors.description}
              label="Full Description"
              id="full-description"
              name="description"
              placeholder="Enter full description"
              rows="8"
            />
            {/* <InputComp
              handler={handleFormData}
              errMsg={errors.photo}
              label="Product Image"
              id="product-image"
              name="photo"
              type="file"
              placeholder="Enter product title"
            /> */}

            <InputMultipleImgComp
              handler={handleFormData}
              errMsg={errors.photos}
              label="Select Photos"
              id="photos"
              name="photos"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.tags}
              label="Product Tags"
              id="tags"
              name="tags"
              type="text"
              placeholder="Enter product tags"
            />
          </div>
        </div>
        {/* <!-- right side  --> */}
        <div className="xl:min-w-[25.5rem] min-w-[20rem] space-y-4 min-h-[24rem] flex flex-col justify-betweenm">
          <div className="p-4 rounded bg-white space-y-4">
            <InputComp
              handler={handleFormData}
              errMsg={errors.unitPrice}
              label="Unit Cost"
              id="unit-cost"
              name="unitPrice"
              type="number"
              placeholder="Enter unit cost"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.price}
              label="Selling Price"
              id="selling-price"
              name="price"
              type="number"
              placeholder="Enter selling price"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.quantity}
              label="Quantity"
              id="quantity"
              name="quantity"
              type="number"
              placeholder="Enter product quantity"
            />
          </div>
          <div className="p-4 rounded bg-white space-y-4">
            <InputComp
              handler={handleFormData}
              errMsg={errors.color}
              label="Color"
              id="color"
              name="color"
              type="color"
              value="#f2f2f2"
              placeholder="Enter product tags"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.size}
              label="Size"
              id="size"
              name="size"
              type="text"
              placeholder="Enter product size"
            />
            <InputComp
              handler={handleFormData}
              errMsg={errors.weight}
              label="Weight"
              id="weight"
              name="weight"
              type="text"
              placeholder="Enter product weight"
            />
          </div>
          <div className="p-4 rounded bg-white space-y-4">
            <SelectComp
              handler={handleFormData}
              errMsg={errors.status}
              label="Status"
              id="status"
              name="status"
              options={[
                { value: "active", name: "Active" },
                { value: "inactive", name: "Inactive" },
                { value: "discontinued", name: "Discontinued" },
              ]}
            />
            {/* <SelectComp
              handler={handleFormData}
              errMsg={errors.visibility}
              label="Visibility"
              id="visibility"
              name="visibility"
              options={[
                { value: "1", name: "Public" },
                { value: "2", name: "Hidden" },
              ]}
            /> */}

            <InputComp
              handler={handleFormData}
              errMsg={errors.publishDate}
              label="Publish Date"
              id="publish-date"
              name="publishDdate"
              type="date"
            />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 mt-5">
        <button
          type="submit"
          className="bg-teal-500 py-2 px-6 rounded text-white hover:bg-teal-600"
        >
          Add Product
        </button>
        <button
          type="button"
          className="bg-gray-500 py-2 px-6 rounded text-white hover:bg-gray-600"
        >
          Cancel
        </button>
      </div>
    </form>
  ) : (
    ""
  );
};

export default ProductFormComp;
