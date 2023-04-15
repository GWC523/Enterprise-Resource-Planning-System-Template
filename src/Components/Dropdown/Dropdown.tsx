import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Dropdown.css";

const Dropdown = ({type, options, onChange, defaultValue}) => {

  /** For flexibility, add type. 
   *  For default value, add selected condition to set value (ex: 
   * <option value={data.value} selected={data.value === defaultValue}>{data.name}</option)
   *  **/
 
  return (
    <>
      <select
        className="dropdown-1"
        name="role"
        onChange={(e) => onChange(e)}
      >
        {options.map((data, index) => {
            return <option value={data.value} key={index}>{data.name}</option>;
        })}
      </select>
    </>
  );
};

Dropdown.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default Dropdown;
