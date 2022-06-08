import IconCreditCard from "../icons/IconCreditCard";

const OrderPaymentDetails = () => {
  return (
    <div className="flex flex-col bg-white px-3 rounded space-y-2 pb-2">
      <div className="flex items-center space-x-1 border-b py-3">
        <IconCreditCard />
        <h2 className="font-medium">Payment Details</h2>
      </div>
      <div className="flex flex-col space-y-2">
        <p className="font-medium text-sm">
          <span className="text-gray-500">Transactions: </span>
          #PUCS1245678912
        </p>
        <p className="font-medium text-sm">
          <span className="text-gray-500">Payment Method: </span> Debit Card
        </p>
        <p className="font-medium text-sm">
          <span className="text-gray-500">Card Holder Name: </span>
          Joseph Parker
        </p>
        <p className="font-medium text-sm">
          <span className="text-gray-500">Card Number: </span> xxxx xxxx xxxx
          2456
        </p>
        <p className="font-medium text-sm">
          <span className="text-gray-500">Total Amount: </span> $415.96
        </p>
      </div>
    </div>
  );
};

export default OrderPaymentDetails;
