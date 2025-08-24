// types/api.ts
import { Story, Episode } from "./models";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
  statusCode?: number;
}

export interface GetStoriesParams {
  page?: number;
  limit?: number;
  category?: string;
  tags?: string[];
  search?: string;
  sortBy?: "createdAt" | "updatedAt" | "rating" | "viewCount";
  sortOrder?: "asc" | "desc";
  featured?: boolean;
  status?: Story["status"];
}

export interface CreateStoryData {
  title: string;
  description: string;
  coverImage: string;
  category: string;
  tags: string[];
  episodes: Omit<Episode, "id" | "createdAt" | "updatedAt">[];
  status: "draft" | "published";
}

export interface UpdateStoryData extends Partial<CreateStoryData> {
  id: string;
}
