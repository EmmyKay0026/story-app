"use client";
import React, { useEffect, useState } from "react";
import { StoryCard } from "@/components/molecules/StoryCard";
import { Navigation } from "@/components/templates/NavigationMenu";
import { ALLCATEGORIES, mockStories } from "@/constants/stories";
import { BookCopy, Box, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
// import Mobile from "@/components/molecules/DashboardNav";

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [stories, setStories] = useState(mockStories);
  const { user, isAuthenticated } = useUser();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tag = params.get("tag");
    if (
      tag &&
      ALLCATEGORIES.map((category) => {
        category.value.includes(tag);
      })
    ) {
      const convertedCat = ALLCATEGORIES.find(
        (category) => category.value == tag
      );

      setSelectedCategory(convertedCat?.label ?? "");
    }
  }, []);

  useEffect(() => {
    handleFilter(searchTerm, selectedCategory ? [selectedCategory] : []);
  }, [searchTerm, selectedCategory]);
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) {
    return null;
  }
  const handleFilter = (searchTerm: string, selectedCategories: string[]) => {
    let filteredStories = mockStories;

    if (searchTerm) {
      filteredStories = filteredStories.filter(
        (story) =>
          story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.tags.some((tag: string) => searchTerm.includes(tag))
      );
    }

    if (selectedCategories.length > 0) {
      filteredStories = filteredStories.filter(
        (story) =>
          selectedCategories.includes(story.category) ||
          story.tags.some((tag: string) => selectedCategories.includes(tag))
      );
    }

    setStories(filteredStories);
  };
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
            {ALLCATEGORIES.map((category, idx) => (
              <label
                key={idx + category.value}
                className=""
                style={{ userSelect: "none" }}
              >
                <input
                  type="checkbox"
                  value={category.value}
                  className="mr-2 w-0 peer"
                  style={{ verticalAlign: "middle" }}
                  checked={selectedCategory === category.label}
                  onChange={() => {
                    const newCategory =
                      selectedCategory === category.label ? null : category;
                    setSelectedCategory(newCategory?.label ?? "");

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
                  }}
                />
                <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full cursor-pointer transition-colors peer-checked:bg-faded-primary">
                  {category.label}
                </span>
              </label>
            ))}
          </div>
        </article>
        <article className="flex flex-col items-center justify-between gap-8  md:items-start min-h-[60vh]  rounded-t-3xl lg:flex-row ">
          <div className="mb-8 lg:w-[60%]">
            <h2 className="text-4xl font-bold mb-8">
              {ALLCATEGORIES.find(
                (category) => category.label == selectedCategory
              )?.label ?? "All stories"}
            </h2>
            {stories.length > 0 ? (
              <div className="flex flex-wrap">
                {stories.map((story) => (
                  <Link
                    href={`/story/${story.id}`}
                    key={story.id}
                    className="w-full sm:w-1/2 lg:w-1/2  p-4"
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
          {/* <div className=""> */}
          <div className="sticky top-[50px] mb-8  w-full lg:w-[300px] lg:mt-20 ">
            <h2 className="text-xl font-bold mb-2">Feature stories</h2>
            {mockStories.length > 0 && (
              <div className="flex flex-wrap">
                {mockStories.slice(0, 2).map((story) => (
                  <Link
                    href={`/story/${story.id}`}
                    key={story.id}
                    className="w-full  lg:w-full  p-4"
                  >
                    <StoryCard
                      story={story}
                      showProgress={false}
                      variant={"compact"}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
          {/* </div> */}
        </article>
      </section>
    </Navigation>
  );
};

export default Library;
