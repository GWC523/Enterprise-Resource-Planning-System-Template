import { handleValidationChange } from "./CommonValidation";

export const validateUsers = (data: any, branches: any, setIsError: any) => {
  //Required
  // first_name: "",
  // middle_name: "",
  // last_name: "",
  // role: "",
  // user_type: "",
  // username: "",
  // password: "",
  // branches: "",

  var isValid = true;

  if (data.first_name === "") {
    handleValidationChange("first_name", true, setIsError);
    isValid = false;
  } else {
    handleValidationChange("first_name", false, setIsError);
  }

  // if(data.middle_name === "") {
  //     handleValidationChange("middle_name", true, setIsError);
  //     isValid = true;
  // } else {
  //     handleValidationChange("middle_name", false, setIsError);
  // }

  if (data.last_name === "") {
    handleValidationChange("last_name", true, setIsError);
    isValid = false;
  } else {
    handleValidationChange("last_name", false, setIsError);
  }

  if (data.role === "") {
    handleValidationChange("role", true, setIsError);
    isValid = false;
  } else {
    handleValidationChange("role", false, setIsError);
  }

  // console.log(data.role)
  // console.log(branches)
  if (data.role === "3" && branches.length === 0) {
    // console.log("is error")
    handleValidationChange("branches", true, setIsError);
    isValid = false;
  } else {
    // console.log("is not error")
    // console.log(data.role)
    handleValidationChange("branches", false, setIsError);
  }

  if (data.user_type === "") {
    handleValidationChange("user_type", true, setIsError);
    isValid = false;
  } else {
    handleValidationChange("user_type", false, setIsError);
  }

  if (data.username === "") {
    handleValidationChange("username", true, setIsError);
    isValid = false;
  } else {
    handleValidationChange("username", false, setIsError);
  }

  if (data.password === "") {
    handleValidationChange("password", true, setIsError);
    isValid = false;
  } else {
    handleValidationChange("password", false, setIsError);
  }

  return isValid;
};
