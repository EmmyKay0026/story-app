"use client";
import React, { useState } from "react";
import { Story } from "@/types/stories";
import { formatReadTime } from "@/utils/storyUtils";
import { Clock, Lock } from "lucide-react";
import { getCoverImageUrl } from "@/services/story/storyActions";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
// import { useUserStore } from "@/stores/user/userStore";

const EpisodeCard = ({
  story,
}: // setSelectedEpisode,
// setShowUnlockModal,
{
  story: Story;
  // setSelectedEpisode: (value: SetStateAction<string | null>) => void;
  // setShowUnlockModal: (value: SetStateAction<boolean>) => void;
}) => {
  const user = useUserStore((state) => state.user);
  const isEpisodeUnlocked = useUserStore((state) => state.isEpisodeUnlocked);
  const unlockEpisode = useUserStore((state) => state.unlockEpisode);
  const getUserProgress = useUserStore((state) => state.getUserProgress);

  const router = useRouter();
  // const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<string | null>(null);

  const handleEpisodeClick = (
    episodeId: string,
    isPremium: boolean
    // pointsCost: number
  ) => {
    const isUnlocked = isEpisodeUnlocked(`${story.id}-${episodeId}`);

    if (!isPremium || isUnlocked) {
      router.push(`/read/${story.id}/${episodeId}`);
    } else {
      setSelectedEpisode(episodeId);
      // setShowUnlockModal(true);
    }
  };

  const handleUnlockEpisode = async (episodeCost: number) => {
    if (!selectedEpisode) return;

    const response = await unlockEpisode(
      story.id,
      selectedEpisode,
      episodeCost
    );
    // console.log(response);

    if (!response) {
      alert("Not enough points to unlock this episode!");
      return;
    }
    router.push(`/read/${story.id}/${selectedEpisode}`);
  };

  const getEpisodeById = (episodeId: string) => {
    return story.episodes.find((ep) => ep.id === episodeId);
  };
  // const handleUnlockEpisode = () => {
  //   if (!selectedEpisode) return;

  //   const episode = story.episodes.find((ep) => ep.id === selectedEpisode);
  //   if (!episode) return;

  //   const success = unlockEpisode(selectedEpisode, episode.pointsCost);
  //   if (success) {
  //     // setShowUnlockModal(false);
  //     router.push(`/read/${selectedEpisode}`);
  //   } else {
  //     // Show error - not enough points
  //     alert("Not enough points to unlock this episode!");
  //   }
  // };
  return (
    <>
      <div className="space-y-4 md:w-full">
        {story.episodes.map((episode) => {
          const isUnlocked = isEpisodeUnlocked(`${story.id}-${episode.id}`);
          const progress = getUserProgress(story.id, episode.id);
          const canRead = !episode.isPremium || isUnlocked;

          return (
            <div
              key={episode.id}
              className={`
                    p-4 bg-[#f6f6f6f7] dark:bg-shaft rounded-lg transition-colors
                    ${
                      canRead
                        ? "hover:bg-gray-50 dark:hover:bg-[#222] cursor-pointer"
                        : "opacity-60"
                    }
                  `}
              onClick={() =>
                handleEpisodeClick(
                  episode.id,
                  episode.isPremium
                  // episode.pointsCost
                )
              }
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 relative bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    {canRead ? (
                      <Image
                        src={getCoverImageUrl(story.coverImage)}
                        alt={episode.title}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="">
                        <Image
                          src={getCoverImageUrl(story.coverImage)}
                          alt={episode.title}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover rounded-lg"
                        />
                        <span className="absolute inset-0 flex items-center justify-center bg-[rgba(255,255,255,0.8)] dark:bg-[rgba(0,0,0,0.5)] rounded-lg">
                          <Lock className="w-5 h-5 text-gray-400" />
                        </span>
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-[18px] text-gray-900 dark:text-white">
                      Episode {episode.order}: {episode.title}
                    </h4>
                    {episode.isPremium && (
                      <span className="inline-block px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 text-xs font-medium rounded">
                        Premium - {episode.pointsCost} points
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatReadTime(episode.readTime)}
                    </span>
                    {progress && (
                      <span className="text-primary dark:text-faded-primary">
                        {Math.ceil(progress.progress)}% complete
                      </span>
                    )}
                  </div>

                  {progress && progress.progress > 0 && (
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1">
                      <div
                        className="bg-primary h-1 rounded-full transition-all duration-300"
                        style={{ width: `${progress.progress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Unlock Modal */}
      {selectedEpisode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Unlock Premium Episode
            </h3>

            <div className="mb-6">
              {(() => {
                const episode = story.episodes.find(
                  (ep) => ep.id === selectedEpisode
                );
                return episode ? (
                  <div>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      <strong>{episode.title}</strong>
                    </p>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <span className="text-gray-700 dark:text-gray-300">
                        Cost:
                      </span>
                      <span className="font-bold text-amber-600">
                        {episode.pointsCost} points
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg mt-2">
                      <span className="text-gray-700 dark:text-gray-300">
                        Your balance:
                      </span>
                      <span className="font-bold text-gray-900 dark:text-white">
                        {user?.points} points
                      </span>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedEpisode(null)}
                className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  handleUnlockEpisode(
                    getEpisodeById(selectedEpisode)?.pointsCost || 0
                  )
                }
                disabled={(() => {
                  const episode = story.episodes.find(
                    (ep) => ep.id === selectedEpisode
                  );
                  return (
                    !episode || (Number(user?.points) ?? 0) < episode.pointsCost
                  );
                })()}
                className="flex-1 py-2 px-4 bg-primary hover:big-blue-700 disabled:bg-faded-primary text-white rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                Unlock Episode
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EpisodeCard;
