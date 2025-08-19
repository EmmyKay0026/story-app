import React from "react";
import CardSwap, { Card } from "./cardswap";
import { mockStories } from "@/constants/stories";
import { StoryCard } from "@/components/molecules/StoryCard";
import HeroCard from "@/components/molecules/HeroCard";

const Cards = ({ limit = 3 }) => {
  return (
    <div style={{ flexBasis: "50%", position: "relative" }}>
      <CardSwap
        width={350}
        height={315}
        cardDistance={40}
        verticalDistance={40}
        delay={5000}
        pauseOnHover={false}
      >
        {mockStories.slice(0, limit).map((story) => (
          <Card key={story.id}>
            <HeroCard
              key={story.id}
              story={story}
            />
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};

export default Cards;
