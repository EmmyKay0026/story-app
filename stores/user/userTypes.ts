// store/userTypes.ts
export interface UserProgress {
  storyId: string;
  episodeId: string;
  progress: number; // 0-100
  lastReadAt: string;
  timeSpent: number; // in minutes
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  fontSize: "small" | "medium" | "large" | "extra-large";
  fontFamily: "sans" | "serif";
}

export interface Bookmark {
  storyId: string;
  bookmarkedAt: string;
}

export interface User {
  id: string;
  phoneNumber: string;
  points: number;
  preferences: UserPreferences;
  progress: UserProgress[];
  bookmarks: Bookmark[];
  unlockedEpisodes: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UserState {
  user: User | null;
  isLoading: boolean;
  isUpdating: boolean;
  error: string | null;

  // Actions
  fetchUserProfile: () => Promise<void>;
  updatePreferences: (preferences: Partial<UserPreferences>) => Promise<void>;
  updateProgress: (progress: Omit<UserProgress, "lastReadAt">) => Promise<void>;
  addBookmark: (storyId: string) => Promise<void>;
  removeBookmark: (storyId: string) => Promise<void>;
  toggleBookmark: (storyId: string) => Promise<void>;
  unlockEpisode: (episodeId: string) => Promise<void>;
  spendPoints: (amount: number, reason: string) => Promise<void>;
  earnPoints: (amount: number, reason: string) => Promise<void>;

  // Getters
  isBookmarked: (storyId: string) => boolean;
  isEpisodeUnlocked: (episodeId: string) => boolean;
  getStoryProgress: (storyId: string) => UserProgress[];
  getLatestProgress: (storyId: string) => UserProgress | null;

  clearError: () => void;
  logout: () => void;
}

