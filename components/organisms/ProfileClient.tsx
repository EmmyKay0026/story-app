"use client";
import { Story } from "@/types";

import { useUserStore } from "@/stores/useUserStore";
import React, { useEffect, useState } from "react";
import NoIndex from "../atoms/NoIndex";
import Image from "next/image";
import { Bookmark, BookOpen, Box, Coins } from "lucide-react";
import { StoryCard } from "../molecules/StoryCard";
import { calculateStoryProgress, isStoryCompleted } from "@/utils/storyUtils";
// import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { handleThemeChange } from "@/services/user/userAction";
import { fetchStories } from "@/services/story/storyActions";
import { convertDateToDateType } from "@/utils/dateTimeConverter";
import { StoryCardSkeleton } from "../skeletons/LibrarySkeletons";
import { ThemeToggle } from "../atoms/ThemeToggle";

const ProfileClient = () => {
  // console.log(allStories);

  const user = useUserStore((state) => state.user);
  const router = useRouter();
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  // const getMe = useUserStore((state) => state.getMe);
  // console.log(getMe);

  // const router = ();
  const [activeTab, setActiveTab] = useState<"stories" | "bookmark">("stories");
  // const [user, setUser] = useState<User | null>(null);
  const [allStories, setAllStories] = useState<Story[] | null>(null);

  useEffect(() => {
    const getStories = async () => {
      try {
        const response = await fetchStories();
        if ("data" in response && response.data) {
          // console.log(response);
          setAllStories(response.data.stories);
        } else if ("error" in response && response.error) {
          console.error(
            "API error:",
            response.error.error,
            "Code:",
            response.error.code
          );
        }
      } catch (err) {
        console.error("Unexpected error fetching stories:", err);
      }
    };
    getStories();
  }, []);

  if (!user) {
    router.push("/auth/login");
    return null;
  }
  const storiesWithProgress = allStories
    ?.filter((story) => user?.progress.some((p) => p.story_id === story.id))
    .map((story) => ({
      ...story,
      progress: calculateStoryProgress(story, user?.progress),
      isCompleted: isStoryCompleted(story, user?.progress),
      lastRead: user?.progress
        .filter((p) => p.story_id === story.id)
        .sort(
          (a, b) =>
            convertDateToDateType(b.lastReadAt.toString()).getTime() -
            convertDateToDateType(a.lastReadAt.toString()).getTime()
        )[0]?.lastReadAt,
    }))
    .sort(
      (a, b) =>
        convertDateToDateType(b.lastRead!.toString()).getTime() -
        convertDateToDateType(a.lastRead!.toString()).getTime()
    );
  // console.log(storiesWithProgress);

  const currentlyReading =
    storiesWithProgress?.filter((s) => !s.isCompleted) ?? [];
  const completedStories =
    storiesWithProgress?.filter((s) => s.isCompleted) ?? [];

  const totalReads = completedStories.length + currentlyReading.length;
  const bookmarkStories =
    allStories?.filter((story) => user.bookmarks.includes(story.id)) ?? [];
  // console.log(user.bookmarks, allStories);

  const handleStoryClick = (storyId: string) => {
    router.push(`/story/${storyId}`);
  };

  return (
    <>
      <NoIndex />
      <section className="relative max-w-7xl mx-auto min-h-screen">
        {/* Cover Banner */}
        <div
          className="h-48 sm:h-64 bg-cover bg-center relative"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(30,41,59,0.6)), url('https://img.freepik.com/free-photo/fantasy-group-adventurers_23-2151470683.jpg')`,
          }}
        >
          {/* Avatar + Edit */}
          <div className="absolute bottom-0 left-0 w-full flex items-end justify-between px-4 sm:px-6 lg:px-8 pb-4">
            <div className="flex items-end gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 border-white dark:border-gray-900 overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src="/no-avatar.jpg"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white">
                <h2 className="text-lg sm:text-xl font-semibold">
                  {user?.phoneNumber}
                </h2>
                <p className="text-sm text-gray-300">{user?.phoneNumber}</p>
              </div>
            </div>
            {/* <button className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-lg text-sm shadow hover:opacity-90 transition">
              <Edit3 className="w-4 h-4" />
              Edit
            </button> */}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-white dark:bg-gray-900 grid grid-cols-4 text-center border-b border-gray-200 dark:border-gray-700">
          {[
            { icon: BookOpen, label: "Read", value: totalReads },
            {
              icon: Bookmark,
              label: "Bookmark",
              value: bookmarkStories.length,
            },
            { icon: Coins, label: "Points", value: user.points },
            {
              icon: ThemeToggle,
              label: "Mode",
              value: "Theme",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              // onClick={stat.label === "Mode" ? toggleTheme : undefined}
              className={`p-4 flex flex-col items-center ${
                stat.label === "Mode" ? "cursor-pointer" : ""
              }`}
            >
              <stat.icon className="w-5 h-5 mx-auto text-primary mb-1" />
              <p className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                {stat.value}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 sticky top-[var(--nav-height,0)] z-10">
          {[
            { key: "stories", label: "My Stories" },
            { key: "bookmark", label: "Bookmark" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "stories" | "bookmark")}
              className={`flex-1 py-3 text-sm font-medium transition ${
                activeTab === tab.key
                  ? "border-b-2 border-primary text-primary"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === "stories" && (
            <>
              {!allStories ? (
                // 👉 Loading skeleton for stories
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <StoryCardSkeleton key={idx} variant="compact_v2" />
                  ))}
                </div>
              ) : currentlyReading.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentlyReading.map((item, index) => (
                    <StoryCard
                      story={item}
                      key={`${item.id}-${index}`}
                      variant="continue"
                      onClick={() => handleStoryClick(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500 py-16">
                  <Box className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No stories found</h3>
                </div>
              )}
            </>
          )}

          {activeTab === "bookmark" && (
            <>
              {!allStories ? (
                // 👉 Loading skeleton for bookmarks
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, idx) => (
                    <StoryCardSkeleton key={idx} variant="compact_v2" />
                  ))}
                </div>
              ) : bookmarkStories?.length > 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bookmarkStories.map((item, index) => (
                    <StoryCard
                      story={item}
                      key={`${item.id}-${index}`}
                      onClick={() => handleStoryClick(item.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center text-gray-500 py-16">
                  <Box className="w-16 h-16 mb-4 opacity-50" />
                  <h3 className="text-lg font-medium">No stories found</h3>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfileClient;
