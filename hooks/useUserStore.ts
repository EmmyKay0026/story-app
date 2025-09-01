import { User, UserProgress } from "@/constants/stories";
// import { UserState, User, UserProgress, UserPreferences } from "./userTypes";
import {
  handleGetMe,
  handleLogin,
  handleUpdateUserData,
  handleUpdateUserProgress,
} from "@/services/user/userAction";
// import { User, UserProgress } from "@/stores/user/userTypes";
import { create } from "zustand";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (
    phoneNumber: string
  ) => Promise<{ success: boolean; message?: string }>; // async for backend integration
  logout: () => void;
  getMe: (phoneNumber: string) => Promise<User | null>;
  updateProgress: (
    storyId: string,
    episodeId: string,
    progress: number
  ) => void;
  toggleBookmark: (storyId: string) => Promise<boolean | undefined>;
  unlockEpisode: (episodeId: string, cost: number) => boolean;
  getUserProgress: (
    storyId: string,
    episodeId: string
  ) => UserProgress | undefined;
  getStoryProgress: (storyId: string) => UserProgress[];
  isEpisodeUnlocked: (episodeId: string) => boolean;
  getContinueReading: () => { storyId: string; episodeId: string } | null;
}

const defaultUser: User = {
  id: "",
  phoneNumber: null,
  points: 0,
  preferences: {
    theme: "light",
    fontSize: "medium",
  },
  progress: [],
  bookmarks: [],
  unlockedEpisodes: [], // episode IDs
};
export const useUserStore = create<UserState>((set, get) => ({
  user: defaultUser,
  isAuthenticated: false,

  // For backend: replace with real API call
  login: async (phoneNumber: string) => {
    // Example: const response = await fetch("/api/login", { ... });

    const response = await handleLogin(phoneNumber);

    if ("User" in response) {
      set({ user: response.User, isAuthenticated: true });
      return { success: true };
    }
    if ("error" in response) {
      // set({ user: response.User, isAuthenticated: true });
      const errorMessage = response.error;
      // console.log(errorMessage);

      return { success: false, message: errorMessage };
    }
    return { success: false, message: "Login failed" };
  },

  logout: () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    set({ user: null, isAuthenticated: false });
  },
  getMe: async (phoneNumber) => {
    const response = await handleGetMe(phoneNumber);
    // console.log(response);
    if ("error" in response) {
      // set({ user: response.User, isAuthenticated: true });
      const errorMessage = response.error;
      // console.log(errorMessage);

      return { success: false, message: errorMessage };
    }

    if ("User" in response) {
      set({ user: response.User, isAuthenticated: true });
      return response.User;
    } else {
      set({ user: null, isAuthenticated: false });
      return null;
    }

    // return response.User;
  },

  updateProgress: (storyId, episodeId, progress) => {
    const { user } = get();
    if (!user) return;

    const existingProgressIndex = user.progress.findIndex(
      (p) => p.storyId === storyId && p.episodeId === episodeId
    );

    const newProgress: UserProgress = {
      storyId,
      episodeId,
      progress,
      lastReadAt: new Date(),
      isCompleted: progress >= 100,
    };

    let updatedProgress;
    if (existingProgressIndex >= 0) {
      updatedProgress = [...user.progress];
      updatedProgress[existingProgressIndex] = newProgress;
    } else {
      updatedProgress = [...user.progress, newProgress];
    }
    const updatedUser = {
      ...user,
      progress: updatedProgress,
    };
    set({
      user: updatedUser,
    });
    // TODO: send progress update to backend
    setInterval(() => {
      const response = handleUpdateUserProgress(updatedUser);

      if ("error" in response) {
        console.error("Failed to update user progress:", response.error);
      }
    }, 60000);
  },

  toggleBookmark: async (storyId) => {
    const { user } = get();
    if (!user) return;

    const isBookmark = user.bookmarks.includes(storyId);
    const updatedBookmarks = isBookmark
      ? user.bookmarks.filter((id) => id !== storyId)
      : [...user.bookmarks, storyId];

    const updatedUser = {
      ...user,
      bookmarks: updatedBookmarks,
    };
    set({
      user: updatedUser,
    });

    // TODO: sync with backend
    const response = await handleUpdateUserData(updatedUser);
    console.log(response);

    if ("error" in response) {
      console.error("Failed to update user data:", response.error);
      return !isBookmark;
    }
  },

  unlockEpisode: (episodeId, cost) => {
    const { user } = get();
    if (
      !user ||
      Number(user.points) < cost ||
      user.unlockedEpisodes.includes(episodeId)
    ) {
      return false;
    }

    set({
      user: {
        ...user,
        points: Number(user.points) - cost,
        unlockedEpisodes: [...user.unlockedEpisodes, episodeId],
      },
    });

    // TODO: sync with backend
    return true;
  },

  getUserProgress: (storyId, episodeId) => {
    if (!get().user?.progress) return undefined;
    return get().user?.progress.find(
      (p) => p.storyId === storyId && p.episodeId === episodeId
    );
  },

  getStoryProgress: (storyId) => {
    if (!get().user?.progress) return [];
    return get().user?.progress.filter((p) => p.storyId === storyId) || [];
  },

  isEpisodeUnlocked: (episodeId) => {
    if (!get().user) return false;
    return get().user?.unlockedEpisodes.includes(episodeId) || false;
  },

  getContinueReading: () => {
    const { user } = get();
    if (!user || user.progress.length === 0) return null;

    // Find most recent incomplete episode
    const incompleteProgress = user.progress
      .filter((p) => !p.isCompleted)
      .sort((a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime());

    if (incompleteProgress.length > 0) {
      return {
        storyId: incompleteProgress[0].storyId,
        episodeId: incompleteProgress[0].episodeId,
      };
    }

    // Otherwise, most recent episode overall
    const recentProgress = [...user.progress].sort(
      (a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime()
    );

    if (recentProgress.length > 0) {
      return {
        storyId: recentProgress[0].storyId,
        episodeId: recentProgress[0].episodeId,
      };
    }

    return null;
  },
}));
