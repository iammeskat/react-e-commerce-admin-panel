import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";
import PageHeader from "../common/PageHeader";
import ProductColors from "../common/products/ProductColors";
import ProductDescription from "../common/products/ProductDescription";
import ProductFeatures from "../common/products/ProductFeatures";
import ProductHead from "../common/products/ProductHead";
import ProductInfo from "../common/products/ProductInfo";
import ProductPhotoSlider from "../common/products/ProductPhotoSlider";
import ProductRating from "../common/products/ProductRating";
import ProductRatingsReviews from "../common/products/ProductRatingsReviews";
import ProductServices from "../common/products/ProductServices";
import ProductShortDescription from "../common/products/ProductShortDescription";
import ProductSize from "../common/products/ProductSize";

const ProductDetails = () => {
  const params = useParams();
  const productId = params.id;
  console.log(productId);
  const [product, setProduct] = useState();

  // fetch product
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/products/${productId}`)
      .then((res) => {
        isLoaded && setProduct(res.data.data.product);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [productId]);
  // product && console.log(product);
  return product ? (
    <div
      className={`flex flex-col grow px-3 md:px-6 py-3 space-y-4 bg-slate-200 transition-all duration-200`}
    >
      <PageHeader title="PRODUCT DETAILS" />

      <div className="w-full bg-white p-2">
        <div className="flex flex-col 2xl:flex-row 2xl:space-x-8 mb-10">
          {/* <!-- product gallery  --> */}
          <ProductPhotoSlider photos={product.photos} />
          <div className="flex flex-col lg:flex-grow ">
            <div className="basic-info space-y-1">
              <ProductHead
                name={product.name}
                publishedDate={product.createdAt}
              />
              <ProductRating />
              <ProductInfo data={product} />
            </div>
            <div className="flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between pt-4">
              <ProductSize />
              <ProductColors />
            </div>
            <ProductShortDescription description={product.description} />
            <div className="flex flex-col lg:flex-row justify-start pt-4 space-y-3 lg:space-y-0 lg:space-x-1">
              <ProductFeatures />
              <ProductServices />
            </div>
            <ProductDescription data={product} />
            <ProductRatingsReviews reviews={product.reviews} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    "Something went wrong!"
  );
};

export default ProductDetails;
