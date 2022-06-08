import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../../config/config";
import { GlobalContext } from "../../../context/GlobalContext";
import IconPlusItem from "../icons/IconPlusItem";
import BtnCloseModal from "./BtnCloseModal";
import BtnModalAdd from "./BtnModalAdd";
import BtnModalCancel from "./BtnModalCancel";
import InputComp from "./InputComp";
import SelectComp from "./SelectComp";

const FormCategory = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [categories, setCategories] = useState();
  const [formData, setFormData] = useState(
    contextData.modal.mode === "create"
      ? {
          name: "",
          status: "",
        }
      : contextData.modal.data
  );
  const [errors, setError] = useState({});
  const handleFormData = (key, value) => {
    let tempData = { ...formData };

    tempData[key] = value;

    setFormData(tempData);

    if (errors[key]) {
      let tempErrors = { ...errors };
      tempErrors[key] = "";
      setError(tempErrors);
    }
  };
  const errorHandler = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...formData })) {
      if (!value) {
        error[key] = `${key} is required`;
      }
    }
    console.log(error);
    if (!error) {
      return false;
    } else {
      setError({ ...error });
      return true;
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (!errorHandler()) {
      console.log(errors);
    } else {
      if (contextData.modal.mode === "create") {
        axios
          .post(`${config.SERVER_URL}/api/admin/categories`, formData)
          .then((res) => {
            contextData.handleModal();
            alert.success(res.data.message);
          })
          .catch((error) => {
            alert.error(error.response.data.errors.name.msg);
          });
      } else {
        axios
          .put(
            `${config.SERVER_URL}/api/admin/categories/${formData.id}`,
            formData
          )
          .then((res) => {
            contextData.handleModal();
            alert.success(res.data.message);
          })
          .catch((error) => {
            alert.error(error.response.data.errors.name.msg);
          });
      }
    }
  };
  // fetch categories
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/categories`)
      .then((res) => {
        isLoaded && setCategories(res.data.data.categories);
        // console.log(res.data.data.categories);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, []);
  return (
    categories && (
      <div className="mx-auto w-[28rem]">
        <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
          <div className="w-full flex justify-start items-center space-x-2 text-gray-600 mb-3">
            <IconPlusItem />
            <span className="text-2xl font-bold">
              {contextData.modal.mode === "create"
                ? "New Category"
                : "Update Category"}
            </span>
          </div>
          <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
            Enter Category Details
          </h1>
          <form onSubmit={(e) => formSubmitHandler(e)} className="space-y-2">
            <div className="grid grid-cols-1 space-y-4">
              <InputComp
                handler={handleFormData}
                errMsg={errors.name}
                label="Category Name"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                placeholder="Enter category name"
              />
              <SelectComp
                handler={handleFormData}
                errMsg={errors.parent_id}
                label="Parent"
                id="parent_id"
                name="parent_id"
                value={formData.parent_id}
                options={
                  categories &&
                  categories.map((item) => {
                    return { value: item._id, name: item.name };
                  })
                }
              />
              <SelectComp
                handler={handleFormData}
                errMsg={errors.status}
                label="Status"
                id="status"
                name="status"
                value={formData.status}
                options={[
                  { value: "active", name: "Active" },
                  { value: "inactive", name: "Inactive" },
                ]}
              />
            </div>
            <div className="flex items-center justify-start w-full">
              <BtnModalAdd />
              <BtnModalCancel />
            </div>
          </form>
          <BtnCloseModal />
        </div>
      </div>
    )
  );
};

export default FormCategory;
