import { Story } from "@/constants/stories";
import Link from "next/link";
import React from "react";

const StoryTag = ({ story }: { story: Story }) => {
  // Ensure tags is always an array
  const tags = Array.isArray(story.tags) ? story.tags : [];

  return (
    <div className="flex flex-wrap gap-2">
      {/* Category */}
      {story.category && (
        <span className="inline-block px-3 py-1 bg-[#ccffd0c5] dark:bg-faded-primary text-primary dark:text-dark-primary text-sm font-medium rounded-full">
          {story.category}
        </span>
      )}

      {/* Tags */}
      {tags.map((tag) => (
        <Link
          href={`/library/?tag=${String(tag).toLowerCase()}`}
          key={tag}
          className="inline-block px-3 py-1 bg-gray-100 dark:bg-shaft text-gray-700 dark:text-gray-300 text-sm rounded-full"
        >
          {tag}
        </Link>
      ))}
    </div>
  );
};

export default StoryTag;
