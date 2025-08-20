import { fontSizes } from "@/constants/fonts";
import { create } from "zustand";

const defaultFontSizeValue = "medium";

const getPreloadedFontSize = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("fontSize") || defaultFontSizeValue;
  }
  return defaultFontSizeValue; // fallback for SSR
};

const preLoadedFontSizeValue = getPreloadedFontSize();

const preLoadedFontSize = fontSizes.find(
  (fs) => fs.value === preLoadedFontSizeValue
);
type FontSizeValue = (typeof fontSizes)[number]["size"];
type FontSizeState = {
  fontSize: FontSizeValue;
  fontSizeLabel: (typeof fontSizes)[number]["label"];
  canIncrease: boolean | null;
  canDecrease: boolean | null;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const useFontSizeStore = create<FontSizeState & { currentIndex: number }>(
  (set) => {
    const initialIndex = fontSizes.findIndex(
      (fs) => fs.value === preLoadedFontSizeValue
    );
    const safeIndex =
      initialIndex === -1
        ? fontSizes.findIndex((fs) => fs.value === "medium")
        : initialIndex;

    return {
      fontSize: fontSizes[safeIndex].size,
      fontSizeLabel: fontSizes[safeIndex].label,
      currentIndex: safeIndex,
      canIncrease: safeIndex < fontSizes.length - 1,
      canDecrease: safeIndex > 0,

      increaseFontSize: () =>
        set((state) => {
          const nextIndex = Math.min(
            state.currentIndex + 1,
            fontSizes.length - 1
          );

          if (typeof window !== "undefined") {
            localStorage.setItem("fontSize", fontSizes[nextIndex].value);
          }

          return {
            fontSize: fontSizes[nextIndex].size,
            fontSizeLabel: fontSizes[nextIndex].label,
            currentIndex: nextIndex,
            canIncrease: nextIndex < fontSizes.length - 1,
            canDecrease: nextIndex > 0,
          };
        }),

      decreaseFontSize: () =>
        set((state) => {
          const prevIndex = Math.max(state.currentIndex - 1, 0);

          if (typeof window !== "undefined") {
            localStorage.setItem("fontSize", fontSizes[prevIndex].value);
          }

          return {
            fontSize: fontSizes[prevIndex].size,
            fontSizeLabel: fontSizes[prevIndex].label,
            currentIndex: prevIndex,
            canIncrease: prevIndex < fontSizes.length - 1,
            canDecrease: prevIndex > 0,
          };
        }),

    };
  }
);

import { User, UserProgress } from "@/constants/stories";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => Promise<void>; // async for backend integration
  logout: () => void;
  updateProgress: (
    storyId: string,
    episodeId: string,
    progress: number
  ) => void;
  toggleBookmark: (storyId: string) => void;
  unlockEpisode: (episodeId: string, cost: number) => boolean;
  getUserProgress: (
    storyId: string,
    episodeId: string
  ) => UserProgress | undefined;
  getStoryProgress: (storyId: string) => UserProgress[];
  isEpisodeUnlocked: (episodeId: string) => boolean;
  getContinueReading: () => { storyId: string; episodeId: string } | null;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  isAuthenticated: false,

  // For backend: replace with real API call
  login: async (phoneNumber: string) => {
    // Example: const response = await fetch("/api/login", { ... });
    // const user = await response.json();
    const mockUser: User = {
      id: "1",
      phoneNumber,
      points: 100,
      preferences: {
        theme: "system",
        fontSize: "medium",
      },
      progress: [],
      bookmarks: [],
      unlockedEpisodes: [],
    };

    set({ user: mockUser, isAuthenticated: true });
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
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

    set({
      user: {
        ...user,
        progress: updatedProgress,
      },
    });

    // TODO: send progress update to backend
  },

  toggleBookmark: (storyId) => {
    const { user } = get();
    if (!user) return;

    const isBookmark = user.bookmarks.includes(storyId);
    const updatedBookmarks = isBookmark
      ? user.bookmarks.filter((id) => id !== storyId)
      : [...user.bookmarks, storyId];

    set({
      user: {
        ...user,
        bookmarks: updatedBookmarks,
      },
    });

    // TODO: sync with backend
  },

  unlockEpisode: (episodeId, cost) => {
    const { user } = get();
    if (
      !user ||
      user.points < cost ||
      user.unlockedEpisodes.includes(episodeId)
    ) {
      return false;
    }

    set({
      user: {
        ...user,
        points: user.points - cost,
        unlockedEpisodes: [...user.unlockedEpisodes, episodeId],
      },
    });

    // TODO: sync with backend
    return true;
  },

  getUserProgress: (storyId, episodeId) => {
    return get().user?.progress.find(
      (p) => p.storyId === storyId && p.episodeId === episodeId
    );
  },

  getStoryProgress: (storyId) => {
    return get().user?.progress.filter((p) => p.storyId === storyId) || [];
  },

  isEpisodeUnlocked: (episodeId) => {
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

export { useFontSizeStore };
