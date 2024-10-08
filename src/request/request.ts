import { handleRSAEncrypt } from "@/lib/encryption";
import axios, { AxiosResponse } from "axios";
import { httpErrorHandler } from "./error";
const request = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:8000"
      : "https://fromsian.pythonanywhere.com",
});

request.interceptors.request.use(
  (config) => {
    config.params = {
      ...config.params,
      action_time: handleRSAEncrypt(new Date().getTime() + ""),
    };
    config.headers["Accept-Language"] =
      localStorage.getItem("i18nextLng") === "zh-TW"
        ? "zh-hant"
        : localStorage.getItem("i18nextLng");

    if (localStorage.getItem("token")) {
      config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const responseHandler = (response: AxiosResponse) => {
  if (response.data) {
    const { success, message, ...rest } = response.data;
    if (!success) {
      throw new Error(message);
    }
    return rest;
  }
};
const errorHandler = (response: AxiosResponse) => {
  // the code of this function was written in above section.
  return httpErrorHandler(response);
};
request.interceptors.response.use(responseHandler, errorHandler);
export default request;
