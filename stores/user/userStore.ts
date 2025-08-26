// store/userStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserState, User, UserProgress, UserPreferences } from "./userTypes";

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      isUpdating: false,
      error: null,

      // --- Actions ---
      fetchUserProfile: async () => {
        try {
          set({ isLoading: true });
          // Example API call (replace with your actual backend)
          const res = await fetch("/api/user/profile");
          const data: User = await res.json();
          set({ user: data, isLoading: false });
        } catch (err: any) {
          set({ error: err.message, isLoading: false });
        }
      },

      updatePreferences: async (preferences: Partial<UserPreferences>) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            preferences: { ...user.preferences, ...preferences },
            updatedAt: new Date().toISOString(),
          },
        });
      },

      updateProgress: async (progress: Omit<UserProgress, "lastReadAt">) => {
        const { user } = get();
        if (!user) return;

        const newProgress: UserProgress = {
          ...progress,
          lastReadAt: new Date().toISOString(),
        };

        set({
          user: {
            ...user,
            progress: [...user.progress, newProgress],
            updatedAt: new Date().toISOString(),
          },
        });
      },

      addBookmark: async (storyId: string) => {
        const { user } = get();
        if (!user) return;

        const newBookmark = {
          storyId,
          bookmarkedAt: new Date().toISOString(),
        };

        set({
          user: {
            ...user,
            bookmarks: [...user.bookmarks, newBookmark],
          },
        });
      },

      removeBookmark: async (storyId: string) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            bookmarks: user.bookmarks.filter(
              (bookmark) => bookmark.storyId !== storyId
            ),
          },
        });
      },

      toggleBookmark: async (storyId: string) => {
        const { user, isBookmarked } = get();
        if (!user) return;

        if (isBookmarked(storyId)) {
          await get().removeBookmark(storyId);
        } else {
          await get().addBookmark(storyId);
        }
      },

      unlockEpisode: async (episodeId: string) => {
        const { user } = get();
        if (!user) return;

        if (!user.unlockedEpisodes.includes(episodeId)) {
          set({
            user: {
              ...user,
              unlockedEpisodes: [...user.unlockedEpisodes, episodeId],
            },
          });
        }
      },

      spendPoints: async (amount: number, reason: string) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            points: Math.max(0, user.points - amount),
            updatedAt: new Date().toISOString(),
          },
        });
      },

      earnPoints: async (amount: number, reason: string) => {
        const { user } = get();
        if (!user) return;

        set({
          user: {
            ...user,
            points: user.points + amount,
            updatedAt: new Date().toISOString(),
          },
        });
      },

      // --- Getters ---
      isBookmarked: (storyId: string) => {
        const { user } = get();
        return (
          user?.bookmarks.some((bookmark) => bookmark.storyId === storyId) ??
          false
        );
      },

      isEpisodeUnlocked: (episodeId: string) => {
        const { user } = get();
        return user?.unlockedEpisodes.includes(episodeId) ?? false;
      },

      getStoryProgress: (storyId: string) => {
        const { user } = get();
        return user?.progress.filter((p) => p.storyId === storyId) ?? [];
      },

      getLatestProgress: (storyId: string) => {
        const { user } = get();
        if (!user) return null;

        const storyProgress = user.progress
          .filter((p) => p.storyId === storyId)
          .sort(
            (a, b) =>
              new Date(b.lastReadAt).getTime() -
              new Date(a.lastReadAt).getTime()
          );

        return storyProgress[0] || null;
      },

      clearError: () => set({ error: null }),

      logout: () => {
        localStorage.removeItem("authToken");
        set({
          user: null,
          isLoading: false,
          isUpdating: false,
          error: null,
        });
      },
    }),
    {
      name: "user-store",
      partialize: (state) => ({
        user: state.user,
      }),
    }
  )
);
