import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { removeUserSession } from "../../Helpers/Utils/Common";
import { getName, getType, getRole } from "../../Helpers/Utils/Common";
import MenuItem from "./MenuItem";
import PropTypes from "prop-types";

//css
import "../Navbar/Navbar.css";

//icons
import logo from "../../Assets/Images/Login/logo.png";
import reports from "../../Assets/Images/Navbar/reports.png";
import dashboard from "../../Assets/Images/Navbar/dashboard.png";
import logout from "../../Assets/Images/Navbar/logout.png";
import SwitchToggle from "Components/SwitchToggle/SwitchToggle";
import { any } from "prop-types";

interface NavProp {
  onCollapse: any;
  active: string;
  setIsChecked: any;
  isChecked: boolean;
}

export default function Navbar(props: NavProp) {
  const adminItems = [
    {
      name: "DASHBOARD",
      exact: true,
      to: "/dashboard",
      iconClassName: dashboard,
      expand: true,
    },
    {
      name: "MANAGE",
      exact: true,
      to: "/",
      iconClassName: reports,
      subMenus: [
        { name: "Users", to: "/users" },
        { name: "Customers", to: "/customers" },
      ],
      expand: true,
    },
  ];

  const [inactive, setInactive] = useState(true);
  const [menuItems, setMenuItems] = useState(adminItems);

  const handleExpand = (index) => {
    var list = [...menuItems];

    if (!inactive) {
      for (var i = 0; i < list.length; i++) {
        if (i !== index) {
          list[i].expand = true;
        }
      }

      list[index].expand = !list[index].expand;

      setMenuItems(list);
    }
  };

  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  useEffect(() => {
    /** INSERT CONDITIONS BELOW FOR THE USER RESTRICTED NAVBAR ITEM
     * 
     * 
     * 
     const role = getRole();
     const type = getType();

    if (role === "Admin" && type === "manager") {
      setMenuItems(adminManagerItems);
    } else if (role === "Admin" && type === "staff") {
      setMenuItems(adminStaffItems);
    } else if (role === "Finance" && type === "manager") {
      setMenuItems(financeManagerItems);
    } else if (role === "Finance" && type === "staff") {
      setMenuItems(financeStaffItems);
    } else if (role === "Operations" && type === "manager") {
      setMenuItems(operationsManagerItems);
    } else if (role === "Operations" && type === "staff") {
      setMenuItems(operationsStaffItems);
    } else if (role === "BU head") {
      setMenuItems(buHeadItems);
    }  
    
    **/

    let menuItemsList = document.querySelectorAll(".menu-item");
    menuItemsList.forEach((el, index) => {
      if (menuItems[index].name === props.active) {
        el.classList.add("active");
      }
      el.addEventListener("click", (e) => {
        const next = el.nextElementSibling;
        removeActiveClassFromSubMenu();
        menuItemsList.forEach((item) => item.classList.remove("active"));
        el.classList.toggle("active");
        if (next !== null) {
          next.classList.toggle("active");
        }
      });
    });
  }, []);

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo d-flex justify-content-center">
          <img
            alt={"navbar-logo"}
            src={logo}
            className="navbar-logo"
            onClick={() => setInactive(!inactive)}
          />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <div className="max-menu-cont">
              <FontAwesomeIcon
                icon={"angle-double-right"}
                className={"max-menu"}
                aria-hidden="true"
              />
            </div>
          ) : (
            <FontAwesomeIcon
              icon={"angle-double-left"}
              className={"min-menu"}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <div className={inactive ? "main-menu" : "main-menu active-menu"}>
        {menuItems.map((menuItem, index) => (
          <MenuItem
            key={index}
            name={menuItem.name}
            exact={menuItem.exact.toString()}
            to={menuItem.to}
            subMenus={menuItem.subMenus || []}
            iconClassName={menuItem.iconClassName}
            expandManage={menuItem.expand}
            setExpandManage={handleExpand}
            index={index}
            activeSub={menuItem.name === props.active}
            onClick={() => {
              if (inactive) {
                setInactive(false);
              }
            }}
          />
        ))}
      </div>
      <div className="side-menu-footer">
        <hr className="line" />
        {!inactive && (
          <div className="user-details-footer">
            <div className="account-label">
              <div className="profile">
                <FontAwesomeIcon
                  icon={"user"}
                  className={"profile-icon"}
                  aria-hidden="true"
                />
                <div className="navbar-user-label">{getName()}</div>
                <br />
                <div className="user-type-label">{getType()}</div>
              </div>
            </div>
          </div>
        )}
        <hr className="line" />
        <div className="logout-cont" onClick={removeUserSession}>
          <img alt={"logout-icon"} src={logout} className="logout-btn" />
          <span className="logout-label">LOG OUT</span>
        </div>
        <hr className="line" />
        <SwitchToggle
          setIsChecked={props.setIsChecked}
          isChecked={props.isChecked}
        />
        <div className="dark-mode-label">
          <FontAwesomeIcon
            icon={"moon"}
            className={"dark-mode-icon"}
            aria-hidden="true"
          />
          Dark Mode
        </div>
      </div>
    </div>
  );
}

//DEFINE DATA TYPES
Navbar.propTypes = {
  props: PropTypes.any,
};
