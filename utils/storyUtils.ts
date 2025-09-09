// import { Story, Episode, UserProgress } from "../data/mockData";

import { Story, Episode, UserProgress } from "@/types";

export function calculateReadTime(text: string): number {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export function formatReadTime(minutes: number): string {
  if (minutes < 1) return "< 1 min";
  if (minutes < 60) return `${minutes} min`;

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (remainingMinutes === 0) return `${hours}h`;
  return `${hours}h ${remainingMinutes}m`;
}

export function calculateStoryProgress(
  story: Story,
  userProgress: UserProgress[]
): number {
  const storyProgress = (userProgress ?? []).filter(
    (p) => p.story_id === story.id
  );

  if (storyProgress.length === 0) return 0;

  const totalProgress = storyProgress.reduce(
    (sum, p) => sum + Number(p.progress),
    0
  );

  return Math.round(totalProgress / story.totalEpisodes);
}

export function getNextEpisode(
  story: Story,
  currentEpisodeId: string
): Episode | null {
  // console.log(currentEpisodeId);

  const currentIndex = story.episodes.findIndex(
    (ep) => ep.id == currentEpisodeId
  );
  // console.log(currentIndex);

  if (currentIndex == -1 || currentIndex == story.episodes.length - 1)
    return null;
  return story.episodes[currentIndex + 1];
}

export function getPreviousEpisode(
  story: Story,
  currentEpisodeId: string
): Episode | null {
  const currentIndex = story.episodes.findIndex(
    (ep) => ep.id == currentEpisodeId
  );
  if (currentIndex <= 0) return null;
  return story.episodes[currentIndex - 1];
}

export function isStoryCompleted(
  story: Story,
  userProgress: UserProgress[]
): boolean {
  const storyProgress = (userProgress ?? []).filter(
    (p) => p.story_id === story.id
  );
  return (
    storyProgress.length === story.totalEpisodes &&
    storyProgress.every((p) => p.isCompleted)
  );
}

export function getReadingPosition(content: string, progress: number): number {
  const totalLength = content.length;
  // console.log(
  //   "getReadingPosition:",
  //   Math.round((progress / 100) * totalLength)
  // );
  return Math.round((progress / 100) * totalLength);
}

export function calculateProgressFromPosition(
  content: string,
  position: number
): number {
  const totalLength = content.length;
  // console.log(
  //   "calculateProgressFromPosition:",
  //   Math.min(100, Math.max(0, Math.round((position / totalLength) * 100)))
  // );
  return Math.min(100, Math.max(0, Math.round((position / totalLength) * 100)));
}

export function searchStories(stories: Story[], query: string): Story[] {
  if (!query.trim()) return stories;

  const lowercaseQuery = query.toLowerCase();

  return stories.filter(
    (story) =>
      story.title.toLowerCase().includes(lowercaseQuery) ||
      story.description.toLowerCase().includes(lowercaseQuery) ||
      story.author.toLowerCase().includes(lowercaseQuery) ||
      story.category.label.toLowerCase().includes(lowercaseQuery) || // ✅ fixed
      (story.tags ?? []).some((tag) =>
        tag.toLowerCase().includes(lowercaseQuery)
      )
  );
}

export function filterStoriesByCategory(
  stories: Story[],
  category: string
): Story[] {
  if (!category || category === "All") return stories;
  return stories.filter((story) => story.category.value === category); // ✅ fixed
}

export function sortStories(
  stories: Story[],
  sortBy: "title" | "rating" | "recent"
): Story[] {
  return [...stories].sort((a, b) => {
    switch (sortBy) {
      case "title":
        return a.title.localeCompare(b.title);
      case "rating":
        return b.rating - a.rating;
      case "recent":
        // For demo purposes, featured stories are considered more recent
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return a.title.localeCompare(b.title);
      default:
        return 0;
    }
  });
}

export function getStoriesWithProgress(
  stories: Story[],
  userProgress: UserProgress[]
) {
  return stories.map((story) => ({
    ...story,
    userProgress: calculateStoryProgress(story, userProgress),
    isCompleted: isStoryCompleted(story, userProgress),
    hasStarted: userProgress.some((p) => p.story_id === story.id),
  }));
}

export function estimateTimeRemaining(
  content: string,
  currentPosition: number
): number {
  const remainingContent = content.slice(currentPosition);
  return calculateReadTime(remainingContent);
}
