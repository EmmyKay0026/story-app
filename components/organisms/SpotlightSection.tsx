import React from "react";
import DetailsCard from "../molecules/DetailsCard";
import { Story } from "@/constants/stories";
import { fetchSpotlightStory } from "@/services/story/storyActions";

const SpotlightSection = async () => {
  let spotlightStory: Story | null = null;
  let error: string | null = null;

  try {
    const response = await fetchSpotlightStory();

    if ("data" in response) {
      spotlightStory = response.data ?? null;
    } else if ("error" in response) {
      console.error(
        "API error:",
        response.error.error,
        "Code:",
        response.error.code
      );
      error = response.error.error;
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    error = "Unexpected error occurred";
  }

  return (
    <section className="flex flex-col px-[1rem] py-[3rem] md:px-[3rem] lg:px-0 justify-center w-[100%] mb-[4rem] items-center bg-gray-200 dark:bg-gray-900">
      <div className="w-full flex flex-col text-center text-3xl items-center justify-center md:text-3xl font-bold text-black dark:text-white mb-[2rem]">
        <p className="mb-3">Weekly Spotlight</p>
        <div className="h-1 w-20 mt-[-6] bg-gradient-to-r from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
      </div>

      <div className="justify-center w-full lg:w-[60%] border border-prime rounded-xl items-center">
        {error ? (
          <div className="text-center py-12 px-6 text-red-500">{error}</div>
        ) : spotlightStory ? (
          <DetailsCard story={spotlightStory} />
        ) : (
          <div className="text-center py-12 px-6">
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
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
              <p className="text-lg font-medium">
                No spotlight story this week
              </p>
              <p className="text-sm">
                Check back next week for our featured story
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default SpotlightSection;
