import IconCopy from "../icons/IconCopy";
import IconDb from "../icons/IconDb";
import IconDownload from "../icons/IconDownload";
import IconTaka from "../icons/IconTaka";
import ProductInfoSpan from "./ProductInfoSpan";

const ProductInfo = (props) => {
  const { price, totalSale, quantity } = props.data;
  return (
    <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 pt-4">
      <ProductInfoSpan title="Price :" data={`$${price}`} icon={<IconTaka />} />
      <ProductInfoSpan
        title="No. of Order :"
        data={totalSale}
        icon={<IconCopy />}
      />
      <ProductInfoSpan
        title="Available Stocks:"
        data={quantity}
        icon={<IconDb />}
      />
      <ProductInfoSpan
        title="Total Rev.:"
        data={`$60,645*`}
        icon={<IconDownload />}
      />
    </div>
  );
};

export default ProductInfo;
