import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalContext";
import SidebarSubMenuButton from "./SidebarSubMenuButton";
const SidebarNavItem = (props) => {
  const { title, icon, to, indx } = props;

  const contextData = useContext(GlobalContext);
  const active = (indx) => {
    setTimeout(() => {
      contextData.handleActiveTab(indx);
    }, 0);
  };
  return (
    <li>
      <div
        className={`group rounded p-1 hover:bg-gray-900  ${
          contextData.activeTab === indx ? "bg-gray-900" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <NavLink
            to={to}
            className={(st) => {
              if (st.isActive) {
                active(indx);
              }
            }}
            // onClick={() => contextData.handleActiveTab(indx)}
          >
            <div className="flex grow items-center">
              <img src={icon} alt={title} />
              <span
                id="sidebar-item-title"
                className="sidebar-item-title ml-2 font-semibold"
                style={{ display: contextData.sidebar.titleDisplay }}
              >
                {title}
              </span>
            </div>
          </NavLink>
          {contextData.sidebar.showSubMenuButton && <SidebarSubMenuButton />}
        </div>
      </div>
    </li>
  );
};

export default SidebarNavItem;
