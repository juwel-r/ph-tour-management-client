import env from "@/config/env.config";
import axios, { type AxiosRequestConfig } from "axios";

export const axiosInstance = axios.create({
  baseURL: env.baseUrl,
  withCredentials: true,
});

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor === must replace axios with axiosInstance ===
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error.response.status);

    const originalRequest = error.config as AxiosRequestConfig;
    //catch here originalRequest failed or error request to resolve it later

    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired"
    ) {
      console.log("Token is expired");

      try {
        const res = await axiosInstance.post("/auth/refresh-token");
        console.log(res);
        return axiosInstance(originalRequest);
        //resolve that caught request here
      } catch (error) {
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);
