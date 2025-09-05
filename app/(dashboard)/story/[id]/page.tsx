"use client";

import React, { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
// import { Navigation } from "@/components/templates/NavigationMenu";
import EpisodeCard from "@/components/molecules/EpisodeCard";
import StoryTag from "@/components/molecules/StoryTag";
import ReviewCard from "@/components/molecules/ReviewCard";
import { useRouter, useParams } from "next/navigation";
// import { useUserStore } from "@/hooks/userStore";
import NoIndex from "@/components/atoms/NoIndex";
import { fetchStoryDetails } from "@/services/story/storyActions"; // ✅ import your API
import { Story } from "@/types/stories";
import { authorizationChecker } from "@/services/user/userAction";
// import { fetchStories } from "@/services/story/storyActions";
import { useUserStore } from "@/stores/useUserStore";
import PageLoader from "@/components/atoms/PageLoader";
// import Button from "@/components/atoms/Button";
// import { useUserStore } from "@/hooks/store";
// import { useUserStore } from "@/stores/user/userStore";
// import { calculateStoryProgress } from "@/utils/storyUtils";

// const story = mockStories[0]; // Replace with actual story data

// interface StoryDetailPageProps {
//   params: Promise<{ id: string }>;
// }

const StoryDetailPage = () => {
  const { id } = useParams<{ id: string }>(); // ✅ get story ID from route
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const toggleBookmark = useUserStore((state) => state.toggleBookmark);
  const isBookmark = (user?.bookmarks ?? []).includes(id) || false;

  const router = useRouter();

  const [story, setStory] = useState<Story | null>(null);
  const [isEpisodesActive, setIsEpisodesActive] = useState<boolean>(true);
  const [loading, setLoading] = useState(true);
  // const [bookmarkIsLoading, setBookmarkIsLoading] = useState(false);

  useEffect(() => {
    authorizationChecker(window.location.pathname);
  }, []);

  useEffect(() => {
    const loadStory = async () => {
      setLoading(true);
      const response = await fetchStoryDetails(id);

      if ("data" in response && response.data) {
        setStory(response.data);
      } else {
        console.error("Error fetching story:", response.error);
      }

      setLoading(false);
    };

    if (id) loadStory();
  }, [id, isAuthenticated, router]);

  const handleBookmarkToggle = async (id: string) => {
    // setBookmarkIsLoading(true);

    await toggleBookmark(id);

    // setBookmarkIsLoading(false);
  };
  if (!isAuthenticated || !user) return null;

  if (loading) {
    return (
      <section className="relative w-full h-screen flex justify-center items-center">
        <PageLoader />
      </section>
    );
  }

  if (!story) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Story not found.</p>
      </div>
    );
  }

  const handleToggleTab = (tab: "episodes" | "details") => {
    setIsEpisodesActive(tab === "episodes");
  };

  return (
    <>
      <NoIndex />
      <section className="relative max-w-4xl mx-auto">
        <div
          style={{
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(30,41,59,0.7)), url('${story.coverImage}') top/cover no-repeat`,
          }}
          className="h-screen inset-0 bg-cover bg-center fixed top-0 z-[0] md:absolute"
        />
        <div className="relative pt-[29vh] w-full">
          <article className="relative px-4 sm:px-6 lg:px-8 text-fg-dark dark:text-fg z-10 mb-8">
            {/* <div className="flex items-center mb-2 gap-5">
              <div className="flex items-center gap-1 text-[#c3c3c3]">
                <Bookmark className="w-4 h-4" />
                <span className="font-thin">{story.rating}k</span>
              </div>
              <div className="flex items-center gap-1 text-[#c3c3c3]">
                <Star className="w-4 h-4" />
                <span className="font-thin">{story.rating}k</span>
              </div>
              <div className="flex items-center gap-1 text-[#c3c3c3]">
                <Eye className="w-4 h-4" />
                <span className="font-thin">{story.rating}k</span>
              </div>
            </div> */}
            <div className="flex items-center gap-8 mb-2">
              <h2 className="text-3xl font-semibold  dark:text-fg-dark">
                {story.title}
              </h2>
              <Bookmark
                onClick={() => handleBookmarkToggle(id)}
                className={`w-7 h-7 cursor-pointer ${
                  isBookmark
                    ? "fill-white text-white dark:text-white dark:fill-white"
                    : "text-white dark:text-gray-300"
                }`}
              />
            </div>
            <div className="flex items-center gap-4 mb-4"></div>
            <div className="hidden md:block">
              <p className="line-clamp-3 text-[15px] mb-4 dark:text-fg-dark">
                {story.description}
              </p>
              <StoryTag story={story} />
            </div>
          </article>
        </div>

        {/* Episodes / Details Section */}
        <div className="max-w-4xl mx-auto">
          <article className="relative flex flex-col items-center md:items-start py-5 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800 rounded-t-3xl">
            <h4 className="text-[20px] font-semibold mb-5 hidden md:block">
              Episodes
            </h4>
            <div className="flex items-center justify-between w-full mb-5 md:hidden">
              <button
                onClick={() => handleToggleTab("episodes")}
                className={`w-[48%] h-[60px] rounded-3xl text-[18px] ${
                  isEpisodesActive ? "bg-primary" : "border border-primary"
                }`}
              >
                Episodes
              </button>
              <button
                onClick={() => handleToggleTab("details")}
                className={`w-[48%] h-[60px] rounded-3xl text-[18px] ${
                  !isEpisodesActive ? "bg-primary" : "border border-primary"
                }`}
              >
                Details
              </button>
            </div>

            {isEpisodesActive ? (
              <>
                <EpisodeCard story={story} />
                <article className="bg-[#f6f6f6f7] dark:bg-transparent p-4 hidden md:block rounded-lg my-8 md:px-0 md:bg-transparent w-full">
                  <h3 className="text-2xl font-semibold mb-2">Reviews</h3>
                  <div className="space-y-6">
                    {story.reviews && story.reviews.length > 0 ? (
                      story.reviews.map((review, idx: number) => (
                        <ReviewCard
                          key={idx}
                          userAvatar="/no-avatar.jpg"
                          rating={review.rating}
                          comment={review.comment}
                          created_at={review.created_at}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">
                        No reviews yet. Be the first to review!
                      </p>
                    )}
                  </div>
                </article>
              </>
            ) : (
              <div>
                <article className="bg-[#f6f6f6f7] dark:bg-dark-primary p-4 block rounded-lg mb-4">
                  <h3 className="text-2xl font-semibold mb-2">Description</h3>
                  <p className="text-[15px] text-shaft dark:text-[#f6f6f6f7]">
                    {story.description}
                  </p>
                </article>
                <article className="bg-[#f6f6f6f7] dark:bg-dark-primary p-4 block rounded-lg mb-4">
                  <h3 className="text-2xl font-semibold mb-3">Tags</h3>
                  <StoryTag story={story} />
                </article>
                <article className="bg-[#f6f6f6f7] dark:bg-transparent p-0 mt-10 block rounded-lg mb-4  ">
                  <h3 className="text-2xl font-semibold mb-3">Reviews</h3>
                  <div className="space-y-6">
                    {story.reviews && story.reviews.length > 0 ? (
                      story.reviews.map((review, idx: number) => (
                        <ReviewCard
                          key={idx}
                          userAvatar="/no-avatar.jpg"
                          rating={review.rating}
                          comment={review.comment}
                          created_at={review.created_at}
                        />
                      ))
                    ) : (
                      <p className="text-gray-500 text-center">
                        No reviews yet. Be the first to review!
                      </p>
                    )}
                  </div>
                </article>
              </div>
            )}
          </article>
        </div>
      </section>
    </>
  );
};

export default StoryDetailPage;
