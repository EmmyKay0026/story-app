// store/storyActions.ts
import api from "./api";
import axios from "axios";
import { Story, ApiError } from "./types";

// ✅ Utility: formats error into ApiError shape
export const formatError = (error: any): ApiError => ({
  error:
    error.response?.data?.message ||
    error.message ||
    "Something went wrong",
  code: error.response?.status || 500,
});

// ✅ Get all stories
export const fetchStories = async (
  set: (partial: any) => void
): Promise<void> => {
  set({ isLoading: true, error: null });
  try {
    const response = await api.get<{ data: Story[] }>("/stories");
    const stories = response.data.data || response.data;

    set({
      stories,
      filteredStories: stories,
      isLoading: false,
    });
  } catch (error: any) {
    console.error("Error fetching stories:", error);
    set({
      error: formatError(error),
      isLoading: false,
    });
  }
};

// ✅ Get featured stories
export const fetchFeaturedStories = async (
  set: (partial: any) => void
): Promise<void> => {
  set({ isLoadingFeatured: true, featuredError: null });
  try {
    const response = await api.get("/stories", {
      params: { isFeatured: true, _limit: 6 },
    });

    const stories = response.data.stories || response.data || [];

    set({
      featuredStories: stories,
      isLoadingFeatured: false,
    });
  } catch (error: any) {
    console.error("Error fetching featured stories:", error);
    set({
      featuredError: formatError(error),
      isLoadingFeatured: false,
    });
  }
};

// ✅ Get top-rated stories (your snippet added here)
export const fetchTopRatedStories = async (
  set: (partial: any) => void
): Promise<void> => {
  set({ isLoadingTopRated: true, topRatedError: null });

  try {
    const response = await api.get("/stories", {
      params: {
        _sort: "rating",
        _order: "desc",
        _limit: 6,
      },
    });

    // const response = await api.get("/stories/top-rated", {
    //   params: {
    //     limit: 6,
    //     sortBy: "rating",
    //     order: "desc",
    //   },
    // });

    const stories = response.data.stories || response.data || [];

    set({
      topRatedStories: stories,
      isLoadingTopRated: false,
    });
  } catch (error: any) {
    set({
      topRatedError: formatError(error),
      isLoadingTopRated: false,
    });

    console.error("Error fetching top rated stories:", error);
  }
};

// ✅ Get spotlight story
export const fetchSpotlightStory = async (
  set: (partial: any) => void
): Promise<void> => {
  set({ isLoadingSpotlight: true, spotlightError: null });

  try {
    // 1. Get spotlight entry (returns a storyId)
    const spotlight = await api.get("/weeklySpotlight");

    if (spotlight.data.length > 0) {
      const storyId = spotlight.data[0].storyId;

      // 2. Fetch the actual story
      const storyResponse = await api.get(`/stories/${storyId}`);

      set({
        spotlightStory: storyResponse.data,
        isLoadingSpotlight: false,
      });
    } else {
      set({
        spotlightStory: null,
        isLoadingSpotlight: false,
      });
    }
  } catch (error: any) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      set({
        spotlightStory: null,
        spotlightError: {
          error: "No spotlight story available this week.",
          code: 404,
        },
        isLoadingSpotlight: false,
      });
    } else {
      set({
        spotlightError: formatError(error),
        isLoadingSpotlight: false,
      });
    }
    console.error("Error fetching spotlight story:", error);
  }
};

// ✅ Filtering logic
export const filterStories = (
  get: () => any,
  set: (partial: any) => void,
  searchTerm: string,
  categories: string[]
): void => {
  const { stories } = get();
  let filtered = stories;

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

  set({ filteredStories: filtered });
};

// ✅ Reset error
export const clearError = (set: (partial: any) => void): void => {
  set({ error: null });
};
