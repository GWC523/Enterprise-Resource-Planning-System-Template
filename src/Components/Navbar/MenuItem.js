import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @author
 * @function MenuItem
 **/

const MenuItem = (props) => {
  const {
    name,
    subMenus,
    iconClassName,
    onClick,
    to,
    exact,
    expandManage,
    setExpandManage,
    index,
  } = props;

  // carets for dropdown
  function caretDown() {
    return (
      <FontAwesomeIcon
        icon={"chevron-down"}
        aria-hidden="true"
        className="caret-icon align-self-center"
      />
    );
  }

  function caretUp() {
    return (
      <FontAwesomeIcon
        icon={"chevron-up"}
        aria-hidden="true"
        className="caret-icon align-self-center"
      />
    );
  }

  if (subMenus.length !== 0) {
    return (
      <li
        className={"menu-li"}
        onClick={() => {
          props.onClick();
          setExpandManage(index);
        }}
        title={name}
      >
        <div
          className={
            props.activeSub === true ? "menu-item li-active" : "menu-item"
          }
        >
          <div className="menu-icon">
            <img alt={"icon"} src={iconClassName} className="icon" />
          </div>
          <span className="nav-name">{name}</span>

          <span className="expand-icon">
            {expandManage === true ? caretDown() : caretUp()}
          </span>
        </div>
        {expandManage === false && subMenus && subMenus.length > 0 ? (
          <ul className={"sub-menu"}>
            {subMenus.map((menu, index) => (
              <li key={index} className="menu-li sub-item" title={menu.name}>
                <NavLink to={menu.to}>{menu.name}</NavLink>
              </li>
            ))}
          </ul>
        ) : null}
      </li>
    );
  } else {
    return (
      <li className="menu-li" onClick={props.onClick}>
        <Link exact={exact.toString()} to={to} className={"menu-item"}>
          <div className="menu-icon">
            <img alt={"icon"} src={iconClassName} className="icon" />
          </div>
          <span className="nav-name">{name}</span>
        </Link>
      </li>
    );
  }
};

MenuItem.propTypes = {
  name: PropTypes.any,
  subMenus: PropTypes.any,
  iconClassName: PropTypes.any,
  onClick: PropTypes.any,
  activeSub: PropTypes.any,
  to: PropTypes.any,
  exact: PropTypes.any,
  expandManage: PropTypes.any,
  setExpandManage: PropTypes.any,
  index: PropTypes.number,
};

export default MenuItem;
