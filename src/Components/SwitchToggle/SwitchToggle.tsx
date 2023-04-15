import React from "react"
import PropTypes from "prop-types";

//css
import "./SwitchToggle.css";

function SwitchToggle({setIsChecked, isChecked}) {
  return (
    <div className="switch">
      <span>
        <input
          type="checkbox"
          id="toggleInput"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <button
          className="slider"
          type="button"
          onClick={() => setIsChecked(!isChecked)}
        ></button>
      </span>
    </div>
  );
}


SwitchToggle.propTypes = {
  isChecked: PropTypes.bool,
  setIsChecked: PropTypes.any,
}


export default SwitchToggle