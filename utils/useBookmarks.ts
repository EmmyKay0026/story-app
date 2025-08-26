// hooks/useBookmarks.ts
import { useState, useCallback } from "react";
import api from "@/stores/api";

interface Bookmark {
  storyId: string;
  bookmarkedAt: string;
}

interface Story {
  id: string;
  title: string;
  category: string;
  rating: number;
  totalReadTime: number;
}

interface UseBookmarksReturn {
  // State
  bookmarkedStoryIds: string[];
  isLoading: boolean;
  error: string | null;

  // Actions
  toggleBookmark: (storyId: string) => Promise<void>;
  addBookmark: (storyId: string) => Promise<void>;
  removeBookmark: (storyId: string) => Promise<void>;
  isBookmarked: (storyId: string) => boolean;

  // Bulk operations
  getBookmarkedStories: () => Promise<Story[]>;
  refreshBookmarks: () => Promise<void>;
}

export const useBookmarks = (): UseBookmarksReturn => {
  const [bookmarkedStoryIds, setBookmarkedStoryIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load bookmarks from API
  const refreshBookmarks = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await api.get<{ bookmarks: Bookmark[] }>("/bookmarks");
      setBookmarkedStoryIds(res.data.bookmarks.map((b) => b.storyId));
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load bookmarks");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const isBookmarked = useCallback(
    (storyId: string) => bookmarkedStoryIds.includes(storyId),
    [bookmarkedStoryIds]
  );

  const addBookmark = useCallback(
    async (storyId: string) => {
      setError(null);
      try {
        await api.post("/bookmarks", { storyId });
        setBookmarkedStoryIds((prev) => [...prev, storyId]);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to add bookmark");
      }
    },
    []
  );

  const removeBookmark = useCallback(
    async (storyId: string) => {
      setError(null);
      try {
        await api.delete(`/bookmarks/${storyId}`);
        setBookmarkedStoryIds((prev) =>
          prev.filter((id) => id !== storyId)
        );
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to remove bookmark");
      }
    },
    []
  );

  const toggleBookmark = useCallback(
    async (storyId: string) => {
      if (isBookmarked(storyId)) {
        await removeBookmark(storyId);
      } else {
        await addBookmark(storyId);
      }
    },
    [isBookmarked, addBookmark, removeBookmark]
  );

  // Fetch bookmarked stories with details
  const getBookmarkedStories = useCallback(async () => {
    try {
      const res = await api.get<Story[]>("/bookmarks/stories");
      return res.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch bookmarked stories");
      return [];
    }
  }, []);

  return {
    bookmarkedStoryIds,
    isLoading,
    error,
    toggleBookmark,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmarkedStories,
    refreshBookmarks,
  };
};
