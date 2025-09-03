import { BookCopy, Search } from "lucide-react";
import React from "react";

// Story Card Skeleton
export const StoryCardSkeleton = ({ variant = "compact_v2" }: { variant?: "compact" | "compact_v2" }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Cover Image Skeleton */}
      <div className={`bg-gray-200 dark:bg-gray-700 ${
        variant === "compact" ? "h-32" : "h-48"
      }`} />
      
      <div className="p-4">
        {/* Title Skeleton */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded mb-2" />
        
        {/* Description/Author Skeleton */}
        <div className="space-y-2 mb-3">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
        </div>
        
        {/* Tags/Category Skeleton */}
        <div className="flex gap-2 mb-3">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-16" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-full w-20" />
        </div>
        
        {/* Rating/Stats Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-12" />
        </div>
      </div>
    </div>
  );
};

// Category Filter Skeleton
export const CategoryFilterSkeleton = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {Array.from({ length: 8 }).map((_, idx) => (
        <div
          key={idx}
          className="h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"
          style={{ width: `${Math.floor(Math.random() * 40) + 60}px` }}
        />
      ))}
    </div>
  );
};

// Main Library Skeleton
export const LibrarySkeleton = () => {
  return (
    <section className="max-w-4xl h-full mx-auto bg-white dark:bg-dark-primary p-4 lg:p-6">
      {/* Header Skeleton */}
      <div className="flex items-start gap-3 mb-8">
        <BookCopy className="w-8 h-8 text-shaft dark:text-white fill-current" />
        <div className="mt-0 p-0">
          <h1 className="text-3xl mt-0 p-0 font-bold text-gray-900 dark:text-white">
            Library
          </h1>
          <p className="text-gray-600 dark:text-gray-300 w-[80%]">
            Explore stories across various genres and categories. Use the
            search bar to find specific stories or filter by category.
          </p>
        </div>
      </div>

      {/* Search and Filter Skeleton */}
      <article className="mb-8">
        <div className="flex items-center gap-6 p-3 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          <Search />
          <input
            type="search"
            placeholder="Search stories..."
            className="w-full outline-0 bg-transparent text-gray-900 dark:text-white"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CategoryFilterSkeleton />
      </article>

      {/* Content Skeleton */}
      <article className="flex flex-col items-center justify-between gap-8 md:items-start min-h-[60vh] rounded-t-3xl lg:flex-row">
        {/* Main Stories Skeleton */}
        <div className="mb-8 lg:w-[60%] w-full">
          <h2 className="text-4xl font-bold mb-8">All Stories</h2>
          <div className="flex flex-wrap">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="w-full sm:w-1/2 lg:w-1/2 p-4">
                <StoryCardSkeleton variant="compact_v2" />
              </div>
            ))}
          </div>
        </div>

        {/* Featured Stories Skeleton */}
        <div className="sticky top-[50px] mb-8 w-full lg:w-[300px] lg:mt-20">
          <h2 className="text-xl font-bold mb-2">Featured Stories</h2>
          <div className="flex flex-wrap">
            {Array.from({ length: 2 }).map((_, idx) => (
              <div key={idx} className="w-full p-4">
                <StoryCardSkeleton variant="compact_v2" />
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
};

// Error Component
export const LibraryError = ({ 
  error, 
  onRetry 
}: { 
  error: string; 
  onRetry: () => void; 
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
      <div className="mb-4">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Failed to load stories
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {error}
        </p>
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};