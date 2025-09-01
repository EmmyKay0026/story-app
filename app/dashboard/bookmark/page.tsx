"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { Story } from "@/constants/stories";
import { Navigation } from "@/components/templates/NavigationMenu";
import { StoryCard } from "@/components/molecules/StoryCard";
import Link from "next/link";
// import { useUserStore } from "@/stores/user/userStore";
import NoIndex from "@/components/atoms/NoIndex";
import { authorizationChecker } from "@/services/user/userAction";
import { fetchStories } from "@/services/story/storyActions";
import { useUserStore } from "@/hooks/useUserStore";

export default function BookmarksPage() {
  const user = useUserStore((state) => state.user);
  // const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const router = useRouter();

  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    const fetchStoriesData = async () => {
      const response = await fetchStories();

      if ("data" in response && response.data) {
        setStories(response.data.stories);
      } else if ("error" in response && response.error) {
        console.error(
          "API error:",
          response.error.error,
          "Code:",
          response.error.code
        );
      }
    };

    fetchStoriesData();
  }, []);

  useEffect(() => {
    authorizationChecker(window.location.pathname);
  }, []);

  if (!user) {
    return null;
  }

  const bookmarkStories = stories.filter((story) =>
    user.bookmarks.includes(story.id)
  );

  const handleStoryClick = (storyId: string) => {
    router.push(`/story/${storyId}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <NoIndex />
      {/* Header */}
      <div className="flex items-start gap-3 mb-8">
        <Bookmark className="w-8 h-8 text-shaft dark:text-white fill-current" />
        <div className="mt-0 p-0">
          <h1 className="text-3xl mt-0 p-0 font-bold text-gray-900 dark:text-white">
            Your Bookmarks
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Stories you&apos;ve saved for later
          </p>
        </div>
      </div>

      {bookmarkStories.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
            <Bookmark className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No bookmarks yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
            When you find stories you love, tap the bookmark icon to save them
            here for quick access.
          </p>
          <Link href={"/library"} className="inline-block cursor-pointer">
            <button className="btn-primary cursor-pointer">
              Explore Stories
            </button>
          </Link>
        </div>
      ) : (
        <>
          {/* Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookmarkStories.length}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Bookmark Stories
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {bookmarkStories.reduce(
                    (sum, story) => sum + story.totalEpisodes,
                    0
                  )}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total Episodes
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(
                    (bookmarkStories.reduce(
                      (sum, story) => sum + story.rating,
                      0
                    ) /
                      bookmarkStories.length) *
                      10
                  ) / 10}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Average Rating
                </div>
              </div>
            </div>
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookmarkStories.map((story) => (
              <StoryCard
                key={story.id}
                story={story}
                showProgress={true}
                onClick={() => handleStoryClick(story.id)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
