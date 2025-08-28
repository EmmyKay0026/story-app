// store/userActions.ts
import api from "../api";
import { User, UserPreferences, UserProgress, Bookmark } from "./userTypes";

export const createUserActions = (set: any, get: any) => ({
  login: async (phoneNumber: string) => {
    const response = await api.post<{ phoneNumber: string }>("/auth/login", {
      phoneNumber,
    });

    console.log("Login response:", response.data);

    localStorage.setItem("authToken", phoneNumber);
    await get().fetchUserProfile();
  },

  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get<{ data: User }>("/user/profile");
      const user = response.data.data || response.data;
      set({ user, isLoading: false });
    } catch (error: any) {
      console.error("Error fetching user profile:", error);
      set({
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to fetch user profile",
        isLoading: false,
      });
    }
  },

  updatePreferences: async (preferences: Partial<UserPreferences>) => {
    const { user } = get();
    if (!user) return;

    const updatedUser = {
      ...user,
      preferences: { ...user.preferences, ...preferences },
    };
    set({ user: updatedUser, isUpdating: true, error: null });

    try {
      const response = await api.patch<{ data: User }>(
        "/user/preferences",
        preferences
      );
      const newUser = response.data.data || response.data;
      set({ user: newUser, isUpdating: false });
    } catch (error: any) {
      console.error("Error updating preferences:", error);
      set({
        user,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update preferences",
        isUpdating: false,
      });
    }
  },

  updateProgress: async (progressData: Omit<UserProgress, "lastReadAt">) => {
    const { user } = get();
    if (!user) return;

    const newProgress: UserProgress = {
      ...progressData,
      lastReadAt: new Date().toISOString(),
    };

    const existingProgressIndex = user.progress.findIndex(
      (p: UserProgress) =>
        p.storyId === newProgress.storyId &&
        p.episodeId === newProgress.episodeId
    );

    let updatedProgress;
    if (existingProgressIndex >= 0) {
      updatedProgress = [...user.progress];
      updatedProgress[existingProgressIndex] = newProgress;
    } else {
      updatedProgress = [...user.progress, newProgress];
    }

    const updatedUser = { ...user, progress: updatedProgress };
    set({ user: updatedUser, error: null });

    try {
      await api.post("/user/progress", newProgress);
    } catch (error: any) {
      console.error("Error updating progress:", error);
      set({
        user,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to update progress",
      });
    }
  },

  // --- Bookmarks ---
  addBookmark: async (storyId: string) => {
    const { user } = get();
    if (!user) return;

    // prevent duplicate
    if (user.bookmarks.some((b: Bookmark) => b.storyId === storyId)) return;

    const newBookmark: Bookmark = {
      storyId,
      bookmarkedAt: new Date().toISOString(),
    };

    const updatedUser = {
      ...user,
      bookmarks: [...user.bookmarks, newBookmark],
    };

    set({ user: updatedUser, isUpdating: true, error: null });

    try {
      await api.post("/user/bookmarks", { storyId });
      set({ isUpdating: false });
    } catch (error: any) {
      console.error("Error adding bookmark:", error);
      set({
        user,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to add bookmark",
        isUpdating: false,
      });
    }
  },

  removeBookmark: async (storyId: string) => {
    const { user } = get();
    if (!user) return;

    const updatedUser = {
      ...user,
      bookmarks: user.bookmarks.filter((b: Bookmark) => b.storyId !== storyId),
    };

    set({ user: updatedUser, isUpdating: true, error: null });

    try {
      await api.delete(`/user/bookmarks/${storyId}`);
      set({ isUpdating: false });
    } catch (error: any) {
      console.error("Error removing bookmark:", error);
      set({
        user,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to remove bookmark",
        isUpdating: false,
      });
    }
  },

  toggleBookmark: async (storyId: string) => {
    const { user, addBookmark, removeBookmark } = get();
    if (!user) return;

    if (user.bookmarks.some((b: Bookmark) => b.storyId === storyId)) {
      await removeBookmark(storyId);
    } else {
      await addBookmark(storyId);
    }
  },

  // --- Episodes ---
  unlockEpisode: async (episodeId: string) => {
    const { user } = get();
    if (!user || user.unlockedEpisodes.includes(episodeId)) return;

    const updatedUser = {
      ...user,
      unlockedEpisodes: [...user.unlockedEpisodes, episodeId],
    };
    set({ user: updatedUser, isUpdating: true, error: null });

    try {
      const response = await api.post<{ data: User; pointsSpent: number }>(
        "/user/unlock-episode",
        { episodeId }
      );
      const newUser = response.data.data || response.data;
      set({ user: newUser, isUpdating: false });
    } catch (error: any) {
      console.error("Error unlocking episode:", error);
      set({
        user,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to unlock episode",
        isUpdating: false,
      });
    }
  },

  // --- Points ---
  spendPoints: async (amount: number, reason: string) => {
    const { user } = get();
    if (!user || user.points < amount) return;

    const updatedUser = { ...user, points: user.points - amount };
    set({ user: updatedUser, error: null });

    try {
      await api.post("/user/points/spend", { amount, reason });
    } catch (error: any) {
      console.error("Error spending points:", error);
      set({
        user,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to spend points",
      });
    }
  },

  earnPoints: async (amount: number, reason: string) => {
    const { user } = get();
    if (!user) return;

    const updatedUser = { ...user, points: user.points + amount };
    set({ user: updatedUser, error: null });

    try {
      await api.post("/user/points/earn", { amount, reason });
    } catch (error: any) {
      console.error("Error earning points:", error);
      set({
        user,
        error:
          error.response?.data?.message ||
          error.message ||
          "Failed to earn points",
      });
    }
  },
});
