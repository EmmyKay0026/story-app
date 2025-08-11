import { Story } from "@/constants/stories";
import React from "react";

const StoryTag = ({ story }: { story: Story }) => {
  return (
    //Tags
    <div className="flex flex-wrap gap-2">
      <span className="inline-block px-3 py-1 bg-[#ccffd0c5] dark:bg-blue-900 text-primary dark:text-blue-200 text-sm font-medium rounded-full">
        {story.category}
      </span>
      {story.tags.map((tag) => (
        <span
          key={tag}
          className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
        >
          {tag}
        </span>
      ))}
    </div>
  );
};

export default StoryTag;
