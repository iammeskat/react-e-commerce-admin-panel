import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import FormBanner from "./form/FormBanner";
import FormBrand from "./form/FormBrand";
import FormCategory from "./form/FormCategory";
import FormSlider from "./form/FormSlider";

const Modal = () => {
  const contextData = useContext(GlobalContext);
  const renderModal = () => {
    switch (contextData.modal.compName) {
      case "brand":
        return <FormBrand />;
      case "category":
        return <FormCategory />;
      case "slider":
        return <FormSlider />;
      case "banner":
        return <FormBanner />;
      default:
        return <h1>Something went wrong. Please reload thi page</h1>;
    }
  };

  return contextData.modal.show ? (
    <div className="py-10 bg-gray-900 bg-opacity-50 transition duration-150 ease-in-out z-50 absolute top-0 right-0 bottom-0 left-0 h-full">
      {renderModal()}
    </div>
  ) : (
    ""
  );
};

export default Modal;
