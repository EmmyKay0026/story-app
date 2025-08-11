"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { mockStories, stories } from "@/constants/stories";
import { StoryCard } from "@//components/molecules/StoryCards";
import { StoryCard as StoryCardV2 } from "@/components/molecules/StoryCard";
import { FontSizeControl } from "@/components/atoms/FontSizePreference";
import Link from "next/link";

export default function Home() {
  const handleReadStory = (storyId: number) => {
    console.log(`Reading story ${storyId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Storybook
              </h1>
            </div>
            <div className="flex items-center gap-3"></div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Welcome to Your
              <span className="text-transparent text-gradient ">
                {" "}
                Story Adventure
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover magical tales and adventures waiting to be explored. Each
              story is a doorway to new worlds and endless possibilities.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Featured Stories
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mockStories.map((story) => (
            <Link href={`/story/${story.id}`} key={story.id} className="group">
              <StoryCardV2
                key={story.id}
                story={story}
                showProgress={true}
                variant={"continue"}
              />
            </Link>
          ))}

          {/* {stories.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              description={story.description}
              coverImage={story.coverImage}
              onRead={() => handleReadStory(story.id)}
            />
          ))} */}
        </div>
      </main>
    </div>
  );
}
