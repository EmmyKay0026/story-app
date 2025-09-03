// store/api.ts
import { ApiError } from "@/constants/stories";
import axios from "axios";

const baseURL = new URL(
  process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://mhealthtelevet.com/mhealthapi"
).toString();

const api = axios.create({
  baseURL,
  timeout: 90000,
});

// Request interceptor

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
