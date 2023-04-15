import { postAPICall } from "./axiosMethodCalls";

/***************************
 * LOGIN
 ***************************/

//POST
export const LoginUser = async (username, password) => {

  //Replace REACT APP LINK at .env
  try {
    // const response = await postAPICall(`${process.env.REACT_APP_LINK}`, {
    //   username: username,
    //   password: password,
    // });


    // return { data: response};

    //Temporary return for demo purposes
    if (username == "user" && password == "user@123") {
          return { data: { 
                  status: 200,
                  data: {
                    id: 1,
                    first_name: "user",
                    last_name: "sample",
                    type: "super",
                    role: "admin",
                    api_key: "1234",
                    token: "1234",
                  }
                }}
    } else {
      return { data: {
        status: 401,
        messages: {
          error: "Invalid Credentials. "
        }
      }}
    }
  } catch (error) {
    return { data: error.response.data };
  }
};

/***************************
 * LOGOUT
 ***************************/

export const logoutUser = async () => {
  try {
    const response = await postAPICall(`${process.env.REACT_APP_LINK}logout`, {});
    return response;
  } catch (error) {
    return { error: error.response };
  }
};
