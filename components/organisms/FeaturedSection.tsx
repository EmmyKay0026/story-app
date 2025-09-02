"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ButtonNew } from "../atoms/Button";
import { StoryCard as StoryCardV2 } from "@/components/molecules/StoryCard";
import { Story } from "@/constants/stories";
import { fetchHomeData } from "@/services/story/storyActions";

const FeaturedSection = () => {
  // let featuredStories: Story[] = [];
  // let error: string | null = null;

  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getFeaturedStories = async () => {
      try {
        const response = await fetchHomeData();

        if ("data" in response && response.data) {
          setFeaturedStories(response.data.featured || []);
        } else if ("error" in response && response.error) {
          console.error(
            "API error:",
            response.error.error,
            "Code:",
            response.error.code
          );
          setError(response.error.error);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("An error occured while getting featured stories.");
      }
    };

    getFeaturedStories();
  }, []);

  return (
    <div className="px-[1rem] md:px-[3rem]">
      <section className="max-w-7xl px-[1rem] md:px-[3rem] mb-[4rem] py-[3rem] bg-white dark:bg-black rounded-xl">
        <div className="flex justify-between items-start mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-3">
            Featured
          </h3>
          <ButtonNew />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {error ? (
            <p className="col-span-full text-center text-red-500">{error}</p>
          ) : featuredStories.length > 0 ? (
            featuredStories.slice(0, 5).map((story) => (
              <Link
                href={`/story/${story.id}`}
                key={story.id}
                className="group"
              >
                <StoryCardV2
                  story={story}
                  showProgress={false}
                  showDescription={false}
                  variant="compact_v2"
                />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">
              No featured stories found
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default FeaturedSection;
