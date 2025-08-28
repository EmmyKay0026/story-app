"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { BookCopy, Box, Search, AlertCircle } from "lucide-react";

import { Story, ApiError, ALLCATEGORIES } from "@/constants/stories";
import { StoryCard } from "@/components/molecules/StoryCard";
import { Navigation } from "@/components/templates/NavigationMenu";

import { LibrarySkeleton } from "@/components/skeletons/LibrarySkeletons";

import { filterStories } from "@/services/story/storyActions";

interface LibraryClientProps {
  stories: Story[];
  featuredStories: Story[];
}

export default function LibraryClient({
  stories,
  featuredStories,
}: LibraryClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [error, setError] = useState<ApiError | null>(null); // ✅ FIXED TYPE

  const filteredStories = useMemo(
    () =>
      filterStories(
        stories,
        searchTerm,
        selectedCategory ? [selectedCategory] : []
      ),
    [stories, searchTerm, selectedCategory]
  );

  const categoryDisplayName = useMemo(() => {
    if (!selectedCategory) return "All stories";
    return (
      ALLCATEGORIES.find((category) => category.label === selectedCategory)
        ?.label ?? "All stories"
    );
  }, [selectedCategory]);

  const handleCategoryChange = (category: (typeof ALLCATEGORIES)[0]) => {
    setSelectedCategory(
      selectedCategory === category.label ? null : category.label
    );
  };

  if (!stories || stories.length === 0) {
    return (
      <Navigation>
        <LibrarySkeleton />
      </Navigation>
    );
  }

  return (
    <Navigation>
      <section className="max-w-4xl h-full mx-auto bg-white dark:bg-dark-primary p-4 lg:p-6">
        {/* Header */}
        <div className="flex items-start gap-3 mb-8">
          <BookCopy className="w-8 h-8 text-shaft dark:text-white fill-current" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Library
            </h1>
            <p className="text-gray-600 dark:text-gray-300 w-[80%]">
              Explore stories across various genres and categories.
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-6 p-3 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg">
          <Search className="text-gray-400" />
          <input
            type="search"
            placeholder="Search stories..."
            className="w-full outline-0 bg-transparent text-gray-900 dark:text-white"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {ALLCATEGORIES.map((category, idx) => (
            <label key={idx} className="cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={selectedCategory === category.label}
                onChange={() => handleCategoryChange(category)}
              />
              <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full peer-checked:bg-blue-100 dark:peer-checked:bg-blue-900 peer-checked:text-blue-700 dark:peer-checked:text-blue-300">
                {category.label}
              </span>
            </label>
          ))}
        </div>

        {/* Stories */}
        <div className="flex flex-col lg:flex-row gap-8 min-h-[60vh]">
          <div className="w-full">
            <h2 className="text-4xl font-bold mb-6">{categoryDisplayName}</h2>

            <div className="flex">
              <div className="lg:w-[60%] lg:min-w-[60%]">
                {filteredStories.length > 0 ? (
                  <div className="flex flex-wrap">
                    {filteredStories.map((story) => (
                      <Link
                        href={`/story/${story.id}`}
                        key={story.id}
                        className="w-full sm:w-1/2 pr-8 pb-8"
                      >
                        <StoryCard
                          story={story}
                          variant="compact_v2"
                          showProgress={false}
                        />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-500 py-16">
                    <Box className="w-16 h-16 mb-4 opacity-50" />
                    <h3 className="text-lg font-medium">No stories found</h3>
                  </div>
                )}

                {/* ✅ Consistent error state */}
                {error && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                    <AlertCircle className="w-4 h-4" />
                    <span className="text-sm">
                      {error.error || "Some content may not be up to date."}
                    </span>
                  </div>
                )}
              </div>

              {/* Featured */}
              <div className="lg:w-[300px] lg:h-[100dvh] sticky top-10">
                <div>
                  <h2 className="text-xl font-bold mb-2">Featured Stories</h2>
                  {featuredStories.length > 0 ? (
                    <div className="flex flex-col">
                      {featuredStories.slice(0, 2).map((story) => (
                        <Link
                          href={`/story/${story.id}`}
                          key={story.id}
                          className="py-4"
                        >
                          <StoryCard
                            story={story}
                            variant="compact"
                            showProgress={false}
                          />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-center">
                      No featured stories available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Navigation>
  );
}
