"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, UserProgress, mockUser } from "@/constants/stories";

interface UserStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (phoneNumber: string) => void;
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

const STORAGE_KEY = "storybook-user";

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      login: (phoneNumber: string) => {
        const newUser: User = {
          ...mockUser,
          phoneNumber,
        };
        set({ user: newUser, isAuthenticated: true });
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
          user: { ...user, progress: updatedProgress },
        });
      },

      toggleBookmark: (storyId) => {
        const { user } = get();
        if (!user) return;

        const isBookmark = user.bookmarks.includes(storyId);
        const updatedBookmarks = isBookmark
          ? user.bookmarks.filter((id) => id !== storyId)
          : [...user.bookmarks, storyId];

        set({
          user: { ...user, bookmarks: updatedBookmarks },
        });
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

        return true;
      },

      getUserProgress: (storyId, episodeId) => {
        const { user } = get();
        return user?.progress.find(
          (p) => p.storyId === storyId && p.episodeId === episodeId
        );
      },

      getStoryProgress: (storyId) => {
        const { user } = get();
        return user?.progress.filter((p) => p.storyId === storyId) || [];
      },

      isEpisodeUnlocked: (episodeId) => {
        const { user } = get();
        return user?.unlockedEpisodes.includes(episodeId) || false;
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

        // Else return most recently read one
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
    }),
    {
      name: STORAGE_KEY,
      // Fix: convert date strings back to Date objects
      merge: (persisted, current) => {
        if (persisted && (persisted as any).state?.user?.progress) {
          (persisted as any).state.user.progress = (
            persisted as any
          ).state.user.progress.map((p: any) => ({
            ...p,
            lastReadAt: new Date(p.lastReadAt),
          }));
        }
        return { ...current, ...(persisted as any).state };
      },
    }
  )
);
