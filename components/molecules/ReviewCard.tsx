import { Star } from "lucide-react";
import React from "react";

const ReviewCard = (review: any) => {
  return (
    <div
      //   key={idx}
      className="flex flex-col sm:flex-row items-start gap-4 bg-white dark:bg-dark-primary rounded-xl shadow p-4 md:dark:bg-shaft"
    >
      <div className="flex-shrink-0">
        <img
          src={review.userAvatar || "/no-avatar.jpg"}
          alt={"name"}
          className="w-10 h-10 rounded-full object-cover border saturate-0"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-base">{"review.userName"}</span>
          <span className="text-xs italic text-gray-400">{"review.date"}</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating || 2
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
              fill={i < review.rating || 2 ? "currentColor" : "none"}
            />
          ))}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {review.comment ||
            "Lovely story! Highly recommend it to anyone who loves a good read. The characters are well-developed and the plot is engaging. Can't wait for the next episode!"}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
