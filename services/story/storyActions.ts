import api from "../../stores/api";
import axios from "axios";
import { Story, ApiError, Episode } from "@/constants/stories";

// Utility: formats error into ApiError shape
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

type ApiResponse<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: ApiError };

// Get all stories with pagination & filters
export const fetchStories = async (
  search = "",
  tag = "",
  page = 1,
  limit = 10
): Promise<ApiResponse<{ stories: Story[]; pagination: any }>> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/stories`,
      {
        params: {
          search,
          tag,
          limit_start: page,
          limit_count: limit,
        },
      }
    );
    // console.log(response);
    return {
      data: {
        stories: response.data.data,
        pagination: response.data.pagination,
      },
    };
  } catch (error) {
    return { error: formatError(error) };
  }
};

// Featured, Trending, Categories from /home
export const fetchHomeData = async (): Promise<
  ApiResponse<{ featured: Story[]; trending: Story[]; categories: string[] }>
> => {
  try {
    const response = await axios.get<{
      featured: Story[];
      trending: Story[];
      categories: string[];
    }>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/home`);

    return { data: response.data };
  } catch (error) {
    return { error: formatError(error) };
  }
};

//Get story details (includes episodes)
export const fetchStoryDetails = async (
  storyId: string
): Promise<ApiResponse<Story>> => {
  try {
    const response = await api.get<{ data: Story }>(`/stories/${storyId}`);

    const story = response.data.data;

    return { data: { ...story, episodes: story.episodes ?? [] } };
  } catch (error) {
    return { error: formatError(error) };
  }
};

// Get specific episode details
export const fetchEpisode = async (
  storyId: string,
  episodeId: string
): Promise<ApiResponse<Episode>> => {
  try {
    const response = await api.get<{ data: Episode }>(
      `/stories/${storyId}/${episodeId}`
    );
    return { data: response.data.data };
  } catch (error) {
    return { error: formatError(error) };
  }
};

//Get categories
export const fetchCategories = async (): Promise<
  ApiResponse<{ label: string; value: string }[]>
> => {
  try {
    const response = await api.get<{
      data: { label: string; value: string }[];
      record_count: number;
      total_records: number;
    }>("/categories");

    return { data: response.data.data }; // 👈 unwrap the array
  } catch (error) {
    return { error: formatError(error) };
  }
};

// Client-side filtering helper
export const filterStories = (
  stories: Story[],
  searchTerm: string,
  categories: string[]
): Story[] => {
  let filtered = [...stories];

  // Search filter
  if (searchTerm) {
    const lowerSearch = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (s) =>
        s.title.toLowerCase().includes(lowerSearch) ||
        s.description.toLowerCase().includes(lowerSearch) ||
        s.author.toLowerCase().includes(lowerSearch) ||
        (Array.isArray(s.tags) &&
          s.tags.some((t) => t.toLowerCase().includes(lowerSearch)))
    );
  }

  // Category filter
  if (categories.length > 0) {
    filtered = filtered.filter((s) => {
      // Normalize story category to a string id/label
      let storyCategory = "";
      if (typeof s.category === "object" && s.category !== null) {
        storyCategory = s.category.value || s.category.label || "";
      } else if (typeof s.category === "string") {
        storyCategory = s.category;
      }

      // Normalize all to lowercase for comparison
      return (
        categories.some(
          (c) => c.toLowerCase() === storyCategory.toLowerCase()
        ) ||
        (Array.isArray(s.tags) &&
          s.tags.some((t) =>
            categories.some((c) => c.toLowerCase() === t.toLowerCase())
          ))
      );
    });
  }

  return filtered;
};

//Get episode details
export const fetchEpisodeDetails = async (
  storyId: string,
  episodeId: string
): Promise<ApiResponse<Episode>> => {
  try {
    const response = await api.get<{ data: Episode }>(
      `/stories/${storyId}/${episodeId}`
    );

    // console.log(response);

    const episode = response.data.data;

    return { data: episode };
  } catch (error) {
    return { error: formatError(error) };
  }
};

// Cover image utility
export const getCoverImageUrl = (
  coverImage: string | { url: string } | undefined,
  fallback = "https://img.freepik.com/free-psd/world-book-day-template-design_23-2150195598.jpg"
): string => {
  if (typeof coverImage === "string") return coverImage;
  return coverImage?.url || fallback;
};

export function formatNumber(num: number): string {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1_000_000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + "k";
  } else if (num < 1_000_000_000) {
    return (num / 1_000_000).toFixed(num % 1_000_000 === 0 ? 0 : 1) + "M";
  } else {
    return (
      (num / 1_000_000_000).toFixed(num % 1_000_000_000 === 0 ? 0 : 1) + "B"
    );
  }
}
