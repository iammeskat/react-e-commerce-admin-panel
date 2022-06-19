const Home = () => {
  return (
    <div className="flex flex-col grow px-3 md:px-6 py-3 space-y-4 bg-slate-200 transition-all duration-200">
      {/* <!-- start body header --> */}
      <div className="flex justify-between">
        {/* <!-- Include the section title  --> */}
        <h2 className="text-3xl font-bold text-gray-800 uppercase">
          Section Title
        </h2>
        {/* <!-- start section options  --> */}
        <div className="flex items-center space-x-4">
          <h2 className="hidden md:block">Other options</h2>
          <button className="flex items-center space-x-2 bg-indigo-600 text-slate-100 h-8 px-1.5 rounded hover:bg-indigo-700">
            <span className="font-semibold">Open Modal</span>
          </button>
        </div>
        {/* <!-- end section options  --> */}
      </div>
      {/* <!-- end body header  --> */}

      {/* <!-- start body  --> */}
      <div className="w-full bg-white mb-10">
        {/* <RichTextEditor /> */}
        {/* <div className="h-96 flex items-center justify-center">
          <h1>Write your code here</h1>
        </div> */}
        <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20 mb-20">
          <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
            <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
            <div className="flex flex-col space-y-3">
              <div className="w-36 bg-gray-300 h-6 rounded-md "></div>
              <div className="w-24 bg-gray-300 h-6 rounded-md "></div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- end body  --> */}
      {/* <!-- end main body section  --> */}
    </div>
  );
};

export default Home;
