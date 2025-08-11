// import { FontSizeControl } from "@/components/atoms/FontSizePreference";
import FontSizeControl from "@/components/atoms/FontSizeControl";
import { ThemeToggle } from "@/components/atoms/ThemeToggle";
import { StoryCard } from "@/components/molecules/StoryCard";
import StoryStats from "@/components/molecules/StoryStats";
import StoryTag from "@/components/molecules/StoryTag";
import { mockStories } from "@/constants/stories";
import { calculateStoryProgress, formatReadTime } from "@/utils/storyUtils";
import React from "react";

const Components = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center min-h-screen gap-2.5 bg-gray-50 dark:bg-gray-900 p-4">
        <StoryCard
          key={`${mockStories[0].id}-continue`}
          story={mockStories[0]}
          showProgress={true}
          variant={"continue"}
        />
        <StoryCard
          key={`${mockStories[0].id}-default`}
          story={mockStories[0]}
          showProgress={false}
          variant={"default"}
        />
        <StoryCard
          key={`${mockStories[0].id}-compact`}
          story={mockStories[0]}
          showProgress={false}
          variant={"compact"}
        />

        <StoryStats story={mockStories[0]} storyProgress={20} />

        <StoryTag story={mockStories[0]} />
        {/* <FontSizeControl /> */}
        <FontSizeControl />
        <ThemeToggle />
      </section>
    </>
  );
};

export default Components;
