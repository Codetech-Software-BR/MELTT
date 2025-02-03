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
      const token = localStorage.getItem("@meltt-user-token");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        toast.error("Sessão expirada, faça login novamente.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000)
      }
      return Promise.reject(error);
    }
  );

  return api;
};

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


// export default createApiInstance;
