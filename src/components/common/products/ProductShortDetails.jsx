const ProductShortDetails = () => {
  return (
    <div className="border p-4 text-sm">
      <div className="flex flex-col space-y-4 text-gray-600">
        <h2 className="text-xl">Tommy Hilfiger Sweatshirt for Men (Pink)</h2>
        <p className="text-sm font-base">
          {`Tommy Hilfiger men striped pink sweatshirt. Crafted with cotton.
          Material composition is 100% organic cotton. This is one of the
          world's leading designer lifestyle brands and is internationally
          recognized for celebrating the essence of classNameic American cool
          style, featuring preppy with a twist designs.`}
        </p>
        <ul className="list-disc ml-5 text-sm text-gray-600 font-base space-y-1">
          <li>Full Sleeve</li>
          <li>Cotton</li>
          <li>All Sizes available</li>
          <li>4 Different Color</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductShortDetails;
