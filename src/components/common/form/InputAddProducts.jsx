import InputComp from "./InputComp";
import SelectComp from "./SelectComp";

const InputAddProducts = () => {
  const handleFormData = () => {};
  const formData = {};
  const errors = {};
  return (
    <div className="shadow p-2 bg-slate-100">
      <div className="grid grid-cols-3 gap-2">
        <InputComp
          handler={handleFormData}
          errMsg={errors.deal_value}
          label="Product Name"
          id="deal_value"
          name="deal_value"
          type="number"
          value={formData.deal_value}
          placeholder="Enter product name"
        />
        <SelectComp
          handler={handleFormData}
          errMsg={errors.dealer}
          label="Category"
          id="dealer"
          name="dealer"
          value={formData.dealer}
          options={[
            { value: "active", name: "Active" },
            { value: "inactive", name: "Inactive" },
          ]}
        />
        <SelectComp
          handler={handleFormData}
          errMsg={errors.dealer}
          label="Brand"
          id="dealer"
          name="dealer"
          value={formData.dealer}
          options={[
            { value: "active", name: "Active" },
            { value: "inactive", name: "Inactive" },
          ]}
        />
        {/* <div className="col-span-2">
          <InputCatComp
            categories={[{ value: "mm", name: "test" }]}
            values={[{ value: "mm", name: "test" }]}
          />
        </div> */}
        <InputComp
          handler={handleFormData}
          errMsg={errors.due}
          label="Quantity"
          id="due"
          name="due"
          type="number"
          value={formData.due}
          placeholder="Enter due"
        />
        <InputComp
          handler={handleFormData}
          errMsg={errors.due}
          label="Unit Cost"
          id="due"
          name="due"
          type="number"
          value={formData.due}
          placeholder="Enter due"
        />
        <div className="flex flex-col justify-end">
          <button
            //   onClick={handler}
            type="button"
            className="focus:outline-none transition duration-150 ease-in-out hover:bg-slate-300 bg-slate-200  border-indigo-700 rounded text-indigo-700 px-8 py-2.5 text-sm font-medium"
          >
            Add to products
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputAddProducts;
