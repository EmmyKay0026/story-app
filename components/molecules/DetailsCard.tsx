"use client";

import React from "react";
import { Bookmark } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { calculateStoryProgress } from "@/utils/storyUtils";
// import { formatReadTime, calculateStoryProgress } from "@/utils/storyUtils";
// import { Navigation } from "@/components/templates/NavigationMenu";
import StoryStats from "@/components/molecules/StoryStats";
import StoryTag from "@/components/molecules/StoryTag";
import { Story } from "@/constants/stories";
import Image from "next/image";
// import EpisodeCard from "@/components/molecules/EpisodeCard";
// import { Navigation } from "../../../components/Navigation";
// import { useUser } from "../../../contexts/UserContext";
// import { mockStories } from "../../../lib/data/mockData";
// import {
//   formatReadTime,
//   calculateStoryProgress,
// } from "../../../lib/utils/storyUtils";

interface StoryCardProps {
  story: Story;
  storyProgress?: boolean;
  onClick?: () => void;
}

export default function DetailsCard({
  story,
}: // storyProgress = false,
// onClick,
StoryCardProps) {
  const { user, toggleFavorite } = useUser();

  const isFavorite = user?.favorites.includes(story.id) || false;
  // const userProgress = user ? calculateStoryProgress(story, user.progress) : 0;
  // const hasStarted =
  //   user?.progress.some((p) => p.storyId === story.id) || false;

  // const handleFavoriteClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   toggleFavorite(story.id);
  // };

  // const {
  //   user,
  //   isAuthenticated,
  //   toggleFavorite,
  //   isEpisodeUnlocked,
  //   unlockEpisode,
  //   getUserProgress,
  // } = useUser();
  // const router = useRouter();
  // const [showUnlockModal, setShowUnlockModal] = useState(false);
  // const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/auth/login");
  //   }
  // }, [isAuthenticated, router]);

  // const story = mockStories.find((s) => s.id === params.id);

  // const isFavorite = user.favorites.includes(story.id);
  const storyProgress = user ? calculateStoryProgress(story, user.progress) : 0;

  // const handleEpisodeClick = (
  //   episodeId: string,
  //   isPremium: boolean,
  //   pointsCost: number
  // ) => {
  //   const isUnlocked = isEpisodeUnlocked(episodeId);

  //   if (!isPremium || isUnlocked) {
  //     router.push(`/read/${episodeId}`);
  //   } else {
  //     setSelectedEpisode(episodeId);
  //     setShowUnlockModal(true);
  //   }
  // };

  // const handleUnlockEpisode = () => {
  //   if (!selectedEpisode) return;

  //   const episode = story.episodes.find((ep) => ep.id === selectedEpisode);
  //   if (!episode) return;

  //   const success = unlockEpisode(selectedEpisode, episode.pointsCost);
  //   if (success) {
  //     setShowUnlockModal(false);
  //     router.push(`/read/${selectedEpisode}`);
  //   } else {
  //     // Show error - not enough points
  //     alert("Not enough points to unlock this episode!");
  //   }
  // };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <Image
            width={400}
            height={400}
            src={story.coverImage}
            alt={story.title}
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
        <div className="md:w-2/3 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
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
  );
}
