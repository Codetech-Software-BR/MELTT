import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { baseAcademicURL, baseAuthURL } from "../utils/baseURL";
import toast from "react-hot-toast";

const getBaseURL = (serviceType: string): string => {
  switch (serviceType) {
    case "authentication":
      return baseAuthURL;
    case "academic":
      return baseAcademicURL;
    default:
      throw new Error("Unknown service type");
  }
};

let isBlingRefreshing = false;
let blingRefreshSubscribers: ((token: string) => void)[] = [];
const createApiInstance = (serviceType: string): AxiosInstance => {
  const api = axios.create({
    baseURL: getBaseURL(serviceType),
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    }
  });

  api.interceptors.request.use(
    (config) => {
      const melttToken = localStorage.getItem("@meltt-user-token");
      const blingToken = localStorage.getItem("bling-access-token");

      // Se for uma requisição para o Bling, usa o token do Bling
      if (config.url?.includes("bling")) {
        if (blingToken) {
          config.headers["Authorization"] = `Bearer ${blingToken}`;
        } else {
          toast.error("Sessão do Bling expirada. Faça login novamente.");
          // window.location.href = "/splash";
        }
      } else {
        // Senão, usa o token da aplicação
        if (melttToken) {
          config.headers["Authorization"] = `Bearer ${melttToken}`;
        }
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // api.interceptors.response.use(
  //   (response) => response,
  //   async (error) => {
  //     const originalRequest = error.config;
  //     console.log("error", error.response?.status, originalRequest.url);
  //     if (error.response && originalRequest.url.includes("bling")) {
  //       if (!originalRequest._retry) {
  //         originalRequest._retry = true;

  //         if (!isBlingRefreshing) {
  //           isBlingRefreshing = true;

  //           try {
  //             const newToken = await refreshBlingAccessToken();
  //             localStorage.setItem("bling-access-token", newToken);
  //             isBlingRefreshing = false;

  //             // Refaz as requisições pendentes
  //             blingRefreshSubscribers.forEach((callback) => callback(newToken));
  //             blingRefreshSubscribers = [];

  //             originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
  //             return api(originalRequest);
  //           } catch (refreshError) {
  //             isBlingRefreshing = false;
  //             toast.error("Sessão do Bling expirada. Faça login novamente.");
  //             localStorage.removeItem("bling-access-token");
  //             localStorage.removeItem("bling-refresh-token");
  //             return Promise.reject(refreshError);
  //           }
  //         }

  //         return new Promise((resolve) => {
  //           blingRefreshSubscribers.push((token: string) => {
  //             originalRequest.headers["Authorization"] = `Bearer ${token}`;
  //             resolve(api(originalRequest));
  //           });
  //         });
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  return api;
};

// const refreshBlingAccessToken = async (): Promise<string> => {
//   try {
//     const refreshToken = localStorage.getItem("bling-refresh-token");
//     if (!refreshToken) throw new Error("No Bling refresh token available");

//     const response = await apiPostData("authentication", `/external/bling/refresh?code=${refreshToken}`, {})

//     return response.data.access_token;
//   } catch (error) {
//     throw new Error("Failed to refresh Bling token");
//   }
// };

export const apiRequest = async (
  serviceType: string,
  method: Method,
  url: string,
  data?: any,
  params?: any,
  headers?: any
) => {
  const api = createApiInstance(serviceType);

  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    params,
    headers,
  };

  try {
    const response = await api(config);
    return response.data;
  } catch (error: any) {
    console.error("API request error:", error);
    throw error;
  }
};

export const apiGetData = (serviceType: string, url: string, params?: any, headers?: any) =>
  apiRequest(serviceType, "GET", url, null, params, headers);

export const apiPostData = (serviceType: string, url: string, data: any, headers?: any) =>
  apiRequest(serviceType, "POST", url, data, null, headers);

export const apiPatchData = (serviceType: string, url: string, data: any, headers?: any) =>
  apiRequest(serviceType, "PATCH", url, data, null, headers);

export const apiPutData = (serviceType: string, url: string, data: any, headers?: any) =>
  apiRequest(serviceType, "PUT", url, data, null, headers);

export const apiDeleteData = (serviceType: string, url: string, data?: any, headers?: any) =>
  apiRequest(serviceType, "DELETE", url, data, null, headers);


