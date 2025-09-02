"use client";

import React from "react";
// import { Bookmark } from "lucide-react";
// import { useUser } from "@/context/UserContext";
import { getCoverImageUrl } from "@/services/story/storyActions";
import { calculateStoryProgress } from "@/utils/storyUtils";
// import { formatReadTime, calculateStoryProgress } from "@/utils/storyUtils";
// import { Navigation } from "@/components/templates/NavigationMenu";
import StoryStats from "@/components/molecules/StoryStats";
import StoryTag from "@/components/molecules/StoryTag";
import { Story } from "@/constants/stories";
import Image from "next/image";
import { useUserStore } from "@/hooks/useUserStore";
// import { useUserStore } from "@/stores/user/userStore";
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
  // const { user, toggleBookmark } = useUser();

  const user = useUserStore((state) => state.user);
  // const toggleBookmark = useUserStore((state) => state.toggleBookmark);

  // const isBookmark = user?.bookmarks.includes(story.id) || false;

  const storyProgress = user ? calculateStoryProgress(story, user.progress) : 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      <div className="md:flex">
        <div className="md:w-1/3">
          <Image
            width={400}
            height={400}
            src={getCoverImageUrl(story.coverImage)}
            alt={story.title || "Story cover image"}
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
            {/* <button
              onClick={() => toggleBookmark(story.id)}
              className="p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={
                isBookmark ? "Remove from bookmark" : "Add to bookmark"
              }
            >
              <Bookmark
                className={`w-6 h-6 ${
                  isBookmark
                    ? "fill-shaft text-shaft dark:text-white dark:fill-white"
                    : "text-gray-400"
                }`}
              />
            </button> */}
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
            {story.description}
          </p>

          <StoryStats story={story} storyProgress={storyProgress} />

          <StoryTag story={story} />
        </div>
      </div>
    </div>
  );
}
