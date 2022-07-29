import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import config from "../../config/config";
import { GlobalContext } from "../../context/GlobalContext";
import BtnCreate from "../common/form/BtnCreate";
import OrderBillingAddress from "../common/order/OrderBillingAddress";
import OrderCustomerDetails from "../common/order/OrderCustomerDetails";
import OrderDeliverStatus from "../common/order/OrderDeliveryStatus";
import OrderItems from "../common/order/OrderItems";
import OrderPaymentDetails from "../common/order/OrderPaymentDetails";
import OrderShippingAddress from "../common/order/OrderShippingAddress";
import PageHeader from "../common/PageHeader";

const OrderDetails = () => {
  const alert = useAlert();
  const contextData = useContext(GlobalContext);
  const [data, setData] = useState();
  const orderId = useParams().id;

  // fetch orders
  useEffect(() => {
    let isLoaded = true;
    axios
      .get(`${config.SERVER_URL}/api/admin/orders/${orderId}`)
      .then((res) => {
        isLoaded && setData(res.data.data.order);
        console.log(res.data.data.order);
      })
      .catch((error) => console.log(error));
    return () => (isLoaded = false);
  }, [orderId]);

  return (
    data && (
      <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4  transition-all duration-200">
        <PageHeader
          title="ORDER DETAILS"
          render={
            <>
              <BtnCreate title="Create Product" to="./create" />
            </>
          }
        />

        <div className="w-full">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 text-gray-700">
            {/* <!-- left side  --> */}
            <div className="grow space-y-4">
              <OrderItems
                items={data.cartItem}
                discount={data.discount}
                orderId={data._id}
              />
              <OrderDeliverStatus />
            </div>
            {/* <!-- right side  --> */}
            <div className="min-w-[20rem] space-y-4">
              <OrderPaymentDetails />
              {/* <OrderDeliveryman /> */}
              <OrderCustomerDetails />
              <OrderBillingAddress />
              <OrderShippingAddress />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default OrderDetails;