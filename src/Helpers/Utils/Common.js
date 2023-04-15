/***************************
 * Common Utilities
***************************/
export const numberWithCommas = (number) => {
  if (!number) {
    return undefined;
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export function refreshPage() {
  window.location.reload();
}

export const formatDateSlash = (date) => {
  //if date is null or empty string return nothin
  if (!date || date === "") {
    return "";
  }

  var stringDate = date.split("-");

  return stringDate[1] + "/" + stringDate[2] + "/" + stringDate[0];
};

/***************************
 * Local Storage Utilities
***************************/

//return user data from local storage
export const getUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);
  return null;
};

//return user name from local storage
export const getName = () => {
  const userStr = localStorage.getItem("name");
  if (userStr) return JSON.parse(userStr);
  return null;
};

//return user type from local storage
export const getType = () => {
  const userStr = localStorage.getItem("type");
  if (userStr) return JSON.parse(userStr);
  return null;
};

//return user role from local storage
export const getRole = () => {
  const userStr = localStorage.getItem("role");
  if (userStr) return JSON.parse(userStr);
  return null;
};

//return has reset from local storage
export const getHasReset = () => {
  const userStr = localStorage.getItem("has-reset");
  if (userStr) return JSON.parse(userStr);
  return null;
};

//return role id from local storage
export const getRoleId = () => {
  return localStorage.getItem("role_id") || null;
};

//return token from local storage
export const getToken = () => {
  const userStr = localStorage.getItem("token");
  if (userStr) return JSON.parse(userStr);
  return null;
};

//return token expiry from local storage
export const getTokenExpiry = () => {
  return localStorage.getItem("token_expiry") || null;
};

//return user key from local storage
export const getUserKey = () => {
  return localStorage.getItem("user-key") || null;
};

//return current branch from local storage
export const getBranch = () => {
  return localStorage.getItem("branch") || null;
};

//return current branch from local storage
export const getBranchType = () => {
  return localStorage.getItem("branch_type").replace(/['"]+/g, "") || null;
};

//remove token from local storage
export const removeUserSession = () => {
  refreshPage();
  localStorage.removeItem("user");
};

//remove token from local storage
export const removeSession = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("type");
  localStorage.removeItem("role");
  localStorage.removeItem("user-key");
  localStorage.removeItem("name");
};

//set the token and user from local storage
export const setUserSession = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};
