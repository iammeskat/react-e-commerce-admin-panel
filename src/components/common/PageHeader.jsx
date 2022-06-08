const PageHeader = (props) => {
  const { title, render } = props;
  return (
    <div className="flex justify-between">
      {/* <!-- Include the section title  --> */}
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
      {/* <!-- start section options  --> */}
      <div className="flex items-center space-x-4">{render}</div>
      {/* <!-- end section options  --> */}
    </div>
  );
};

export default PageHeader;
