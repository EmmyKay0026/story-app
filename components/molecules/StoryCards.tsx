"use client";

import { useThemeContext } from "@/context/ThemeContext";
import React from "react";
// import { useThemeContext } from "./ThemeProvider";

interface StoryCardProps {
  title: string;
  description: string;
  coverImage?: string;
  onRead: () => void;
}

export const StoryCard = ({
  title,
  description,
  coverImage,
  onRead,
}: StoryCardProps) => {
  const { resolvedTheme } = useThemeContext();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md ring-1 ring-black/5 dark:ring-white/10 theme-transition overflow-hidden group">
      {coverImage && (
        <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-pretty line-clamp-3">
          {description}
        </p>
        <button
          onClick={onRead}
          className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 
                     text-white font-medium py-2.5 px-4 rounded-lg theme-transition
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
        >
          Read Story
        </button>
      </div>
    </div>
  );
};
