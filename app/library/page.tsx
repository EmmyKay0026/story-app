"use client";
import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookCopy, Box, Search, AlertCircle } from "lucide-react";

import { StoryCard } from "@/components/molecules/StoryCard";
import { Navigation } from "@/components/templates/NavigationMenu";
import { ALLCATEGORIES } from "@/constants/stories";
import { useUser } from "@/context/UserContext";

// ✅ Updated import from new store location
import { useStoryStore } from "@/stores/storyStore";

import { 
  LibrarySkeleton, 
  StoryCardSkeleton, 
  LibraryError 
} from "@/components/skeletons/LibrarySkeletons";


const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user, isAuthenticated } = useUser();
  const router = useRouter();

  // Zustand store
  const {
    filteredStories,
    featuredStories,
    isLoading,
    error,
    fetchStories,
    fetchFeaturedStories,
    filterStories,
    clearError,
  } = useStoryStore();

  // Handle URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    
    if (tag) {
      const convertedCat = ALLCATEGORIES.find(
        (category) => category.value === tag
      );
      if (convertedCat) {
        setSelectedCategory(convertedCat.label);
      }
    }
  }, []);

  // Handle authentication
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  // Fetch data on mount
  useEffect(() => {
    if (isAuthenticated) {
      fetchStories();
      fetchFeaturedStories();
    }
  }, [isAuthenticated, fetchStories, fetchFeaturedStories]);

  // Handle filtering
  useEffect(() => {
    filterStories(searchTerm, selectedCategory ? [selectedCategory] : []);
  }, [searchTerm, selectedCategory, filterStories]);

  // Memoized category display name
  const categoryDisplayName = useMemo(() => {
    if (!selectedCategory) return "All stories";
    return ALLCATEGORIES.find(
      (category) => category.label === selectedCategory
    )?.label ?? "All stories";
  }, [selectedCategory]);

  // Handle category change
  const handleCategoryChange = (category: typeof ALLCATEGORIES[0]) => {
    const newCategory = selectedCategory === category.label ? null : category;
    setSelectedCategory(newCategory?.label ?? null);

    // Update URL params
    const params = new URLSearchParams(window.location.search);
    if (newCategory) {
      params.set("tag", newCategory.value);
    } else {
      params.delete("tag");
    }
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${params.toString()}`
    );
  };

  // Handle retry
  const handleRetry = () => {
    clearError();
    fetchStories();
    fetchFeaturedStories();
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  // Show full skeleton on initial load
  if (isLoading && filteredStories.length === 0) {
    return (
      <Navigation>
        <LibrarySkeleton />
      </Navigation>
    );
  }

  // Show error state
  if (error && filteredStories.length === 0) {
    return (
      <Navigation>
        <section className="max-w-4xl h-full mx-auto bg-white dark:bg-dark-primary p-4 lg:p-6">
          <LibraryError error={error.error} onRetry={handleRetry} />
        </section>
      </Navigation>
    );
  }

  return (
    <Navigation>
      <section className="max-w-4xl h-full mx-auto bg-white dark:bg-dark-primary p-4 lg:p-6">
        {/* Header */}
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

        {/* Search and Filters */}
        <article className="mb-8">
          {/* Search Bar */}
          <div className="flex items-center gap-6 p-3 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 dark:focus-within:ring-blue-400">
            <Search className="text-gray-400" />
            <input
              type="search"
              placeholder="Search stories..."
              className="w-full outline-0 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4">
            {ALLCATEGORIES.map((category, idx) => (
              <label
                key={idx + category.value}
                className="cursor-pointer"
                style={{ userSelect: "none" }}
              >
                <input
                  type="checkbox"
                  value={category.value}
                  className="sr-only peer"
                  checked={selectedCategory === category.label}
                  onChange={() => handleCategoryChange(category)}
                />
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-600 peer-checked:bg-blue-100 dark:peer-checked:bg-blue-900 peer-checked:text-blue-700 dark:peer-checked:text-blue-300">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </article>

        {/* Main Content */}
        <article className="flex flex-col items-center justify-between gap-8 md:items-start min-h-[60vh] rounded-t-3xl lg:flex-row">
          {/* Main Stories Section */}
          <div className="mb-8 lg:w-[60%] w-full">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
                {categoryDisplayName}
              </h2>
              {isLoading && (
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <div className="w-4 h-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              )}
            </div>

            {/* Stories Grid */}
            {filteredStories.length > 0 ? (
              <div className="flex flex-wrap">
                {filteredStories.map((story) => (
                  <Link
                    href={`/story/${story.id}`}
                    key={story.id}
                    className="w-full sm:w-1/2 lg:w-1/2 p-4"
                  >
                    <StoryCard
                      story={story}
                      showProgress={false}
                      variant="compact_v2"
                    />
                  </Link>
                ))}
              </div>
            ) : isLoading ? (
              // Loading skeletons for stories
              <div className="flex flex-wrap">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="w-full sm:w-1/2 lg:w-1/2 p-4">
                    <StoryCardSkeleton variant="compact_v2" />
                  </div>
                ))}
              </div>
            ) : (
              // No results
              <div className="flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400 py-16">
                <Box className="w-16 h-16 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No stories found</h3>
                <p className="text-sm">
                  {searchTerm || selectedCategory
                    ? "Try adjusting your search or filters"
                    : "No stories available at the moment"}
                </p>
              </div>
            )}

            {/* Error Banner (non-critical) */}
            {error && filteredStories.length > 0 && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm">
                    {error.error || "Some content may not be up to date. Please refresh to try again."}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Featured Stories Sidebar */}
          <div className="sticky top-[50px] mb-8 w-full lg:w-[300px] lg:mt-20">
            <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              Featured Stories
            </h2>
            
            {featuredStories.length > 0 ? (
              <div className="flex flex-wrap">
                {featuredStories.slice(0, 2).map((story) => (
                  <Link
                    href={`/story/${story.id}`}
                    key={story.id}
                    className="w-full p-4"
                  >
                    <StoryCard
                      story={story}
                      showProgress={false}
                      variant="compact"
                    />
                  </Link>
                ))}
              </div>
            ) : isLoading ? (
              // Loading skeletons for featured stories
              <div className="flex flex-wrap">
                {Array.from({ length: 2 }).map((_, idx) => (
                  <div key={idx} className="w-full p-4">
                    <StoryCardSkeleton variant="compact" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                <p className="text-sm">No featured stories available</p>
              </div>
            )}
          </div>
        </article>
      </section>
    </Navigation>
  );
};

export default Library;