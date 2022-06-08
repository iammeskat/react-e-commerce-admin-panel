const ProductShortDescription = (props) => {
  return (
    <div className="pt-4 space-x-1">
      <h2 className="font-medium text-gray-700">Description</h2>
      <p className="text-sm font-medium text-gray-400 text-justify">
        {props.description}
      </p>
    </div>
  );
};

export default ProductShortDescription;
