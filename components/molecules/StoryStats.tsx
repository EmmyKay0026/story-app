import { Story } from "@/types";
import { formatReadTime } from "@/utils/storyUtils";
import { BookOpen, Clock, Star } from "lucide-react";
import React from "react";

const StoryStats = ({
  story,
  storyProgress,
}: {
  story: Story;
  storyProgress: number;
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-center gap-1 text-amber-500 mb-1">
          <Star className="w-4 h-4 fill-current" />
          <span className="font-semibold">{story.rating}</span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">Rating</p>
      </div>
      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-center gap-1 mb-1">
          <BookOpen className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-gray-900 dark:text-white">
            {story.totalEpisodes}
          </span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">Episodes</p>
      </div>
      <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <div className="flex items-center justify-center gap-1 mb-1">
          <Clock className="w-4 h-4 text-green-600" />
          <span className="font-semibold text-gray-900 dark:text-white">
            {formatReadTime(story.totalReadTime)}
          </span>
        </div>
        <p className="text-xs text-gray-600 dark:text-gray-400">Total Time</p>
      </div>
      {storyProgress > 0 && (
        <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-1">
            <span className="font-semibold text-gray-900 dark:text-white">
              {storyProgress}%
            </span>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">Progress</p>
        </div>
      )}
    </div>
  );
};

export default StoryStats;
