import axios from "axios";

const userKey = localStorage.getItem("user-key");

const config = {
  headers: {
    "api-key": "daccfc89-ff47-4ce1-99bf-5ad2d8f57282",
    "user-key": userKey,
    "Content-Type": "application/json",
  },
};

// API Axios Get Call.
export const getAPICall = (url) => {
  return axios.get(url, config);
};

// API Axios Post Call.
export const postAPICall = (url, data) => {
  return axios.post(url, data, config);
};

// API Axios Post Call.
export const postAPICallCustom = (url, data, customConfig) => {
  return axios.post(url, data, customConfig);
};

// API Axios Put Call.
export const putAPICall = (url, data) => {
  return axios.put(url, data, config);
};
// API Axios Delete Call.
export const deleteAPICall = (url) => {
  return axios.delete(url, config);
};
