import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "../../config/config";
import BtnCreate from "../common/form/BtnCreate";
import OfferedProducts from "../common/OfferedProducts";
import OfferInfo from "../common/OfferInfo";
import PageHeader from "../common/PageHeader";

const OfferDetails = () => {
  const offerId = useParams().id;
  const [data, setData] = useState([]);

  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/offers/${offerId}`)
      .then((res) => {
        isLoaded && setData(res.data.data.offer);
        // console.log(res.data.data.offer.products);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [offerId]);

  return Object.keys(data).length > 0 ? (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200">
      <PageHeader
        title="offer DETAILS"
        render={
          <>
            <BtnCreate title="Create Product" to="./create" />
          </>
        }
      />

      <div className="w-full">
        <div className="flex flex-col lg:flex-row lg:space-x-4  text-gray-700">
          <OfferInfo data={data} />
          <div className="grow overflow-hidden rounded shadow">
            <OfferedProducts
              products={data.products}
              offerId={offerId}
              section={"offers"}
            />
          </div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default OfferDetails;
