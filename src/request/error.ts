import axios from "axios";
import {} from "react-router";
import { toast } from "sonner";

export type CommonError = {
  message: string;
};

export function isCommonError(error: unknown): error is CommonError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as Record<string, unknown>).message === "string"
  );
}

const convertToCommonError = (error: unknown): CommonError => {
  if (isCommonError(error)) {
    return error;
  }
  try {
    return new Error(JSON.stringify(error));
  } catch (error) {
    // 如果抛出的异常不是object
    return new Error(String(error));
  }
};

export const getErrorMessage = (error: unknown): string => {
  return convertToCommonError(error).message;
};

export const httpErrorHandler = (error: unknown) => {
  if (error === null) throw new Error("Unrecoverable error!! Error is null!");
  if (axios.isAxiosError(error)) {
    const response = error?.response;

    if (error.code === "ERR_NETWORK" || error.code === "Network Error") {
      console.log("connection problems..");
      toast.error("sorry, failed to connect to back-end");
    } else if (error.code === "ERR_CANCELED") {
      console.log("connection canceled..");
    }

    if (error.code === "ERR_BAD_RESPONSE") {
      toast.error("sorry, back-end is not working");
    }
    if (response && response.data) {
      if (response.status === 401) {
        localStorage.removeItem("token");

        console.log(window.location.pathname);
        let message = "no valid token, please sign in again";

        switch (localStorage.getItem("i18nextLng")) {
          case "zh-CN":
            message = "登录失效，请重新登录";
            break;
          case "zh-TW":
            message = "登錄失效，請重新登錄";
            break;
          default:
        }
        toast.error(message);
      } else {
        toast.error(response.data.message);
      }
    }
  } else {
    console.log(error);
  }
  return Promise.reject(error);
};
