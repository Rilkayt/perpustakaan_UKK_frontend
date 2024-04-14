import axios from "axios";

let token = JSON.parse(localStorage.getItem("token"));

const authConfig = () => {
  if (token.token != "") {
    return `Bearer ${token.token}`;
  }
};

const get = (url, auth = true, resType = false) => {
  return axios.get(import.meta.env.VITE_URL_API + url, {
    headers: {
      Authorization: auth ? authConfig() : null,
      "Content-Type": "application/json",
    },
    responseType: resType ? "blob" : "",
  });
};

const post = (url, data, auth = true, contentType) => {
  return axios.post(import.meta.env.VITE_URL_API + url, data, {
    headers: {
      Authorization: auth ? authConfig() : null,
      "Content-Type":
        contentType == "formData" ? "multipart/form-data" : "application/json",
    },
  });
};

const put = (url, data, auth = true, contentType) => {
  return axios.put(import.meta.env.VITE_URL_API + url, data, {
    headers: {
      Authorization: auth ? authConfig() : null,
      "Content-Type":
        contentType == "formData" ? "multipart/form-data" : "application/json",
    },
  });
};

const del = (url, auth = true) => {
  return axios.delete(import.meta.env.VITE_URL_API + url, {
    headers: {
      Authorization: auth ? authConfig() : null,
      "Content-Type": "application/json",
    },
  });
};

const api = {
  get,
  post,
  put,
  del,
};

export default api;
