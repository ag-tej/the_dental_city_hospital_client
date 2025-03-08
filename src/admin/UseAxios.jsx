import axios from "axios";
import { UseAuth } from "./UseAuth";
import { useNavigate } from "react-router";
import { useEffect } from "react";

const useAxios = () => {
  const { logout } = UseAuth();
  const navigate = useNavigate();

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Axios Interceptor to check for authentication errors
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
    // Cleanup the interceptor when the component unmounts
    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [axiosInstance.interceptors.response, logout, navigate]);

  return axiosInstance;
};

export default useAxios;
