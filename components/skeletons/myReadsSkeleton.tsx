import { StoryCardSkeleton } from "./LibrarySkeletons";
import { PlayCircle, CheckCircle } from "lucide-react";

const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`} />
);

const StatsSkeleton = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {[...Array(4)].map((_, i) => (
        <div key={i}>
          <SkeletonBox className="h-6 w-12 mx-auto mb-2" />
          <SkeletonBox className="h-4 w-20 mx-auto" />
        </div>
      ))}
    </div>
  </div>
);


// import { Skeleton } from "@/components/ui/skeleton";
// import { StoryCardSkeleton } from "@/components/StoryCardSkeleton";

export const MyReadsSkeleton = () => (
  <div>
    {/* Stats */}
    <div className="bg-white dark:bg-gray-800 justify-center items-center rounded-lg p-6 mb-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {[ "Currently Reading", "Completed", "Episodes Read", "Reading Time" ].map((label, i) => (
          <div key={i}>
            <div className="text-2xl font-bold text-gray-900 dark:text-white flex justify-center">
              <SkeletonBox className="h-6 w-10" />
            </div>
            <div className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Tabs */}
    <div className="flex items-center gap-1 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
      <button
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1
          text-gray-600 dark:text-gray-300
        `}
        disabled
      >
        <PlayCircle className="w-4 h-4" />
        <p className="flex">Currently Reading (<SkeletonBox className="h-4 w-4" />)</p>
        
      </button>
      <button
        className={`
          flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors flex-1
          text-gray-600 dark:text-gray-300
        `}
        disabled
      >
        <CheckCircle className="w-4 h-4" />
        <p className="flex">Completed (<SkeletonBox className="h-4 w-4" />)</p>
      </button>
    </div>

    {/* Cards */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="w-full p-4">
          <StoryCardSkeleton variant="compact_v2" />
        </div>
      ))}
    </div>
  </div>
);