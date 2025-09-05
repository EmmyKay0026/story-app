"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BookCopy, Box, Search, AlertCircle } from "lucide-react";
import { authorizationChecker } from "@/services/user/userAction";
import { Story, ApiError } from "@/types";
import { StoryCard } from "@/components/molecules/StoryCard";
// import { Navigation } from "@/components/templates/NavigationMenu";
import { LibrarySkeleton } from "@/components/skeletons/LibrarySkeletons";
import {
  fetchCategories,
  fetchHomeData,
  fetchStories,
  filterStories,
} from "@/services/story/storyActions";
// import { useUserStore } from "@/hooks/useUserStore";

// import { useUserStore } from "@/hooks/userStore";

// interface LibraryClientProps {
//   stories: Story[];
//   featuredStories: Story[];
//   categories: { label: string; value: string }[];
//   error?: ApiError | null;
// }
// {
//   stories,
//   featuredStories,
//   categories,
//   error = null,
// }: LibraryClientProps
export default function LibraryClient() {
  const router = useRouter();
  // const { isAuthenticated, user } = useUserStore();

  const searchParams = useSearchParams();

  const initialCategory = searchParams.get("category");
  const initialSearch = searchParams.get("q");
  //  let stories: Story[] = [];
  //  let featuredStories: Story[] = [];
  //  let categories: { label: string; value: string }[] = [];
  const [stories, setStories] = useState<Story[]>([]);
  const [featuredStories, setFeaturedStories] = useState<Story[]>([]);
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [error, setError] = useState<ApiError | null>(null);
  const [searchTerm, setSearchTerm] = useState(initialSearch || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );

  useEffect(() => {
    authorizationChecker(window.location.pathname);
  }, []);

  useEffect(() => {
    const getHomeData = async () => {
      try {
        const homeResponse = await fetchHomeData();

        if ("data" in homeResponse && homeResponse.data) {
          setFeaturedStories(homeResponse.data.featured?.slice(0, 5) || []);
        } else if ("error" in homeResponse && homeResponse.error) {
          setError(homeResponse.error);
          console.error(
            "Home API error:",
            homeResponse.error.error,
            "Code:",
            homeResponse.error.code
          );
        }
      } catch (err) {
        console.error("Unexpected error fetching home data:", err);
      }
    };

    getHomeData();
  }, []);

  useEffect(() => {
    const getStories = async () => {
      try {
        // const response = await fetchStories();
        const storiesResponse = await fetchStories("", "", 1, 20);
        // console.log(storiesResponse);

        if ("data" in storiesResponse && storiesResponse.data) {
          setStories(storiesResponse.data.stories);
        } else if ("error" in storiesResponse && storiesResponse.error) {
          setError(storiesResponse.error);
          console.error(
            "Stories API error:",
            storiesResponse.error.error,
            "Code:",
            storiesResponse.error.code
          );
        }
      } catch (err) {
        console.error("Unexpected error fetching stories:", err);
      }
    };

    getStories();
  }, []);

  // ✅ Fetch categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const categoriesResponse = await fetchCategories();

        if (
          "data" in categoriesResponse &&
          Array.isArray(categoriesResponse.data)
        ) {
          setCategories(categoriesResponse.data);
        } else {
          console.error(
            "API error fetching categories:",
            "error" in categoriesResponse ? categoriesResponse.error : "No data"
          );
          setCategories([]); // fallback
        }
      } catch (err) {
        console.error("Unexpected error fetching categories:", err);
        setCategories([]);
      }
    };

    getCategories();
  }, []);

  const handleCategoryChange = (category: { label: string; value: string }) => {
    const newCategory =
      selectedCategory === category.label ? null : category.label;

    setSelectedCategory(newCategory);

    // ✅ Update URL immediately
    const params = new URLSearchParams(window.location.search);
    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }
    if (searchTerm) {
      params.set("q", searchTerm);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // useEffect(() => {
  //   const params = new URLSearchParams();
  //   // if (selectedCategory) { params.set("category", selectedCategory); }
  //   if (searchTerm) { params.set("q", searchTerm); } const query = params.toString(); router.push(query ? ?${query} : "?", { scroll: false });
  // }, [selectedCategory, searchTerm, router]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);

    // Auto-trigger category change if ≥ 3 letters match
    if (searchTerm.length >= 3) {
      const match = categories.find((c) =>
        c.label.toLowerCase().startsWith(searchTerm.toLowerCase())
      );
      if (match) {
        handleCategoryChange(match);
      }
    }
    // else {
    //   handleCategoryChange(null);
    // }
  };

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
      categories.find((c) => c.label === selectedCategory)?.label ??
      "All stories"
    );
  }, [selectedCategory, categories]);

  // const handleCategoryChange = (category: { label: string; value: string }) => {
  //   setSelectedCategory(
  //     selectedCategory === category.label ? null : category.label
  //   );
  // };

  if (!stories || stories.length === 0) {
    // console.log(stories);

    return (
      // <Navigation>
      <LibrarySkeleton />
      // </Navigation>
    );
  }

  return (
    <>
      <section className="max-w-7xl mx-auto p-4 lg:p-6 h-full bg-white dark:bg-dark-primary">
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

        {/* Search */}
        <article className="mb-8">
          <div className="flex items-center gap-6 p-3 mb-6 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
            <Search />
            <input
              type="search"
              placeholder="Search stories..."
              className="w-full outline-0 bg-transparent text-gray-900 dark:text-white"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-4">
            {Array.isArray(categories) && categories.length > 0 ? (
              categories.map((category, idx) => (
                <label key={idx + category.value} className="cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={selectedCategory === category.label}
                    onChange={() => handleCategoryChange(category)}
                  />
                  <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full cursor-pointer transition-colors peer-checked:bg-faded-primary">
                    {category.label}
                  </span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                No categories available
              </p>
            )}
          </div>
        </article>

        {/* Stories & Sidebar */}
        <article className="flex flex-col items-center justify-between gap-8 md:items-start min-h-[60vh] rounded-t-3xl lg:flex-row">
          <div className="mb-8 lg:w-[60%]">
            <h2 className="text-4xl font-bold mb-8">{categoryDisplayName}</h2>

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
                      variant="continue"
                    />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400">
                No stories found for the selected filters.
                <Box className="mt-4" />
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2 text-red-700 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">
                  {error.error || "Some content may not be up to date."}
                </span>
              </div>
            )}
          </div>

          {/* Featured Sidebar */}
          <div className="sticky top-[50px] mb-8 w-full lg:w-[250px] lg:mt-20">
            <h2 className="text-xl font-bold mb-2">Featured Stories</h2>
            {featuredStories.length > 0 ? (
              <div className="flex flex-wrap">
                {featuredStories.slice(0, 2).map((story) => (
                  <Link
                    href={`/story/${story.id}`}
                    key={story.id}
                    className="w-full lg:w-full py-4"
                  >
                    <StoryCard
                      story={story}
                      showProgress={false}
                      variant="compact"
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
        </article>
      </section>
    </>
  );
}
