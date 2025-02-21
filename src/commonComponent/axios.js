import axios from "axios";
import { apiBaseUrl } from "../config";
// Get the token from localStorage
const token = localStorage.getItem("token");

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: apiBaseUrl, // Replace with your API base URL
  headers: {
    ["Auth-Token"]: token,
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Auth-Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
