// src/api/axiosClient.ts
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";
import { showLoader, hideLoader } from "../../features/ui/uiSlice";
import { AppStore } from "../store";

// Extend axios config for _retry flag
declare module "axios" {
  export interface AxiosRequestConfig {
    _retry?: boolean;
  }
}

let storeRef: AppStore | null = null;

export const injectStore = (store: AppStore) => {
  storeRef = store;
};

const BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5214/api";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// SEPARATE axios instance with NO interceptors
const refreshClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Refresh request queue
let isRefreshing = false;
let failedQueue: {
  resolve: (value?: unknown) => void;
  reject: (err?: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (error: any | null) => {
  failedQueue.forEach(({ resolve, reject, config }) => {
    if (error) reject(error);
    else resolve(axiosClient(config));
  });

  failedQueue = [];
};

// ───────────────────────────
// REQUEST INTERCEPTOR
// ───────────────────────────
axiosClient.interceptors.request.use(
  (config) => {
    if (config.headers?.skipLoader !== true) {
      storeRef?.dispatch(showLoader());
    }
    return config;
  },
  (error) => {
    storeRef?.dispatch(hideLoader());
    toast.error("Request error");
    return Promise.reject(error);
  }
);

// ───────────────────────────
// RESPONSE INTERCEPTOR
// ───────────────────────────
axiosClient.interceptors.response.use(
  (response) => {
    if (response.config.headers?.skipLoader !== true) {
      storeRef?.dispatch(hideLoader());
    }
    const showToast = response.config.headers?.showToast !== false;
    showToast && toast.success(response.data?.message);
    return response;
  },

  async (error: AxiosError & { config?: AxiosRequestConfig }) => {
    if (error.config?.headers?.skipLoader !== true) {
      storeRef?.dispatch(hideLoader());
    }

    const originalRequest = error.config;

    if (!error.response) {
      toast.error("Network error");
      return Promise.reject(error);
    }

    const status = error.response.status;

    // ---------- HANDLE 401 ----------
    if (status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        await refreshClient.post("/auth/refresh");

        isRefreshing = false;
        processQueue(null);

        return axiosClient(originalRequest);
      } catch (refreshError) {
        isRefreshing = false;
        processQueue(refreshError);

        // logout user
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    // OTHER ERRORS
    const message =
      (error.response.data as any)?.Message ||
      (error.response.data as any)?.message ||
      "Error";

    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosClient;
