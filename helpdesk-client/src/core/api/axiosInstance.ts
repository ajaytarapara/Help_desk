// src/api/axiosClient.ts
import axios from "axios";
import toast from "react-hot-toast";
import { showLoader, hideLoader } from "../../features/ui/uiSlice";
import { AppStore } from "../store";

let storeRef: AppStore | null = null;

/**
 * Inject store dynamically (type-safe)
 */
export const injectStore = (store: AppStore) => {
  storeRef = store;
};

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://localhost:5214/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor — attach token & show loader
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;

    storeRef?.dispatch(showLoader());
    return config;
  },
  (error) => {
    storeRef?.dispatch(hideLoader());
    toast.error("Failed to send request!");
    return Promise.reject(error);
  }
);

// Response Interceptor — hide loader & handle global errors
axiosClient.interceptors.response.use(
  (response) => {
    const showToast = response.config.headers?.showToast !== false;
    storeRef?.dispatch(hideLoader());
    showToast && toast.success(response.data?.message);
    return response;
  },
  (error) => {
    storeRef?.dispatch(hideLoader());
    if (error.response) {
      const message =
        error.response.data?.Message ||
        error.response.data?.Errors ||
        error.response.data?.message ||
        "Something went wrong!";

      // Show error toast only for server errors
      if (error.response.status >= 400) {
        toast.error(message);
      }

      // Optional: auto-logout on unauthorized
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        toast.error("Session expired. Please log in again.");
        window.location.href = "/login";
      }
    } else if (error.request) {
      toast.error("No response from server. Please try again.");
    } else {
      toast.error("Unexpected error occurred.");
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
