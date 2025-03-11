import axios from "axios";
import { UseAuth } from "./UseAuth";
import { useEffect, useRef } from "react";

const useAxios = () => {
  const { logout } = UseAuth();

  // Create an Axios instance
  const axiosInstance = useRef(
    axios.create({
      baseURL: import.meta.env.VITE_API,
      headers: {
        "Content-Type": "application/json",
      },
    })
  ).current;

  // Axios Interceptor to check for authentication errors
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );
    // Cleanup the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [axiosInstance, logout]);

  return axiosInstance;
};

export default useAxios;
