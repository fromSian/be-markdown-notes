import { Account, Settings } from "@/types/account";
import request from "./request";
export const fetchLogin = async (data: { email: string; password: string }) => {
  const url = "/account/login/";
  const response: Account & Settings = await request.post(url, data);
  localStorage.setItem("token", response?.token);
  return response;
};

export const fetchUserInfo = async (token = "") => {
  const url = "/account/info/";
  const response: Account & Settings = await request.get(
    url,
    token
      ? {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      : {}
  );
  return response;
};

export const goGoogleAuth = () => {
  const url = `${
    import.meta.env.MODE === "development"
      ? "http://localhost:8000"
      : "https://fromsian.pythonanywhere.com"
  }/account/google/access/`;
  window.open(url, "_self");
};

export const fetchTrial = async () => {
  const url = "/account/trial/";
  const response: Account & Settings = await request.post(url);
  localStorage.setItem("token", response?.token);
  return response;
};
