const OrderDetailsHeader = (props) => {
  return (
    <div className="flex justify-between items-center p-3">
      <h2 className="font-medium text-lg uppercase">
        Order #{props.orderId.slice(-10)}
      </h2>
      <button className="flex items-center text-white bg-teal-500 rounded space-x-1 py-1 px-1.5 border">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
        <span className="text-sm">Invoice</span>
      </button>
    </div>
  );
};

export default OrderDetailsHeader;
