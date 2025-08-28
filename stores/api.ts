// store/api.ts
import { ApiError } from "@/constants/stories";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001/api",
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default api;

export const formatError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      error:
        (error.response?.data as { error?: string })?.error ||
        error.message ||
        "Something went wrong",
      code: error.response?.status || 500,
    };
  }

  return {
    error: error instanceof Error ? error.message : "Unknown error",
    code: 500,
  };
};
