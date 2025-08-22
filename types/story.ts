// types/store.ts
import { Story } from "./models";
import { GetStoriesParams } from "./api";

export interface StoryFilters {
  searchTerm: string;
  categories: string[];
  tags: string[];
  rating?: number;
  sortBy?: GetStoriesParams["sortBy"];
  sortOrder?: GetStoriesParams["sortOrder"];
}

export interface StoryProgress {
  storyId: string;
  episodeId: string;
  progress: number; // 0-100
  lastReadAt: string;
}

export interface StoryState {
  stories: Story[];
  featuredStories: Story[];
  filteredStories: Story[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchStories: () => Promise<void>;
  fetchFeaturedStories: () => Promise<void>;
  filterStories: (searchTerm: string, categories: string[]) => void;
  clearError: () => void;
}
