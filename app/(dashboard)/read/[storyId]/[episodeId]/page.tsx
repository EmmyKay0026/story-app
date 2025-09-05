"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Star } from "lucide-react";
// import { Episode, mockStories } from "@/constants/stories";
import NoIndex from "@/components/atoms/NoIndex";
import {
  estimateTimeRemaining,
  formatReadTime,
  getNextEpisode,
  getPreviousEpisode,
} from "@/utils/storyUtils";
import { useFontSizeStore } from "@/hooks/store";
import PreferencesSetting from "@/components/molecules/PreferencesSetting";
import { useUserStore } from "@/stores/useUserStore";
import {
  fetchStoryDetails,
  fetchEpisode,
  // fetchEpisodeDetails,
  submitReview,
} from "@/services/story/storyActions";
import { Story, Episode } from "@/types/stories"; // ✅ adjust paths if needed
import { authorizationChecker } from "@/services/user/userAction";
import { debounce } from "@/utils/debounce";
import PageLoader from "@/components/atoms/PageLoader";

interface EpisodeReaderProps {
  params: Promise<{ episodeId: string; storyId: string }>;
}

export default function EpisodeReader({ params }: EpisodeReaderProps) {
  const { episodeId, storyId } = React.use(params);
  // const { dynamicSlug } = React.use(params);

  const user = useUserStore((state) => state.user);
  const isEpisodeUnlocked = useUserStore((state) => state.isEpisodeUnlocked);
  const updateProgress = useUserStore((state) => state.updateProgress);
  // const isEpisodeUnlocked = useUserStore((state) => state.isEpisodeUnlocked);
  // const unlockEpisode = useUserStore((state) => state.unlockEpisode);

  const { fontSize } = useFontSizeStore();
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);

  const [story, setStory] = useState<Story | null>(null);
  const [episode, setEpisode] = useState<Episode | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // const [storyId, setStoryId] = useState<string | null>(null);
  // const [episodeId, setEpisodeId] = useState<string | null>(null);

  const [readingProgress, setReadingProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [showRating, setShowRating] = useState(false);
  const [userRating, setUserRating] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState<string>("");
  const [showUnlockModal, setShowUnlockModal] = useState<boolean>(false);

  useEffect(() => {
    authorizationChecker(window.location.pathname);
  }, []);
  // const episodeId = dynamicSlug;
  // const [story_Id, episodeId] = dynamicSlug.split("-");
  // setStoryId(story_id);
  // setEpisodeId(episode_id);

  useEffect(() => {
    const isUnlocked = isEpisodeUnlocked(`${storyId}-${episodeId}`);
    if (!isUnlocked) {
      setShowUnlockModal(true);
    }
  }, [user]);

  // ✅ Fetch story + episode
  useEffect(() => {
    async function loadEpisodeAndStory() {
      setLoading(true);
      const storyRes = await fetchStoryDetails(storyId);
      const episodeRes = await fetchEpisode(storyId, episodeId);

      if (storyRes.error) setError(storyRes.error.error);
      else setStory(storyRes.data);

      if (episodeRes.error) setError(episodeRes.error.error);
      else setEpisode(episodeRes.data);

      setLoading(false);
    }
    loadEpisodeAndStory();
  }, [storyId, episodeId]);

  // ✅ Track scroll progress
  useEffect(() => {
    if (!episode || !user) return;

    const container = contentRef.current;
    if (!container) return;

    // Debounced backend update
    const debouncedUpdate = debounce((progress: number) => {
      updateProgress(storyId, episode.id, Math.ceil(progress));
    }, 1500); // 1.5s after scrolling stops

    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      setReadingProgress(Math.min(100, Math.max(0, progress)));

      const remainingContent = episode.content.slice(
        Math.round((progress / 100) * episode.content.length)
      );
      setTimeRemaining(estimateTimeRemaining(remainingContent, 0));

      // Trigger debounced backend update
      debouncedUpdate(progress);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [episode, user, storyId, updateProgress]);

  if (loading) return <PageLoader />;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;
  if (!episode || !story || !user) return null;

  // ✅ Navigation
  const nextEpisode = getNextEpisode(story, episode.id);
  const previousEpisode = getPreviousEpisode(story, episode.id);

  const handleNextEpisode = () => {
    if (nextEpisode) {
      // console.log(nextEpisode.id);
      router.push(`/read/${story.id}/${nextEpisode.id}`);
    }
  };

  const handlePreviousEpisode = () => {
    if (previousEpisode) {
      router.push(`/read/${story.id}/${previousEpisode.id}`);
    }
  };

  const cancelUnlockedEpisode = () => {
    router.push(`/story/${story.id}`);
  };

  const submitRating = async (rating: number) => {
    setUserRating(rating);
    // console.log("Rating:", rating);

    // console.log("Comment:", reviewComment);

    setShowRating(false);
    // In a real app, you'd save this rating to the backend

    const res = await submitReview(rating, reviewComment, story.id);

    // console.log(res);
  };

  return (
    <>
      <NoIndex />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        {/* <FontSizeControl /> */}
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

              <PreferencesSetting />
            </div>
          </div>

          {/* Progress Bar */}
          <div className="h-1 bg-gray-200 dark:bg-gray-700">
            <div
              className="h-1 bg-primary transition-all duration-300 ease-out"
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
              {episode.content.split("\n").map((paragraph, index) => (
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
                      You&apos;ve finished this story! 🎉
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
                  className="bg-primary h-2 rounded-full transition-all duration-300"
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
                name="review"
                id="review"
                value={reviewComment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setReviewComment(e.target.value)
                }
                className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-lg mb-4 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                placeholder="Leave a comment (optional)"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRating(false)}
                  className="flex-1 cursor-pointer  py-2 px-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  Cancel
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

      {showUnlockModal && story && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock Premium Episode
            </h3>

            <div className="mb-6">
              {(() => {
                const episode = story.episodes.find(
                  (ep) => ep.id === nextEpisode?.id
                );
                return episode ? (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>{episode.title}</strong>
                    </p>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">
                        Cost:
                      </span>
                      <span className="font-bold text-amber-600">
                        {Number(episode.pointsCost)} points
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Your balance:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {Number(user?.points)} points
                      </span>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => cancelUnlockedEpisode()}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // handleUnlockEpisode(); // <-- disabled for now
                  alert("Unlock function temporarily disabled");
                }}
                disabled={false}
                // disabled={(() => {
                //   if (!nextEpisode) return true;

                //   const episode = story.episodes.find((ep) => ep.id === nextEpisode.id);
                //   if (!episode) return true;

                //   if (isEpisodeUnlocked(nextEpisode.id)) return false;

                //   const cost = episode.pointsCost ?? 0;
                //   const balance = user?.points ?? 0;

                //   return balance < cost;
                // })()}

                className="flex-1 py-2 px-4 bg-primary hover:big-blue-700 disabled:bg-faded-primary text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Unlock Episode
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
