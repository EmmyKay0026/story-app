"use client";

import { Story } from "@/constants/stories";
import { useUser } from "@/context/UserContext";
import { formatReadTime, calculateStoryProgress } from "@/utils/storyUtils";
import { Heart, Clock, Star, BookOpen, Bookmark } from "lucide-react";
import Image from "next/image";

interface StoryCardProps {
  story: Story;
  variant?: "default" | "continue" | "compact" | "compact_v2";
  showProgress?: boolean;
  showDescription?: boolean;
  onClick?: () => void;
}

export function StoryCard({
  story,
  variant = "default",
  showProgress = false,
  showDescription = true,
  onClick,
}: StoryCardProps) {
  const { user, toggleFavorite } = useUser();

  const isFavorite = user?.favorites.includes(story.id) || false;
  const userProgress = user ? calculateStoryProgress(story, user.progress) : 0;
  const hasStarted =
    user?.progress.some((p) => p.storyId === story.id) || false;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(story.id);
  };

  const cardClasses = `
    group relative border border-prime rounded-lg shadow-md hover:shadow-lg 
    transition-all duration-200 cursor-pointer overflow-hidden
    ${variant === "compact" ? "h-32" : "h-600px"}
  `;

  const imageClasses = `
    w-full object-cover transition-transform duration-200 group-hover:scale-105
    ${variant === "compact" ? "h-full" : "h-48"}
  `;

  if (variant === "compact" || variant === "compact_v2") {
    return (
      <div className={cardClasses} onClick={onClick}>
        <div
          className={`flex  h-full ${
            variant === "compact_v2" ? "flex-col" : ""
          } `}
        >
          <div
            className={`w-24 flex-shrink-0 ${
              variant === "compact_v2" ? "w-full" : ""
            }`}
          >
            <Image
              src={story.coverImage}
              alt={story.title}
              width={300}
              height={400}
              className={imageClasses}
            />
          </div>
          <div className="flex-1 p-3 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-sm text-gray dark:text-white line-clamp-1">
                {story.title}
              </h3>
              {showDescription && ( // 👈 Only show if true
                <p className="text-xs text-gray-600 dark:text-white mt-1 line-clamp-2">
                  {story.description}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatReadTime(story.totalReadTime)}</span>
              </div>
              {showProgress
                ? hasStarted && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                      <div
                        className="bg-primary h-1 transition-all duration-300"
                        style={{ width: `${userProgress}%` }}
                      />
                    </div>
                  )
                : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cardClasses} onClick={onClick}>
      <div className="relative">
        <img
          src={story.coverImage}
          alt={story.title}
          className={imageClasses}
        />
        <button
          onClick={handleFavoriteClick}
          className="absolute top-2 right-2 p-2 rounded-full bg-gray-300   dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 transition-colors"
          aria-label={isFavorite ? "Remove from bookmark" : "Add to bookmark"}
        >
          <Bookmark
            className={`w-4 h-4 ${
              isFavorite
                ? "fill-shaft text-shaft dark:text-white dark:fill-white"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>
        {story.isFeatured && (
          <div className="absolute top-2 left-2 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded">
            Featured
          </div>
        )}
        {showProgress
          ? hasStarted && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div
                  className="bg-primary h-1 transition-all duration-300"
                  style={{ width: `${userProgress}%` }}
                />
              </div>
            )
          : null}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 dark:text-white line-clamp-1">
            {story.title}
          </h3>
          <div className="flex items-center gap-1 text-sm text-amber-500 flex-shrink-0 ml-2">
            <Star className="w-4 h-4 fill-current" />
            <span>{story.rating}</span>
          </div>
        </div>

        {showDescription && ( // 👈 Only show if true
          <p className="text-sm text-gray=900 dark:text-gray-100 mb-3 line-clamp-2">
            {story.description}
          </p>
        )}

        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span className="font-medium">{story.author}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              <span>{story.totalEpisodes} Ep</span>
            </div>
            <div className="md:flex hidden items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatReadTime(story.totalReadTime)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="inline-block px-2 py-1 bg-[#45B649] text-xs font-medium text-gray-700 dark:text-gray-300 rounded">
            {story.category}
          </span>
          {variant === "continue" && hasStarted && showProgress && (
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">
                {userProgress}% complete
              </span>
              <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${userProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
