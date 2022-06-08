import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext";
const Header = () => {
  const contextData = useContext(GlobalContext);

  return (
    <header className="sticky top-0 flex px-3 md:px-6 py-3 justify-between items-center bg-gray-700 text-slate-200 z-20">
      {/* <!-- start left items  --> */}
      <div className="flex items-center space-x-5">
        <button
          onClick={contextData.showMobileSidebar}
          className="md:hidden bg-gray-800 p-1 rounded-full hover:bg-gray-900 hover:text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <span
          id="time"
          className="hidden lg:block text-xl font-semibold"
        ></span>
      </div>
      {/* <!-- end left items  -->
          <!-- start right items  --> */}
      <div className="">
        <ul className="flex space-x-5 font-medium items-center">
          <li className="flex">
            <div className="relative hidden md:block">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id=""
                className="block p-2 pl-10 w-full text-gray-200 bg-gray-800 rounded-lg border border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div>
          </li>
          <li className="flex">
            <button className="relative inline-block bg-gray-800 rounded-full p-1 hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
            </button>
          </li>
          <li className="flex">
            <button className="relative inline-block bg-gray-800 rounded-full p-1 hover:bg-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              <span className="absolute top-1 right-1 inline-block w-2 h-2 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"></span>
            </button>
          </li>
          <li>
            <button className="flex items-center pl-2 rounded-full space-x-3 hover:bg-gray-800">
              <span className="hidden md:block">Username</span>
              <img
                className="w-8 h-8 rounded-full ring"
                // className="h-20 w-20"
                src="../images/user.png"
                alt=""
              />
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
