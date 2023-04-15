import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./UploadInput.css";


const UploadInput = ({ file, setFile }) => {
    return (
      <>
        <div className="upload-area d-flex justify-content-center">
          <div className="upload-btn-wrapper ">
            {file[0].name === "" && (
              <>
                <div className="upload">
                  <FontAwesomeIcon
                    icon={"upload"}
                    title={"End"}
                    aria-hidden="true"
                    className="upload-icon"
                  />
                  <br />
                  <span className="upload-inst">
                    <b>Upload Results</b> or drop it here
                  </span>
                </div>
                <input
                  type="file"
                  name="file"
                  className="file-input"
                  onChange={(e) => setFile(e.target.files)}
                />
              </>
            )}
            {file[0].name !== "" && (
              <span className="uploaded-file">File: {file[0].name}</span>
            )}
          </div>
        </div>
      </>
    );
  
};

UploadInput.propTypes = {
  file: PropTypes.any,
  setFile: PropTypes.func
};

export default UploadInput;
