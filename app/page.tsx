"use client";

import React from "react";
import { BookOpen } from "lucide-react";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { stories } from "@/constants/stories";
import { StoryCard } from "@/components/molecules/StoryCards";
import { FontSizeControl } from "@/components/atoms/FontSizePreference";
import Cards from "@/components/molecules/card";

export default function Home() {
  const handleReadStory = (storyId: number) => {
    console.log(`Reading story ${storyId}`);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black theme-transition">
      {/* Header
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
            <div className="flex items-center gap-3">
              <FontSizeControl />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header> */}
      <section className="relative h-[92dvh] w-full overflow-hidden">
        
        {/* Dots Background Layer */}
        {/* <div
          className="absolute inset-0 z-0 bg-[length:40px_40px] bg-[radial-gradient(white_1px,transparent_1px)]"
          style={{
            WebkitMaskImage: 'radial-gradient(white 1px, transparent 0)',
            WebkitMaskSize: '40px 40px',
            maskImage: 'radial-gradient(white 1px, transparent 0)',
            maskSize: '40px 40px',
            backgroundImage: 'linear-gradient(to bottom right, #085f33, #3aa13e, #45B649)',
            maskRepeat: 'repeat',
            WebkitMaskRepeat: 'repeat',
          }}
        /> */}
        {/* Floating 3D Bubbles */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#45B649]/30 rounded-full bubble-3d blur-xl shadow-2xl z-0"></div>
        <div className="absolute bottom-20 left-30 w-28 h-28 bg-[#3aa13e]/30 rounded-full bubble-3d blur-2xl shadow-xl z-0" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[40%] right-[60%] w-16 h-16 bg-[#085f33]/30 rounded-full bubble-3d blur-md shadow-xl z-0" style={{ animationDelay: '2s' }}></div>
        {/* Floating 3D Bubbles */}
        {/* <div className="absolute top-15 left-200 w-20 h-20 bg-[#45B649]/30 rounded-full bubble-3d blur-xl shadow-2xl z-0"></div>
        <div className="absolute bottom-10 left-80 w-28 h-28 bg-[#3aa13e]/30 rounded-full bubble-3d blur-2xl shadow-xl z-0" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-[60%] right-[40%] w-16 h-16 bg-[#085f33]/30 rounded-full bubble-3d blur-md shadow-xl z-0" style={{ animationDelay: '2s' }}></div> */}



        {/* Content Layer */}
        <div className="relative z-10 flex justify-between gap-[2rem] h-full py-[1rem] px-[3.5rem]">
          <div className="flex flex-col text-left justify-center">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Step Into a World of <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#085f33] via-[#3aa13e] to-[#45B649]">
                {" "}Stories
              </span>
            </h2>
            <p className="text-lg md:text-xl text-black-900 dark:text-gray-300 max-w-2xl mx-auto">
              From thrilling adventures to heartwarming tales. Discover stories that inspire, entertain, and transport you to incredible new worlds. Start your reading journey today.
            </p>
          </div>
          <Cards/>
          
        </div>
      </section>

      {/* <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20 theme-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Welcome to Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
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
      </section> */}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
            Featured Stories
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {stories.map((story) => (
            <StoryCard
              key={story.id}
              title={story.title}
              description={story.description}
              coverImage={story.coverImage}
              onRead={() => handleReadStory(story.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
