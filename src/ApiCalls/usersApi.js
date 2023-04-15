import { getToken, getUser } from "Helpers/Utils/Common";
import { postAPICall, postAPICallCustom } from "./axiosMethodCalls";

/***************************
 * USER
 ***************************/
const user = getUser();
const token = getToken();
const userKey = localStorage.getItem("user-key");

//POST
export const createUser = async (info, file, branches) => {
  var branchesData = [];

  branches?.map((data) => {
    branchesData.push(data.value);
  });
  try {
    const formData = new FormData();
    //Change param name according to the asked param from API
    formData.append("file_result", file[0]);
    const response = await postAPICallCustom(
      process.env.REACT_APP_LINK + "/login",
      {
        requester: user,
        token: token,
        username: info.username,
        password: info.password,
        last_name: info.last_name,
        first_name: info.first_name,
        middle_name: info.middle_name,
        email: info.email_address,
        type: info.user_type,
        role_id: info.role,
        branch_ids: branchesData.join(","),
      },
      {
        "api-key": "daccfc89-ff47-4ce1-99bf-5ad2d8f57282",
        "user-key": userKey,
        "Content-Type": "multipart/form-data",
      },
    );

    return { data: response };
  } catch (error) {
    return { data: error.response.data };
  }
};

//POST
export const editUser = async (info, file, branches) => {
  var branchesData = [];

  branches?.map((data) => {
    branchesData.push(data.value);
  });
  try {
    const formData = new FormData();
    //Change param name according to the asked param from API
    formData.append("file_result", file[0]);
    const response = await postAPICallCustom(
      process.env.REACT_APP_LINK + "/login",
      {
        requester: user,
        token: token,
        username: info.username,
        password: info.password,
        last_name: info.last_name,
        first_name: info.first_name,
        middle_name: info.middle_name,
        email: info.email_address,
        type: info.user_type,
        role_id: info.role,
        branch_ids: branchesData.join(","),
      },
      {
        "api-key": "daccfc89-ff47-4ce1-99bf-5ad2d8f57282",
        "user-key": userKey,
        "Content-Type": "multipart/form-data",
      },
    );

    return { data: response };
  } catch (error) {
    return { data: error.response.data };
  }
};

