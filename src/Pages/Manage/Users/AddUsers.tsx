import React, { useState } from "react";
import Navbar from "Components/Navbar/Navbar";
import PropTypes from "prop-types";
import Header from "Components/Header/Header";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Navigate } from "react-router-dom";
import InputError from "Components/InputError/InputError";
import Dropdown from "Components/Dropdown/Dropdown";
import Select from "react-select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { toastStyle } from "Helpers/Constants/StyleConstants";

//css
import "./Users.css";
import Button from "Components/Button/Button";
import { validateUsers } from "Helpers/Validations/UsersValidation";
import { createUser } from "ApiCalls/usersApi";
import UploadInput from "Components/UploadInput/UploadInput";


const headingColumns = ["USER", "ROLE", "STATUS", "BRANCH"];

function AddUsers({ setIsChecked, isChecked }) {
  const [inactive, setInactive] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [redirect, setRedirect] = useState("");
  const [file, setFile] = useState([{ name: "" }]);
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    role: "",
    user_type: "",
    username: "",
    password: "",
    status: "",
  });

  //REQUIRED ERROR HANDLING
  const [isError, setIsError] = useState({
    first_name: false,
    middle_name: false,
    last_name: false,
    email: false,
    role: false,
    user_type: false,
    username: false,
    password: false,
    branches: false,
    status: false,
  });

  const [selectedOption, setSelectedOption] = useState(null);

  //Handle Branch Detail Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //API CALLS
  async function add() {
    //REQUEST
    if (
      validateUsers(userDetails, selectedOption, setIsError) === true &&
      isClicked === false
    ) {
      setIsClicked(true);
      const response = await createUser(userDetails, selectedOption);
      //   console.log(response);
      if (response.data && response.data.status === 200) {
         toast.success(response.data.data.response.toUpperCase(), {
           style: toastStyle(),
         });
      } else {
         toast.error(response.error.data.messages.error, {
           style: toastStyle(),
         });
        toast.error("AN ERROR HAS OCCURED!");
      }
      setTimeout(function () {
        setRedirect("redirect");
      }, 2000);
    }
  }

  //Const styles
  const customStyles = {
    control: (base) => ({
      ...base,
      "&:hover": { border: "1px solid #ff6700" }, // border style on hover
      border: "1px solid lightgray", // default border color
      boxShadow: "none", // no box-shadow
    }),
  };

  if(redirect === "cancel") {
    return <Navigate to="/users"/>
  }

  return (
    <div className="page">
      <Navbar
        onCollapse={(e) => {
          setInactive(e);
        }}
        active={"MANAGE"}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
      />
      <div className={`container ${inactive ? "inactive" : "active"}`}>
        <Header type={"users"} title="Manager" subtitle="Add User" />
        <Row>
          <p className="input-title">User Details</p>
          <Col sm={2}>
            <p className="input-subtitle">
              First Name<span className="required-icon">*</span>
            </p>
          </Col>
          <Col sm={4}>
            <input
              type="text"
              className="input-1"
              name="first_name"
              onChange={(e) => handleChange(e)}
            />
            <InputError
              isValid={isError.first_name}
              message={"First name is required"}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p className="input-subtitle">Middle Name</p>
          </Col>
          <Col sm={4}>
            <input
              type="text"
              className="input-1"
              name="middle_name"
              onChange={(e) => handleChange(e)}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p className="input-subtitle">
              Email Address <span className="optional-style">(Optional)</span>
            </p>
          </Col>
          <Col sm={4}>
            <input
              type="text"
              className="input-1"
              name="email_address"
              onChange={(e) => handleChange(e)}
            />
            <InputError isValid={isError.email} message={"Email is required"} />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p className="input-subtitle">
              Role<span className="required-icon">*</span>
            </p>
          </Col>
          <Col>
            <Dropdown
              options={[
                { value: "1", name: "Admin" },
                { value: "2", name: "Staff" },
              ]}
              onChange={handleChange}
            />
            <InputError isValid={isError.role} message={"Role is required"} />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p className="input-subtitle">
              Status<span className="required-icon">*</span>
            </p>
          </Col>
          <Col sm={4}>
            <input
              type="radio"
              className="checkbox-1"
              name="status"
              value="active"
              onChange={(e) => handleChange(e)}
            />
            <span className="radio-label-2">Active</span>
            <input
              type="radio"
              className="checkbox-1 move-l-2"
              name="status"
              value="suspended"
              onChange={(e) => handleChange(e)}
            />
            <span className="radio-label-2">Suspended</span>
            <InputError
              isValid={isError.status}
              message={"Status is required"}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p className="input-subtitle checkbox-label">
              Type<span className="required-icon">*</span>
            </p>
          </Col>
          <Col sm={4}>
            <input
              type="checkbox"
              className="checkbox-1"
              name="type"
              value="staff"
              onChange={(e) => handleChange(e)}
            />
            <span className="radio-label-2">Express Outlet</span>
            <input
              type="checkbox"
              className="checkbox-1 move-l-2"
              name="type"
              value="manager"
              onChange={(e) => handleChange(e)}
            />
            <span className="radio-label-2">Popup Store</span>
            <InputError
              isValid={isError.status}
              message={"Status is required"}
            />
          </Col>
        </Row>
        <Row>
          <Col sm={2}>
            <p className="input-subtitle remarks-label">
              Remarks <span className="optional-style">(Optional)</span>
            </p>
          </Col>
          <Col sm={4}>
            <textarea
              className="textarea-1"
              onChange={(e) => handleChange(e)}
            />
            <InputError isValid={isError.email} message={"Email is required"} />
          </Col>
        </Row>
        <Row>
          <p className="input-title branches-label">Branches Assigned</p>
          <Col sm={2}>
            <p className="input-subtitle">
              Branches<span className="required-icon">*</span>
            </p>
          </Col>
          <Col sm={4}>
            <Select
              styles={customStyles}
              defaultValue={selectedOption}
              onChange={() => setSelectedOption}
              options={[
                { label: "Cebu", value: "Cebu" },
                { label: "Manila", value: "Manila" },
              ]}
              className="input-multi"
              isMulti={true}
              isSearchable={true}
            />
            <div className="mt-4">
              <InputError
                isValid={isError.branches}
                message={"Branches is required"}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <p className="input-title">File Upload</p>
          <Col sm={2}>
            <p className="input-subtitle">Personal Document</p>
          </Col>
          <div className="col-sm-6">
            <UploadInput file={file} setFile={setFile} />
          </div>
        </Row>
        <Row>
          <div className="row form-btn-cont d-flex justify-content-end">
            {/** Add On Click to Submit, change api integration first **/}
            <Button type="cancel" onClick={setRedirect} />
            <Button type="submit" />
          </div>
        </Row>
      </div>
    </div>
  );
}

//DEFINE DATA TYPES
AddUsers.propTypes = {
  setIsChecked: PropTypes.any,
  isChecked: PropTypes.bool,
};

export default AddUsers;
