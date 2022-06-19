import axios from "axios";
import { useContext, useState } from "react";
import { useAlert } from "react-alert";
import config from "../../../config/config";
import { GlobalContext } from "../../../context/GlobalContext";
import IconPlusItem from "../icons/IconPlusItem";
import BtnCloseModal from "./BtnCloseModal";
import BtnModalAdd from "./BtnModalAdd";
import BtnModalCancel from "./BtnModalCancel";
import InputComp from "./InputComp";
import SelectComp from "./SelectComp";

const FormAdmin = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [formData, setFormData] = useState(
    contextData.modal.mode === "create"
      ? {
          name: "",
          status: "",
          email: "",
          password: "",
          passwordConfirmation: "",
          role: "admin",
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
  const hasError = () => {
    let error = {};
    for (let [key, value] of Object.entries({ ...formData })) {
      if (!value) {
        error[key] = `${key} is required`;
      }
    }
    console.log(error);
    if (Object.keys(error).length > 0) {
      setError({ ...error });
      return true;
    } else {
      return false;
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (hasError()) {
      console.log(errors);
      return;
    } else {
      if (contextData.modal.mode === "create") {
        axios
          .post(`${config.SERVER_URL}/api/admin/users`, formData)
          .then((res) => {
            contextData.handleModal();

            alert.success(res.data.message);
          })
          .catch((error) => {
            if (error.response.status === 422) {
              let getErrors = {};
              Object.entries(error.response.data.errors).forEach(
                ([key, value]) => {
                  getErrors[key] = value.msg;
                }
              );
              setError(getErrors);
              console.log(error.response.data.errors);
            } else {
              alert.error("Something went wrong! Please try again.");
            }
          });
      } else {
        axios
          .put(`${config.SERVER_URL}/api/admin/users/${formData._id}`, formData)
          .then((res) => {
            contextData.handleModal();
            alert.success(res.data.message);
          })
          .catch((error) => {
            if (error.response.status === 422) {
              let getErrors = {};
              Object.entries(error.response.data.errors).forEach(
                ([key, value]) => {
                  getErrors[key] = value.msg;
                }
              );
              setError(getErrors);
              console.log(error.response.data.errors);
            } else {
              alert.error("Something went wrong! Please try again.");
            }
          });
      }
    }
  };
  return (
    <div className="mx-auto w-[34rem]">
      <div className="relative py-5 px-5 md:px-10 bg-white shadow-md rounded border border-gray-400">
        <div className="w-full flex justify-start items-center space-x-2 text-gray-600 mb-3">
          <IconPlusItem />
          <span className="text-2xl font-bold">
            {contextData.modal.mode === "create" ? "New Admin" : "Update Admin"}
          </span>
        </div>
        <h1 className="text-gray-800 font-lg font-bold tracking-normal leading-tight mb-4">
          Enter Admin Info
        </h1>
        <form onSubmit={(e) => formSubmitHandler(e)} className="space-y-2">
          <div className="grid grid-cols-1 space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <InputComp
                handler={handleFormData}
                errMsg={errors.name}
                label="Name"
                id="name"
                name="name"
                type="text"
                value={formData.name}
                placeholder="Enter name"
              />
              <InputComp
                handler={handleFormData}
                errMsg={errors.email}
                label="Email"
                id="email"
                name="email"
                type="email"
                value={formData.email}
                placeholder="Enter email"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <InputComp
                handler={handleFormData}
                errMsg={errors.password}
                label="Password"
                id="password"
                name="password"
                type="password"
                value={formData.password}
                placeholder="Enter password"
              />
              <InputComp
                handler={handleFormData}
                errMsg={errors.passwordConfirmation}
                label="Confirm Password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                placeholder="Confirm password"
              />
            </div>

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
            <BtnModalAdd /> <BtnModalCancel />
          </div>
        </form>
        <BtnCloseModal />
      </div>
    </div>
  );
};

export default FormAdmin;
