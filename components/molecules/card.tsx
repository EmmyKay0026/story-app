import React from "react";
import CardSwap, { Card } from "./cardswap";
import { mockStories } from "@/constants/stories";
import { StoryCard } from "@/components/molecules/StoryCard";

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
        {mockStories.slice(0, 3).map((story) => (
          <Card key={story.id}>
            <StoryCard
              key={story.id}
              story={story}
              showProgress={false}
              showDescription={false}
              variant={"continue"}
            />
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};

export default Cards;
