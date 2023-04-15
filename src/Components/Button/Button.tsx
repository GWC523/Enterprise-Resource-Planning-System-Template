import React from "react";
import PropTypes from "prop-types";
import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CSVLink } from "react-csv";

//css
import "./Button.css";

const Button = ({
  type,
  title,
  role,
  className,
  isLoading,
  onClick,
  exportData,
  exportFileName,
}) => {
  if (isLoading) {
    return (
      <button role={role} className={className + " loader-btn spinning-loader"}>
        <ReactLoading
          type="spinningBubbles"
          color="#ff6700"
          height={28}
          width={30}
        />
      </button>
    );
  } else {
    if (type === "export-csv") {
      return (
        <CSVLink data={!exportData ? [] : exportData} filename={exportFileName}>
          <button role={role} className={className}>
            <FontAwesomeIcon
              icon={"file-export"}
              className={"export-icon"}
              aria-hidden="true"
            />
            {title}
          </button>
        </CSVLink>
      );
    }

    if (type === "export-pdf") {
      return (
          <button role={role} className={className} onClick={onClick}>
            <FontAwesomeIcon
              icon={"file-export"}
              className={"export-icon"}
              aria-hidden="true"
            />
            {title}
          </button>
      );
    }

    if (type === "cancel") {
      return (
        <button
          className="main-cancel-btn-long-form"
          onClick={() => onClick("cancel")}
        >
          Cancel
        </button>
      );
    }

    if (type === "cancel-modal") {
      return (
        <button className="main-cancel-btn-form" onClick={onClick}>
          Cancel
        </button>
      );
    }

    if (type === "submit") {
      return (
        <button className="main-save-btn-long-form" onClick={onClick}>
          Save
        </button>
      );
    }

    if (type === "delete-modal") {
      return (
        <button className="main-delete-btn-form" onClick={onClick}>
          Delete
        </button>
      );
    }

    return (
      <button role={role} className={className} onClick={onClick}>
        {title}
      </button>
    );
  }
};

Button.propTypes = {
  type: PropTypes.string,
  title: PropTypes.string,
  role: PropTypes.string,
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  onClick: PropTypes.func,
  exportData: PropTypes.array,
  exportFileName: PropTypes.string,
};

export default Button;
