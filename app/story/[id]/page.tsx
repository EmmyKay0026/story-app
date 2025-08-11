"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Heart,
  Star,
  Clock,
  BookOpen,
  Lock,
  Play,
  Bookmark,
} from "lucide-react";
import { useUser } from "@/context/UserContext";
import { mockStories } from "@/constants/stories";
import { calculateStoryProgress, formatReadTime } from "@/utils/storyUtils";
import { Navigation } from "@/components/templates/NavigationMenu";
import StoryStats from "@/components/molecules/StoryStats";
import StoryTag from "@/components/molecules/StoryTag";
import EpisodeCard from "@/components/molecules/EpisodeCard";
// import { Navigation } from "../../../components/Navigation";
// import { useUser } from "../../../contexts/UserContext";
// import { mockStories } from "../../../lib/data/mockData";
// import {
//   formatReadTime,
//   calculateStoryProgress,
// } from "../../../lib/utils/storyUtils";

interface StoryDetailPageProps {
  params: {
    id: string;
  };
}

export default function StoryDetailPage({ params }: StoryDetailPageProps) {
  const {
    user,
    isAuthenticated,
    toggleFavorite,
    isEpisodeUnlocked,
    unlockEpisode,
    getUserProgress,
  } = useUser();
  const router = useRouter();
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const story = mockStories.find((s) => s.id === params.id);

  if (!isAuthenticated || !user || !story) {
    return null;
  }

  const isFavorite = user.favorites.includes(story.id);
  const storyProgress = calculateStoryProgress(story, user.progress);

  const handleEpisodeClick = (
    episodeId: string,
    isPremium: boolean,
    pointsCost: number
  ) => {
    const isUnlocked = isEpisodeUnlocked(episodeId);

    if (!isPremium || isUnlocked) {
      router.push(`/read/${episodeId}`);
    } else {
      setSelectedEpisode(episodeId);
      setShowUnlockModal(true);
    }
  };

  const handleUnlockEpisode = () => {
    if (!selectedEpisode) return;

    const episode = story.episodes.find((ep) => ep.id === selectedEpisode);
    if (!episode) return;

    const success = unlockEpisode(selectedEpisode, episode.pointsCost);
    if (success) {
      setShowUnlockModal(false);
      router.push(`/read/${selectedEpisode}`);
    } else {
      // Show error - not enough points
      alert("Not enough points to unlock this episode!");
    }
  };

  return (
    <Navigation>
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => router.back()}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Story Details
          </h1>
        </div>

        {/* Story Info */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <img
                src={story.coverImage}
                alt={story.title}
                className="w-full h-64 md:h-full object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {story.title}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    by {story.author}
                  </p>
                </div>
                <button
                  onClick={() => toggleFavorite(story.id)}
                  className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  aria-label={
                    isFavorite ? "Remove from bookmark" : "Add to bookmark"
                  }
                >
                  <Bookmark
                    className={`w-6 h-6 ${
                      isFavorite
                        ? "fill-shaft text-shaft dark:text-white dark:fill-white"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                {story.description}
              </p>

              <StoryStats story={story} storyProgress={storyProgress} />

              <StoryTag story={story} />
            </div>
          </div>
        </div>

        {/* Episodes List */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Episodes
          </h3>
          <EpisodeCard
            story={story}
            setShowUnlockModal={setShowUnlockModal}
            setSelectedEpisode={setSelectedEpisode}
          />
        </div>
      </div>

      {/* Unlock Modal */}
      {showUnlockModal && selectedEpisode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock Premium Episode
            </h3>

            <div className="mb-6">
              {(() => {
                const episode = story.episodes.find(
                  (ep) => ep.id === selectedEpisode
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
                        {episode.pointsCost} points
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Your balance:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {user.points} points
                      </span>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowUnlockModal(false)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleUnlockEpisode}
                disabled={(() => {
                  const episode = story.episodes.find(
                    (ep) => ep.id === selectedEpisode
                  );
                  return !episode || user.points < episode.pointsCost;
                })()}
                className="flex-1 py-2 px-4 bg-primary hover:bg-primary disabled:bg-faded-primary text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Unlock Episode
              </button>
            </div>
          </div>
        </div>
      )}
    </Navigation>
  );
}
