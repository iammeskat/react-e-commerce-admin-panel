import IconPlus from "../icons/IconPlus";
const BtnModal = (props) => {
  const { title, onClickHandler } = props;
  // const contextData = useContext(GlobalContext);
  return (
    <>
      <button
        className="flex items-center space-x-2 bg-indigo-700 text-slate-100 h-8 px-1.5 rounded hover:bg-indigo-600"
        onClick={onClickHandler}
      >
        <IconPlus />
        <span>{title}</span>
      </button>
    </>
  );
};

export default BtnModal;
