const OrderDeliverStatus = () => {
  return (
    <div className="bg-white rounded text-gray-800">
      <div className="flex justify-between items-center p-3 border-b">
        <h2 className="font-medium text-lg">Order Status</h2>
        <div className="flex space-x-1">
          <button className="flex items-center text-sky-500 bg-sky-100 rounded space-x-1 py-1 px-1.5">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="text-sm">Change Address</span>
          </button>
          <button className="flex items-center text-red-500 bg-red-100 rounded space-x-1 py-1 px-1.5">
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
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-sm">Cancel Order</span>
          </button>
        </div>
      </div>
      <div className="p-8">
        <div className="space-y-2 border-dashed border-l-2 pl-6 pb-6">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="font-medium">
              Order Placed -
              <span className="font-normal">Wed, 15 Dec 2021</span>
            </h2>
          </div>
          <div className="font-medium text-sm">
            <p>An order has been placed</p>
            <p className="font-normal text-gray-500">
              Wed, 15 Dec 2021 - 05:45PM
            </p>
          </div>
          <div className="font-medium text-sm">
            <p>Processed order</p>
            <p className="font-normal text-gray-500">
              Thu, 16 Dec 2021 - 05:45PM
            </p>
          </div>
        </div>
        <div className="space-y-2 border-dashed border-l-2 pl-6 pb-6">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                />
              </svg>
            </div>
            <h2 className="font-medium">
              Packed -<span className="font-normal">Thu, 16 Dec 2021</span>
            </h2>
          </div>
          <div className="font-medium text-sm">
            <p>Packed has been picked up by courier partner</p>
            <p className="font-normal text-gray-500">
              Fri, 17 Dec 2021 - 05:45PM
            </p>
          </div>
        </div>
        <div className="space-y-2 border-dashed border-l-2 pl-6 pb-6">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>
            </div>
            <h2 className="font-medium">
              Shipping -<span className="font-normal">Thu, 16 Dec 2021</span>
            </h2>
          </div>
          <div className="font-medium text-sm">
            <p>PAPERFLY Logistics - MFDS1400457854</p>
            <p className="">Your item has been shipped</p>
            <p className="font-normal text-gray-500">
              Sat, 18 Dec 2021 - 05:45PM
            </p>
          </div>
          <div className="font-medium text-sm">
            <p>Processed order</p>
            <p className="font-normal text-gray-500">
              Thu, 16 Dec 2021 - 05:45PM
            </p>
          </div>
        </div>
        <div className="space-y-2 border-dashed border-l-2 pl-6 pb-6">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1v-5a1 1 0 00-.293-.707l-2-2A1 1 0 0015 7h-1z" />
              </svg>
            </div>
            <h2 className="font-medium">Out for delivery</h2>
          </div>
        </div>
        <div className="space-y-2 border-dashed border-l-2 pl-6">
          <div className="flex space-x-2">
            <div className="w-8 h-8 bg-teal-500 rounded-full -ml-[2.6rem] flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h2 className="font-medium">Delivered</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDeliverStatus;
