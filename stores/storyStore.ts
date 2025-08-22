// store/storyStore.ts
import { create } from "zustand";
import { StoryState } from "./types";
import {
  fetchStories,
  fetchFeaturedStories,
  fetchSpotlightStory,
  filterStories,
  clearError,
  fetchTopRatedStories,
} from "./storyActions";

export const useStoryStore = create<StoryState>((set, get) => ({
  stories: [],
  featuredStories: [],
  filteredStories: [],
  spotlightStory: null,
  topRatedStories: [],

  isLoading: false,
  error: null,

  fetchStories: () => fetchStories(set),
  fetchFeaturedStories: () => fetchFeaturedStories(set),
  fetchSpotlightStory: () => fetchSpotlightStory(set),
  fetchTopRatedStories: () => fetchTopRatedStories(set),
  filterStories: (searchTerm: string, categories: string[]) =>
    filterStories(get, set, searchTerm, categories),
  clearError: () => clearError(set),
}));
