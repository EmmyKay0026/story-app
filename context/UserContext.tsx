"use client";

import { User, UserProgress, mockUser } from "@/constants/stories";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
// import { User, UserProgress, mockUser } from "../lib/data/mockData";

interface UserContextType {
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

const UserContext = createContext<UserContextType | undefined>(undefined);

const STORAGE_KEY = "storybook-user";

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Convert date strings back to Date objects
      parsedUser.progress = parsedUser.progress.map((p: any) => ({
        ...p,
        lastReadAt: new Date(p.lastReadAt),
      }));
      setUser(parsedUser);
    }
    setMounted(true);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (mounted && user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    }
  }, [user, mounted]);

  const login = (phoneNumber: string) => {
    // For MVP, just use mock user with the provided phone number
    const newUser = {
      ...mockUser,
      phoneNumber,
    };
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const updateProgress = (
    storyId: string,
    episodeId: string,
    progress: number
  ) => {
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

    setUser({
      ...user,
      progress: updatedProgress,
    });
  };

  const toggleBookmark = (storyId: string) => {
    if (!user) return;

    const isBookmark = user.bookmarks.includes(storyId);
    const updatedBookmarks = isBookmark
      ? user.bookmarks.filter((id) => id !== storyId)
      : [...user.bookmarks, storyId];

    setUser({
      ...user,
      bookmarks: updatedBookmarks,
    });
  };

  const unlockEpisode = (episodeId: string, cost: number, storyId?: string): boolean => {
    if (!user) return false;

    const balance = Number(user.points) || 0;
    const newBalance = balance - cost;
    if (newBalance < 0) return false;

    setUser({
      ...user,
      points: newBalance,
      progress: [
        ...(user.progress ?? []),
        {
          storyId: storyId ?? "unknown", // fallback if not passed
          episodeId,
          progress: 0,
          lastReadAt: new Date(),
          isCompleted: false,
        },
      ],
    });

    return true;
  };



  const getUserProgress = (
    storyId: string,
    episodeId: string
  ): UserProgress | undefined => {
    return user?.progress.find(
      (p) => p.storyId === storyId && p.episodeId === episodeId
    );
  };

  const getStoryProgress = (storyId: string): UserProgress[] => {
    return user?.progress.filter((p) => p.storyId === storyId) || [];
  };

  const isEpisodeUnlocked = (episodeId: string): boolean => {
    return user?.unlockedEpisodes.includes(episodeId) || false;
  };

  const getContinueReading = (): {
    storyId: string;
    episodeId: string;
  } | null => {
    if (!user || user.progress.length === 0) return null;

    // Find the most recent incomplete episode
    const incompleteProgress = user.progress
      .filter((p) => !p.isCompleted)
      .sort((a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime());

    if (incompleteProgress.length > 0) {
      return {
        storyId: incompleteProgress[0].storyId,
        episodeId: incompleteProgress[0].episodeId,
      };
    }

    // If no incomplete episodes, return the most recently read one
    const recentProgress = user.progress.sort(
      (a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime()
    );

    if (recentProgress.length > 0) {
      return {
        storyId: recentProgress[0].storyId,
        episodeId: recentProgress[0].episodeId,
      };
    }

    return null;
  };

  if (!mounted) {
    return <div className="min-h-screen bg-white" />;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateProgress,
        toggleBookmark,
        unlockEpisode,
        getUserProgress,
        getStoryProgress,
        isEpisodeUnlocked,
        getContinueReading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
