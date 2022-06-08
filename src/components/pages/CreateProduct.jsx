import ProductFormComp from "../common/form/ProductFormComp";
import PageHeader from "../common/PageHeader";

const CreateProduct = () => {
  return (
    <div
      id="main-section"
      className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 bg-slate-200 transition-all duration-200"
    >
      <PageHeader title="ADD PRODUCT" />
      <div className="w-full">
        <ProductFormComp />
      </div>
    </div>
  );
};

export default CreateProduct;
