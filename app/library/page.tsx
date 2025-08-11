"use client";
import { StoryCard } from "@/components/molecules/StoryCard";
import { Navigation } from "@/components/templates/NavigationMenu";
import { CATEGORIES, mockStories } from "@/constants/stories";
import { BookCopy, Box, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stories, setStories] = useState(mockStories);

  useEffect(() => {
    handleFilter(searchTerm, selectedCategory ? [selectedCategory] : []);
    return () => {
      // second
    };
  }, [searchTerm, selectedCategory]);

  const handleFilter = (searchTerm: string, selectedCategories: string[]) => {
    let filteredStories = mockStories;

    if (searchTerm) {
      filteredStories = filteredStories.filter((story) =>
        story.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filteredStories = filteredStories.filter((story) =>
        selectedCategories.includes(story.category)
      );
    }

    setStories(filteredStories);
  };
  return (
    <Navigation>
      <section className="max-w-4xl mx-auto p-4 lg:p-6">
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
        <article className="mb-8">
          <div className="flex items-center gap-6 p-3 mb-6 border  border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
            <Search />
            <input
              type="search"
              placeholder="Search stories..."
              className="w-full  outline-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-4">
            {CATEGORIES.map((category) => (
              <label key={category} className="" style={{ userSelect: "none" }}>
                <input
                  type="checkbox"
                  value={category}
                  className="mr-2 w-0 peer"
                  style={{ verticalAlign: "middle" }}
                  checked={selectedCategory === category}
                  onChange={() =>
                    setSelectedCategory(
                      selectedCategory === category ? null : category
                    )
                  }
                />
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full cursor-pointer transition-colors peer-checked:bg-faded-primary">
                  {category}
                </span>
              </label>
            ))}
          </div>
        </article>
        <div className="mb-8">
          <h2 className="text-4xl font-bold mb-8">Featured stories</h2>
          {stories.length > 0 ? (
            <div className="flex flex-wrap">
              {stories.map((story) => (
                <Link
                  href={`/story/${story.id}`}
                  key={story.id}
                  className="w-full sm:w-1/2 lg:w-1/4  p-4"
                >
                  <StoryCard
                    story={story}
                    showProgress={false}
                    variant={"compact_v2"}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className=" flex flex-col justify-center items-center text-center text-gray-500 dark:text-gray-400">
              No stories found for the selected filters.
              <Box className="mt-4" />
            </div>
          )}
        </div>
      </section>
    </Navigation>
  );
};

export default Library;
