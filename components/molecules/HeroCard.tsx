"use client";

import Image from "next/image";
import { Story } from "@/types";
import { getCoverImageUrl } from "@/services/story/storyActions";

interface StoryCardProps {
  story: Story;
}

export default function HeroCard({ story }: StoryCardProps) {
  return (
    <div className="relative cursor-pointer w-full h-full rounded-xl overflow-hidden shadow-md hover:shadow-xl transition group">
      {/* Background Image */}
      <Image
        src={getCoverImageUrl(story.coverImage)}
        alt={story.title}
        fill
        priority
        className="object-cover group-hover:scale-105 transition-transform duration-300"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Text at bottom-left */}
      <div className="absolute bottom-4 left-4">
        <h3 className="text-lg font-semibold text-white drop-shadow-md line-clamp-2">
          {story.title}
        </h3>
        <p className="text-sm text-gray-200 drop-shadow">by {story.author}</p>
      </div>
    </div>
  );
}
