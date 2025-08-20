"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, CheckCircle, PlayCircle } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { mockStories } from "@/constants/stories";
import NoIndex from "@/components/atoms/NoIndex";
import {
  calculateStoryProgress,
  formatReadTime,
  isStoryCompleted,
} from "@/utils/storyUtils";
import { Navigation } from "@/components/templates/NavigationMenu";
import { StoryCard } from "@/components/molecules/StoryCard";
// import { Navigation } from "../../components/Navigation";
// import { StoryCard } from "../../components/StoryCard";
// import { useUser } from "../../contexts/UserContext";
// import { mockStories } from "../../lib/data/mockData";
// import {
//   calculateStoryProgress,
//   isStoryCompleted,
//   formatReadTime,
// } from "@lib/utils/storyUtils";

export default function MyReadsPage() {
  const { user, isAuthenticated } = useUser();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"reading" | "completed">(
    "reading"
  );

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }

  // Get all stories that user has started
  const storiesWithProgress = mockStories
    .filter((story) => user.progress.some((p) => p.storyId === story.id))
    .map((story) => ({
      ...story,
      progress: calculateStoryProgress(story, user.progress),
      isCompleted: isStoryCompleted(story, user.progress),
      lastRead: user.progress
        .filter((p) => p.storyId === story.id)
        .sort((a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime())[0]
        ?.lastReadAt,
    }))
    .sort((a, b) => b.lastRead!.getTime() - a.lastRead!.getTime());

  const currentlyReading = storiesWithProgress.filter(
    (story) => !story.isCompleted
  );
  const completedStories = storiesWithProgress.filter(
    (story) => story.isCompleted
  );

  const handleStoryClick = (storyId: string) => {
    router.push(`/story/${storyId}`);
  };

  const totalReadTime = storiesWithProgress.reduce((total, story) => {
    const storyProgress = user.progress.filter((p) => p.storyId === story.id);
    return (
      total +
      storyProgress.reduce((sum, p) => {
        const episode = story.episodes.find((ep) => ep.id === p.episodeId);
        return sum + (episode ? (episode.readTime * p.progress) / 100 : 0);
      }, 0)
    );
  }, 0);

  return (
    <Navigation>
      <NoIndex/>
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <BookOpen className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Reads
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your reading progress and completed stories
            </p>
          </div>
        </div>

        {storiesWithProgress.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Start reading to see your progress
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Once you begin reading stories, you&apos;ll see your progress and
              completed reads here.
            </p>
            <button onClick={() => router.push("/")} className="btn-primary">
              Browse Stories
            </button>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {currentlyReading.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Currently Reading
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {completedStories.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Completed
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">
                    {user.progress.length}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Episodes Read
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">
                    {formatReadTime(Math.round(totalReadTime))}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Reading Time
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("reading")}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1
                  ${
                    activeTab === "reading"
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                <PlayCircle className="w-4 h-4" />
                Currently Reading ({currentlyReading.length})
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1
                  ${
                    activeTab === "completed"
                      ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }
                `}
              >
                <CheckCircle className="w-4 h-4" />
                Completed ({completedStories.length})
              </button>
            </div>

            {/* Content */}
            {activeTab === "reading" ? (
              <div>
                {currentlyReading.length === 0 ? (
                  <div className="text-center py-12">
                    <PlayCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No stories in progress
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Start reading a story to see it here
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Stories You are Reading
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {currentlyReading.map((story) => (
                        <div key={story.id} className="space-y-2">
                          <StoryCard
                            story={story}
                            variant="continue"
                            showProgress={true}
                            onClick={() => handleStoryClick(story.id)}
                          />
                          <div className="text-center">
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {story.progress}% complete
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              Last read: {story.lastRead?.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div>
                {completedStories.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No completed stories yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Finish reading a story to see it here
                    </p>
                  </div>
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Stories You&apos;ve Completed
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {completedStories.map((story) => (
                        <div key={story.id} className="space-y-2">
                          <StoryCard
                            story={story}
                            onClick={() => handleStoryClick(story.id)}
                          />
                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1 text-sm text-green-600 dark:text-green-400">
                              <CheckCircle className="w-4 h-4" />
                              Completed
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-500">
                              Finished: {story.lastRead?.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Navigation>
  );
}
