"use client";
import React, { useEffect, useState } from "react";

import { mockStories } from "@/constants/stories";
import { Bookmark, Eye, Star } from "lucide-react";
import { Navigation } from "@/components/templates/NavigationMenu";
import EpisodeCard from "@/components/molecules/EpisodeCard";
import StoryTag from "@/components/molecules/StoryTag";
import ReviewCard from "@/components/molecules/ReviewCard";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/hooks/userStore";
// import { calculateStoryProgress } from "@/utils/storyUtils";

// const story = mockStories[0]; // Replace with actual story data

interface StoryDetailPageProps {
  params: Promise<{ id: string }>;
}

const StoryDetailPage = ({ params }: StoryDetailPageProps) => {
  const { id } = React.use(params);
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const router = useRouter();

  const [isEpisodesActive, setIsEpisodesActive] = useState<boolean>(true);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const story = mockStories.find((s) => s.id === id);

  if (!isAuthenticated || !user || !story) {
    return null;
  }

  const handleToggleTab = (tab: "episodes" | "details") => {
    setIsEpisodesActive(tab === "episodes");
  };

  return (
    <Navigation>
      <section className="relative max-w-4xl -screen mx-auto">
        <div
          style={{
            background: `linear-gradient(rgba(0,0,0,0.7), rgba(30,41,59,0.7)), url('${story.coverImage}') top/cover no-repeat`,
          }}
          className="h-screen inset-0 bg-cover bg-center fixed  top-0 z-[0] md:absolute"
        />
        <div className="relative pt-[29vh] w-full ">
          <article className="relative px-4 sm:px-6 lg:px-8  text-fg-dark dark:text-fg z-10 mb-8">
            <div className=" flex items-center mb-2 gap-5">
              <div className="flex items-center gap-1 text-[#c3c3c3] ">
                <Bookmark className="w-4 h-4 " />
                <span className="font-thin ">{story.rating}k</span>
              </div>
              <div className="flex items-center gap-1 text-[#c3c3c3] ">
                <Star className="w-4 h-4 " />
                <span className="font-thin ">{story.rating}k</span>
              </div>
              <div className="flex items-center gap-1 text-[#c3c3c3] ">
                <Eye className="w-4 h-4 " />
                <span className="font-thin ">{story.rating}k</span>
              </div>
            </div>

            <h2 className="text-3xl font-semibold mb-2 dark:text-fg-dark">
              {story.title}
            </h2>
            <div className="hidden md:block">
              <p className="  line-clamp-3 text-[15px] mb-4 dark:text-fg-dark">
                {story.description}
              </p>
              <StoryTag story={story} />
            </div>
          </article>
        </div>
        <div className="max-w-4xl mx-auto ">
          {/* Header */}
          {/* <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Story Details
            </h1>
          </div> */}
          {/* <div className="mb-8">
          <DetailsCard 
            story={story}
            storyProgress={true}
          />
        </div> */}

          <article className="relative flex flex-col items-center md:items-start py-5 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800  rounded-t-3xl">
            <h4 className="text-[20px] font-semibold mb-5 hidden md:block">
              Episodes
            </h4>
            <div className="  flex items-center justify-between w-full mb-5  md:hidden">
              <button
                onClick={() => handleToggleTab("episodes")}
                className={` w-[48%] h-[60px] rounded-3xl text-[18px] ${
                  isEpisodesActive ? "bg-primary" : "border border-primary"
                } `}
              >
                Episodes
              </button>
              <button
                onClick={() => handleToggleTab("details")}
                className={` w-[48%] h-[60px] rounded-3xl text-[18px] ${
                  !isEpisodesActive ? "bg-primary" : "border border-primary"
                } `}
              >
                Details
              </button>
            </div>
            {isEpisodesActive ? (
              //   ? useMemo(
              //       () => (
              <>
                <EpisodeCard
                  story={story}
                  //   setShowUnlockModal={setShowUnlockModal}
                  //   setSelectedEpisode={setSelectedEpisode}
                />
                <article className="bg-[#f6f6f6f7] dark:bg-transparent p-4 hidden md:block rounded-lg my-8 md:px-0 md:bg-transparent  w-full">
                  <h3 className="text-2xl font-semibold mb-2">Reviews</h3>
                  <div className="space-y-6">
                    {
                      // story.reviews && story.reviews.length > 0
                      true ? (
                        [1, 2, 3].map((idx: number) => (
                          <ReviewCard
                            key={idx}
                            userAvatar="/no-avatar.jpg"
                            rating={5}
                            comment="This is a sample review."
                          />
                        ))
                      ) : (
                        <p className="text-gray-500 text-center">
                          No reviews yet. Be the first to review!
                        </p>
                      )
                    }
                  </div>
                </article>
              </>
            ) : (
              //   ),
              //   [story, setShowUnlockModal, setSelectedEpisode]
              // )
              <div className="">
                <article className="bg-[#f6f6f6f7] dark:bg-dark-primary p-4 block rounded-lg mb-4">
                  <h3 className="text-2xl font-semibold mb-2">Description</h3>
                  <p className=" text-[15px] text-shaft dark:text-[#f6f6f6f7]">
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
                    {
                      // story.reviews && story.reviews.length > 0
                      true ? (
                        [1, 2, 3].map((idx: number) => (
                          <ReviewCard
                            key={idx}
                            userAvatar="/no-avatar.jpg"
                            rating={5}
                            comment="This is a sample review."
                          />
                        ))
                      ) : (
                        <p className="text-gray-500 text-center">
                          No reviews yet. Be the first to review!
                        </p>
                      )
                    }
                  </div>
                </article>
              </div>
            )}
          </article>
        </div>
      </section>
    </Navigation>
  );
};

export default StoryDetailPage;
