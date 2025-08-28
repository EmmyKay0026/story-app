// services/storyService.ts
import api, { formatError } from "../../stores/api";
import axios from "axios";
import { Story, ApiError } from "@/constants/stories";

// Utility: formats error into ApiError shape
// export const formatError = (error: unknown): ApiError => {
//   if (axios.isAxiosError(error)) {
//     return {
//       error:
//         (error.response?.data as { error?: string })?.error ||
//         error.message ||
//         "Something went wrong",
//       code: error.response?.status || 500,
//     };
//   }

//   return {
//     error: error instanceof Error ? error.message : "Unknown error",
//     code: 500,
//   };
// };

// Generic type for API responses
type ApiResponse<T> =
  | { data: T; error?: undefined }
  | { data?: undefined; error: ApiError };

// Get all stories
export const fetchStories = async (): Promise<ApiResponse<Story[]>> => {
  try {
    const response = await api.get<{ data: Story[] }>("/stories");
    return { data: response.data.data || response.data };
  } catch (error) {
    return { error: formatError(error) };
  }
};

// Featured stories
export const fetchFeaturedStories = async (): Promise<ApiResponse<Story[]>> => {
  try {
    const response = await api.get("/stories/featuredStories", {
      params: { isFeatured: true, _limit: 6 },
    });
    return { data: response.data?.data || [] };
  } catch (error) {
    return { error: formatError(error) };
  }
};

// Top-rated stories
export const fetchTopRatedStories = async (): Promise<ApiResponse<Story[]>> => {
  try {
    const response = await api.get("/stories/topratedstories", {
      params: { _sort: "rating", _order: "desc", _limit: 6 },
    });
    return { data: response.data.data || [] };
  } catch (error) {
    return { error: formatError(error) };
  }
};

// Spotlight story
export const fetchSpotlightStory = async (): Promise<
  ApiResponse<Story | null>
> => {
  try {
    const spotlight = await api.get("/weeklySpotlight");

    if (spotlight.data.length > 0) {
      const storyId = spotlight.data[0].storyId;
      const storyResponse = await api.get(`/stories/${storyId}`);
      return { data: storyResponse.data };
    }
    return { data: null };
  } catch (error) {
    return { error: formatError(error) };
  }
};

// ✅ Filtering logic (done client-side)
export const filterStories = (
  stories: Story[],
  searchTerm: string,
  categories: string[]
): Story[] => {
  let filtered = [...stories];

  if (searchTerm) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (story: Story) =>
        story.title.toLowerCase().includes(lowerSearchTerm) ||
        story.description.toLowerCase().includes(lowerSearchTerm) ||
        story.author.toLowerCase().includes(lowerSearchTerm) ||
        story.tags.some((tag) => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }

  if (categories.length > 0) {
    filtered = filtered.filter(
      (story: Story) =>
        categories.includes(story.category) ||
        story.tags.some((tag) => categories.includes(tag))
    );
  }

  return filtered;
};

export const getCoverImageUrl = (
  coverImage: string | { url: string } | undefined,
  fallback = "https://img.freepik.com/free-psd/world-book-day-template-design_23-2150195598.jpg"
): string => {
  if (typeof coverImage === "string") return coverImage;
  return coverImage?.url || fallback;
};
