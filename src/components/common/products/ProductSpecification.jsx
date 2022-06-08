const ProdcutSpecification = (props) => {
  const { category, weight, brand, color } = props;
  return (
    <div id="specification" className=" border p-4 text-sm">
      <table className="w-full">
        <tbody className="divide-y text-left  divide-gray-200">
          <tr>
            <th className="py-3 px-6">Category</th>
            <td className="py-3 px-6">{category[0].name}</td>
          </tr>
          <tr>
            <th className="py-3 px-6">Brand</th>
            <td className="py-3 px-6">{brand.name}</td>
          </tr>
          <tr>
            <th className="py-3 px-6">Color</th>
            <td className="py-3 px-6">{color}</td>
          </tr>
          <tr>
            <th className="py-3 px-6">Material</th>
            <td className="py-3 px-6">Cotton</td>
          </tr>
          <tr>
            <th className="py-3 px-6">Weight</th>
            <td className="py-3 px-6">{weight}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProdcutSpecification;
