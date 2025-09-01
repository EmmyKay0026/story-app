import { Suspense } from "react";
import {
  fetchStories,
  fetchHomeData,
  fetchCategories,
} from "@/services/story/storyActions";
import { Story } from "@/constants/stories";
import LibraryClient from "@/components/organisms/LibraryClient";
// import { Navigation } from "@/components/templates/NavigationMenu";

export default async function LibraryPage() {
  let stories: Story[] = [];
  let featuredStories: Story[] = [];
  let categories: { label: string; value: string }[] = [];

  // Fetch stories
  try {
    // const response = await fetchStories();
    const storiesResponse = await fetchStories("", "", 1, 20);

    if ("data" in storiesResponse && storiesResponse.data) {
      stories = storiesResponse.data.stories;
    } else if ("error" in storiesResponse && storiesResponse.error) {
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

  // Fetch featured stories
  try {
    const homeResponse = await fetchHomeData();

    if ("data" in homeResponse && homeResponse.data) {
      featuredStories = homeResponse.data.featured?.slice(0, 5) || [];
    } else if ("error" in homeResponse && homeResponse.error) {
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

  // Fetch categories
  try {
    const categoriesResponse = await fetchCategories();

    if (
      "data" in categoriesResponse &&
      Array.isArray(categoriesResponse.data)
    ) {
      categories = categoriesResponse.data;
    } else {
      console.error(
        "API error fetching categories:",
        "error" in categoriesResponse ? categoriesResponse.error : "No data"
      );
      categories = []; // fallback
    }
  } catch (err) {
    console.error("Unexpected error fetching categories:", err);
    categories = [];
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LibraryClient
        stories={stories}
        featuredStories={featuredStories}
        categories={categories}
      />
    </Suspense>
  );
}
