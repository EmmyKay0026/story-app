"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Settings,
  ChevronLeft,
  ChevronRight,
  Star,
  RotateCcw,
} from "lucide-react";
import { mockStories } from "@/constants/stories";
import {
  estimateTimeRemaining,
  formatReadTime,
  getNextEpisode,
  getPreviousEpisode,
} from "@/utils/storyUtils";
import { useUser } from "@/context/UserContext";
import { useFontSizeStore } from "@/hooks/store";
import FontSizeControl from "@/components/atoms/FontSizeControl";

interface EpisodeReaderProps {
  params: {
    episodeId: string;
  };
}

export default function EpisodeReader({ params }: EpisodeReaderProps) {
  const { user, isAuthenticated, updateProgress, isEpisodeUnlocked } =
    useUser();
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSizeStore();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  const [showPreferences, setShowPreferences] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState(0);
  // const [domFontSize, setDomFontSize] = useState(fontSize);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  // Find the story and episode
  const story = mockStories.find((s) =>
    s.episodes.some((ep) => ep.id === params.episodeId)
  );
  const episode = story?.episodes.find((ep) => ep.id === params.episodeId);

  useEffect(() => {
    if (!story || !episode || !user) return;

    // Check if episode is unlocked
    if (episode.isPremium && !isEpisodeUnlocked(episode.id)) {
      router.push(`/story/${story.id}`);
      return;
    }

    // Load existing progress
    const existingProgress = user.progress.find(
      (p) => p.storyId === story.id && p.episodeId === episode.id
    );

    if (existingProgress) {
      setReadingProgress(existingProgress.progress);
    }
  }, [story, episode, user, isEpisodeUnlocked, router]);

  // Handle scroll tracking for progress
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current || !story || !episode) return;

      const container = contentRef.current;
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setReadingProgress(Math.min(100, Math.max(0, progress)));

      // Calculate time remaining
      const remainingContent = episode.content.slice(
        Math.round((progress / 100) * episode.content.length)
      );
      setTimeRemaining(estimateTimeRemaining(remainingContent, 0));

      // Update progress in context (debounced)
      clearTimeout((window as any).progressTimeout);
      (window as any).progressTimeout = setTimeout(() => {
        updateProgress(story.id, episode.id, progress);
      }, 1000);
    };

    const container = contentRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [story, episode, updateProgress]);

  // Show rating when episode is completed
  // useEffect(() => {
  //   if (readingProgress >= 100 && !showRating) {
  //     setTimeout(() => setShowRating(true), 2000);
  //   }
  // }, [readingProgress, showRating]);

  if (!isAuthenticated || !user || !story || !episode) {
    return null;
  }

  const nextEpisode = getNextEpisode(story, episode.id);
  const previousEpisode = getPreviousEpisode(story, episode.id);

  const handleNextEpisode = () => {
    if (nextEpisode) {
      if (nextEpisode.isPremium && !isEpisodeUnlocked(nextEpisode.id)) {
        router.push(`/story/${story.id}`);
      } else {
        router.push(`/read/${nextEpisode.id}`);
      }
    }
  };

  const handlePreviousEpisode = () => {
    if (previousEpisode) {
      router.push(`/read/${previousEpisode.id}`);
    }
  };

  const submitRating = (rating: number) => {
    setUserRating(rating);
    setShowRating(false);
    // In a real app, you'd save this rating to the backend
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <FontSizeControl />
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(`/story/${story.id}`)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Back to story"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="hidden sm:block">
              <h1 className="font-semibold text-gray-900 dark:text-white truncate">
                {episode.title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {story.title} • Episode {episode.order}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <span>{Math.round(readingProgress)}% complete</span>
              <span>{formatReadTime(timeRemaining)} left</span>
            </div>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Reading preferences"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <div
            className="h-1 bg-blue-600 transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          />
        </div>
      </header>

      {/* Reading Preferences Panel */}
      {/* {showPreferences && (
        <div className="fixed top-20 right-4 z-50">
          <ReadingPreferencesPanel />
        </div>
      )} */}

      {/* Main Content */}
      <main className="relative">
        <div
          ref={contentRef}
          className="max-w-3xl mx-auto p-6 pb-32 custom-scrollbar"
          style={{ height: "calc(100vh - 80px)", overflowY: "auto" }}
        >
          {/* Episode Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {episode.title}
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600 dark:text-gray-400">
              <span>
                Episode {episode.order} of {story.totalEpisodes}
              </span>
              <span>•</span>
              <span>{formatReadTime(episode.readTime)} read</span>
            </div>
          </header>

          {/* Episode Content */}
          <article className="reading-content text-gray-900 dark:text-gray-100 leading-read">
            {episode.content.split("\n\n").map((paragraph, index) => (
              <p key={index} className={`mb-6 ${fontSize}`}>
                {paragraph.trim()}
              </p>
            ))}
          </article>

          {/* Episode End Actions */}
          {/* {readingProgress >= 98 && ( */}
          <div className="mt-12 text-center">
            <div
              onClick={() => setShowRating(true)}
              className="inline-flex items-center cursor-pointer gap-2 px-4 py-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full mb-6"
            >
              Review this episode
            </div>

            <div className="space-y-4 ">
              {nextEpisode ? (
                <button
                  onClick={handleNextEpisode}
                  className=" btn-primary w-full sm:w-auto cursor-pointer"
                >
                  Continue to Episode {nextEpisode.order}
                  {/* <ChevronRight className="w-4 h-4 ml-2" /> */}
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    You've finished this story! 🎉
                  </p>
                  <button
                    onClick={() => router.push(`/story/${story.id}`)}
                    className="btn-secondary cursor-pointer"
                  >
                    Back to Story Details
                  </button>
                </div>
              )}

              <div className="flex gap-2 justify-center">
                {previousEpisode && (
                  <button
                    onClick={handlePreviousEpisode}
                    className="btn-ghost flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 " />
                    Previous Episode
                  </button>
                )}
                <button
                  onClick={() => router.push(`/story/${story.id}`)}
                  className="btn-ghost cursor-pointer"
                >
                  Story Details
                </button>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 p-4 safe-bottom">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <button
            onClick={handlePreviousEpisode}
            disabled={!previousEpisode}
            className="flex items-center gap-1 px-3 py-2 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <span className="hidden sm:inline">
              {Math.round(readingProgress)}%
            </span>
            <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${readingProgress}%` }}
              />
            </div>
            <span className="hidden sm:inline">
              {formatReadTime(timeRemaining)} left
            </span>
          </div>

          <button
            onClick={handleNextEpisode}
            disabled={!nextEpisode}
            className="flex items-center gap-1 cursor-pointer px-3 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Rating Modal */}
      {showRating && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              How was this episode?
            </h3>

            <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
              Your feedback helps us recommend better stories
            </p>

            <div className="flex items-center justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setUserRating(rating)}
                  className="p-1 hover:scale-110 transition-transform cursor-pointer"
                >
                  <Star
                    className={`w-8 h-8 cursor-pointer ${
                      rating <= userRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              placeholder="Leave a comment (optional)"
            />
            <div className="flex gap-3">
              <button
                onClick={() => setShowRating(false)}
                className="flex-1 cursor-pointer  py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Skip
              </button>
              <button
                onClick={() => submitRating(userRating || 5)}
                className="flex-1 cursor-pointer btn-primary"
              >
                Submit Rating
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
