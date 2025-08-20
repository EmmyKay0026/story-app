"use client";

import { useEffect, useState } from "react";
import { Navigation } from "@/components/templates/NavigationMenu";
import { Edit3, BookOpen, Bookmark, Coins, SunMoon } from "lucide-react";
import { mockStories } from "@/constants/stories";
import { calculateStoryProgress, isStoryCompleted } from "@/utils/storyUtils";
import { useRouter } from "next/navigation";
import { StoryCard } from "@/components/molecules/StoryCard";
import Image from "next/image";
import { useUserStore } from "@/hooks/userStore";
import NoIndex from "@/components/atoms/NoIndex";

export default function ProfilePage() {
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);

  const router = useRouter();
  const [activeTab, setActiveTab] = useState<
    "stories" | "bookmark" | "activity"
  >("stories");

  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Redirect if not logged in
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  // Load theme on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "light";
      setTheme(storedTheme);
      document.documentElement.classList.toggle("dark", storedTheme === "dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  if (!isAuthenticated || !user) return null;

  // Story progress logic
  const storiesWithProgress = mockStories
    .filter((story) => user?.progress.some((p) => p.storyId === story.id))
    .map((story) => ({
      ...story,
      progress: calculateStoryProgress(story, user?.progress),
      isCompleted: isStoryCompleted(story, user?.progress),
      lastRead: user?.progress
        .filter((p) => p.storyId === story.id)
        .sort((a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime())[0]
        ?.lastReadAt,
    }))
    .sort((a, b) => b.lastRead!.getTime() - a.lastRead!.getTime());

  const currentlyReading = storiesWithProgress.filter((s) => !s.isCompleted);
  const completedStories = storiesWithProgress.filter((s) => s.isCompleted);

  const totalReads = completedStories.length + currentlyReading.length;
  const bookmarkStories = mockStories.filter((story) =>
    user.bookmarks.includes(story.id)
  );
  return (
    <Navigation>
      <NoIndex />
      <section className="relative max-w-4xl mx-auto min-h-screen">
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
            <button className="flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-lg text-sm shadow hover:opacity-90 transition">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
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
              icon: SunMoon,
              label: "Mode",
              value: localStorage.getItem("theme") || "Light",
            },
          ].map((stat, idx) => (
            <div
              key={idx}
              onClick={stat.label === "Mode" ? toggleTheme : undefined}
              className={`p-4 ${stat.label === "Mode" ? "cursor-pointer" : ""}`}
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
            { key: "activity", label: "Activity" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveTab(tab.key as "stories" | "bookmark" | "activity")
              }
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentlyReading.map((item, index) => (
                <StoryCard
                  story={item}
                  key={`${item.id}-${index}`}
                  variant="continue"
                />
                // <div
                //   key={item}
                //   className="bg-white dark:bg-dark-primary rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                // >
                //   <div className="h-32 bg-gray-200 dark:bg-gray-700">
                //     <img
                //       src={`/images/story-${item}.jpg`}
                //       alt="Story cover"
                //       className="w-full h-full object-cover"
                //     />
                //   </div>
                //   <div className="p-4">
                //     <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                //       Story Title {item}
                //     </h3>
                //     <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                //       Short description of the story goes here...
                //     </p>
                //   </div>
                // </div>
              ))}
            </div>
          )}

          {activeTab === "bookmark" && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarkStories.map((item, index) => (
                <StoryCard story={item} key={(item.id, index)} />
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <ul className="space-y-3">
              {[1, 2, 3].map((item) => (
                <li
                  key={item}
                  className="bg-white dark:bg-dark-primary p-4 rounded-lg shadow hover:shadow-md transition"
                >
                  <p className="text-sm text-gray-900 dark:text-white">
                    You finished reading{" "}
                    <span className="font-semibold">Story {item}</span>
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    2 days ago
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </Navigation>
  );
}
