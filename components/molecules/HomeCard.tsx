'use client'
import React from "react";
import Image from "next/image";
import { mockStories } from "@/constants/stories";

interface MobileStoryCardProps {
  image: string;
  title: string;
  onClick?: () => void;
}

const MobileStoryCard: React.FC<MobileStoryCardProps> = () => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {mockStories.map((story) => (
        <div>
          key={story.id}
          image={story.coverImage}
          title={story.title}
        </div>
      ))}
    </div>
  );
};

export default MobileStoryCard;

