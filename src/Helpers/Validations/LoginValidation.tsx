import { handleValidationChange } from "./CommonValidation";

export const validateLogin = (data: any, setError: any) => {

  /** Required:
   * username
   * password
   */

  var isValid = true;

  if (data.username === "") {
    handleValidationChange("username", true, setError);
    isValid = false;
  } else {
    handleValidationChange("username", false, setError);
  }

  if (data.password === "") {
    handleValidationChange("password", true, setError);
    isValid = false;
  } else {
    handleValidationChange("password", false, setError);
  }

  return isValid;
};
