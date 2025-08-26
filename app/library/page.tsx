import { fetchStories } from "@/services/story/storyActions";
import { Story } from "@/constants/stories";
import LibraryClient from "@/components/organisms/LibraryClient";

export default async function LibraryPage() {
  let stories: Story[] = [];
  let featuredStories: Story[] = [];

  try {
    const response = await fetchStories(); 

    if ("data" in response && response.data) {
      stories = response.data;
      featuredStories = stories.slice(0, 5);
    } else if ("error" in response && response.error) {
      console.error("API error:", response.error.error, "Code:", response.error.code);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }

  if (!stories.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold">No stories available</h2>
        <p className="text-gray-500 mt-2">
          Check back later or refresh to try again.
        </p>
      </div>
    );
  }

  return <LibraryClient stories={stories} featuredStories={featuredStories} />;
}
