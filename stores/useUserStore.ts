import { User, UserProgress } from "@/types";
// import { UserState, User, UserProgress, UserPreferences } from "./userTypes";
import {
  handleFontSizeChange,
  handleGetMe,
  handleLogin,
  handleUnlockEpisode,
  handleUpdateBookmark,
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
  unlockEpisode: (
    storyId: string,
    episodeId: string,
    cost: number
  ) => Promise<boolean>;
  getUserProgress: (
    storyId: string,
    episodeId: string
  ) => UserProgress | undefined;
  getStoryProgress: (storyId: string) => UserProgress[];
  isEpisodeUnlocked: (episodeId: string) => boolean;
  updateFontSize: (
    fontSize: "small" | "medium" | "large" | "extra-large"
  ) => Promise<boolean | undefined>;
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
    localStorage.removeItem("theme");
    localStorage.removeItem("fontSize");
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

    const existingIndex = user.progress.findIndex(
      (p) => p.story_id === storyId && p.episode_id === episodeId
    );

    const newProgress: UserProgress = {
      story_id: storyId,
      episode_id: episodeId,
      progress,
      lastReadAt: new Date(),
      isCompleted: progress >= 100,
    };

    let updatedProgress;
    if (existingIndex >= 0) {
      updatedProgress = [...user.progress];
      updatedProgress[existingIndex] = newProgress;
    } else {
      updatedProgress = [...user.progress, newProgress];
    }

    set({
      user: {
        ...user,
        progress: updatedProgress,
      },
    });

    // one-shot backend sync
    handleUpdateUserProgress(newProgress).catch((err) =>
      console.error("Failed to update progress:", err)
    );
  },

  // updateProgress: (storyId, episodeId, progress) => {
  //   const { user } = get();
  //   if (!user) return;

  //   const existingProgressIndex = user.progress.findIndex(
  //     (p) => p.storyId === storyId && p.episodeId === episodeId
  //   );

  //   const newProgress: UserProgress = {
  //     storyId,
  //     episodeId,
  //     progress,
  //     lastReadAt: new Date(),
  //     isCompleted: progress >= 100,
  //   };

  //   let updatedProgress;
  //   if (existingProgressIndex >= 0) {
  //     updatedProgress = [...user.progress];
  //     updatedProgress[existingProgressIndex] = newProgress;
  //   } else {
  //     updatedProgress = [...user.progress, newProgress];
  //   }
  //   const updatedUser = {
  //     ...user,
  //     progress: updatedProgress,
  //   };

  //   // TODO: send progress update to backend
  //   setInterval(() => {
  //     const response = handleUpdateUserProgress(newProgress);

  //     if ("error" in response) {
  //       console.error("Failed to update user progress:", response.error);
  //     }
  //   }, 2000);
  //   set({
  //     user: updatedUser,
  //   });
  // },

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

    // TODO: sync with backend
    const response = await handleUpdateBookmark(updatedBookmarks);

    if ("error" in response) {
      console.error("Failed to update user data:", response.error);
      return isBookmark;
    }
    if (response.success) {
      set({
        user: response.user,
      });
      return !isBookmark;
    }
  },

  unlockEpisode: async (storyId, episodeId, cost) => {
    const { user } = get();
    if (
      !user ||
      Number(user.points) < cost ||
      user.unlockedEpisodes.includes(episodeId)
    ) {
      return false;
    }

    const updatedUnlockedEpisodes = [
      ...user.unlockedEpisodes,
      `${storyId}-${episodeId}`,
    ];
    // TODO: sync with backend
    const response = await handleUnlockEpisode(updatedUnlockedEpisodes, cost);
    // console.log(response);

    if ("error" in response) {
      console.error("Failed to update user data:", response.error);
      return false;
    }
    if (response.success) {
      set({
        user: {
          ...user, // RESPONSE FROM BACKEND
          points: Number(user.points) - cost,
          unlockedEpisodes: updatedUnlockedEpisodes,
        },
      });
    }

    return true;
  },

  getUserProgress: (storyId, episodeId) => {
    if (!get().user?.progress) return undefined;

    // console.log(get().user?.progress);

    return get().user?.progress.find(
      (p) => p.story_id === storyId && p.episode_id === episodeId
    );
    // return get().user?.progress.find(
    //   (p) => p.storyId === storyId && p.episodeId === episodeId
    // );
  },

  getStoryProgress: (storyId) => {
    if (!get().user?.progress) return [];
    return get().user?.progress.filter((p) => p.story_id === storyId) || [];
  },

  isEpisodeUnlocked: (episodeId) => {
    if (!get().user) return false;
    // console.log(get().user?.unlockedEpisodes);

    return get().user?.unlockedEpisodes.includes(episodeId) || false;
  },

  updateFontSize: async (
    fontSize: "small" | "medium" | "large" | "extra-large"
  ) => {
    const { user } = get();
    if (!user) return;
    const updatedUser = {
      ...user,
      preferences: {
        ...user.preferences,
        fontSize,
      },
    };

    const res = await handleFontSizeChange(fontSize);
    if ("data" in res) {
      // console.log(res);

      set({
        user: updatedUser,
      });
      return res.success;
    } else if ("error" in res) {
      console.error("Failed to update user data:", res.error);
      return false;
    }
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
        storyId: incompleteProgress[0].story_id,
        episodeId: incompleteProgress[0].episode_id,
      };
    }

    // Otherwise, most recent episode overall
    const recentProgress = [...user.progress].sort(
      (a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime()
    );

    if (recentProgress.length > 0) {
      return {
        storyId: recentProgress[0].story_id,
        episodeId: recentProgress[0].episode_id,
      };
    }

    return null;
  },
}));
