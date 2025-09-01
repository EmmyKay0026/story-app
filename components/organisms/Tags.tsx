import Link from "next/link";
import { fetchCategories } from "@/services/story/storyActions";

export default async function Tags() {
  let categories: { label: string; value: string }[] = [];

  // ✅ Fetch categories (same pattern as LibraryPage)
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
    categories = []; // fallback
  }

  return (
    <section className="pb-[7rem] pt-[3rem] px-[1rem] md:px-[3rem]">
      <div className="w-full flex flex-col text-center text-3xl items-center justify-center md:text-3xl font-bold text-black dark:text-white mb-[2rem]">
        <p className="mb-4">Popular Tags</p>
        <div className="h-1 w-20 mt-[-6] bg-gradient-to-r from-[#085f33] via-[#3aa13e] to-[#45B649] rounded-full"></div>
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="max-w-4xl mx-auto w-full flex flex-wrap gap-4 md:gap-8">
          {categories.map((category, idx) => (
            <Link
              key={idx + category.value}
              href={`/library/?tag=${category.value}`}
              className="p-4 shadow-[-5px_20px_24px_-4px_#2b353914] rounded-[10px] text-primary hover:underline dark:border-[#d2d2d2e4] dark:border"
            >
              {category.label}
            </Link>
          ))}

          {/* ✅ Fallback UI if no categories */}
          {!categories.length && (
            <p className="text-gray-500 dark:text-gray-400 text-center w-full">
              No tags available
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
