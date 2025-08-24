// store/types.ts
export interface Episode {
  id: string;
  title: string;
  content: string;
  readTime: number;
  episodeNumber: number;
  isPremium: boolean;
  pointsCost: number;
  order: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage: string;
  category: string;
  tags: string[];
  rating: number;
  totalEpisodes: number;
  totalReadTime: number; // in minutes
  episodes: Episode[];
  isFeatured: boolean;
  reviews: Review[];
  isPremium: boolean;
  pointsCost: number;
  order: number;
}

export interface ApiError {
  error: string;
  code: number;
}

// ✅ Unified StoryState
export interface StoryState {
  stories: Story[];
  featuredStories: Story[];
  filteredStories: Story[];
  spotlightStory: Story | null;
  topRatedStories: Story[];

  isLoading: boolean;
  error: ApiError | null;

  // Actions
  fetchStories: () => Promise<void>;
  fetchFeaturedStories: () => Promise<void>;
  fetchSpotlightStory: () => Promise<void>;
  filterStories: (searchTerm: string, categories: string[]) => void;
  fetchTopRatedStories: () => Promise<void>;
  clearError: () => void;
}


