import React from "react"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./Error.css"

const  InputError = ({isValid , message}) => {
    if(!isValid) {
        return <></>
    }
    else {
      return (
        <div className="validity-error callout bottom">
          <span className="text-start">
            <FontAwesomeIcon
              icon={"exclamation-triangle"}
              aria-hidden="true"
              className="error-icon"
            />
            {message}
          </span>
        </div>
      );
    }
}

InputError.propTypes = {
    isValid: PropTypes.bool,
    message: PropTypes.string
}

export default InputError


