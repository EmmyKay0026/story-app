import React from 'react';
import Link from 'next/link';
import Button, { ButtonNew } from '../atoms/Button';
import { StoryCard as StoryCardV2 } from "@/components/molecules/StoryCard";
import { fetchTopRatedStories } from '@/services/story/storyActions';
import { Story } from '@/constants/stories';

const TopRated = async () => {
  let topRatedStories: Story[] = [];
  let error: string | null = null;

  try {
    const response = await fetchTopRatedStories();

    if ("data" in response && response.data) {
      topRatedStories = response.data;
    } else if ("error" in response && response.error) {
      console.error("API error:", response.error.error, "Code:", response.error.code);
      error = response.error.error;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    error = "Unexpected error occurred";
  }

  return (
    <section className="max-w-7xl mx-[1rem] md:mx-[3rem] lg:mx-[3rem] top-[20%] py-[3rem] mb-[4rem] px-[2rem] md:px-[3.5rem] bg-white dark:bg-black rounded-xl relative">
      <div className="flex justify-between items-start">
        <div className="mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">
            Top Rated
          </h3>
          <div className="h-1 w-20 bg-gradient-to-r mt-[-6] from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
        </div>
        <ButtonNew />
      </div>

      {/* Stories Grid */}
      {error ? (
        <div className="col-span-full text-center py-12 text-red-500">
          {error}
        </div>
      ) : topRatedStories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {topRatedStories.map((story) => (
            <Link href={`/story/${story.id}`} key={story.id} className="group">
              <StoryCardV2
                story={story}
                showProgress={false}
                showDescription={false}
                variant="continue"
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="col-span-full text-center py-12">
          <div className="text-gray-500 dark:text-gray-400">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <p className="text-lg font-medium">No stories found</p>
            <p className="text-sm">Check back later for top-rated stories</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopRated;
