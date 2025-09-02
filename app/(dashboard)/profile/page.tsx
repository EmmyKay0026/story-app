import { Story } from "@/constants/stories";
import { fetchStories } from "@/services/story/storyActions";
import PageLoader from "@/components/atoms/PageLoader";
import ProfileClient from "@/components/organisms/ProfileClient";

export default async function ProfilePage() {
  // let allStories: Story[] = [];

  // getStories();
  // }, []);

  // Toggle theme
  // const toggleTheme = () => {
  //   const newTheme = theme === "light" ? "dark" : "light";
  //   setTheme(newTheme);

  //   if (typeof window !== "undefined") {
  //     localStorage.setItem("theme", newTheme);
  //     if (newTheme === "dark") {
  //       document.documentElement.classList.add("dark");
  //     } else {
  //       document.documentElement.classList.remove("dark");
  //     }
  //   }
  // };

  // if (!user) return null;

  // Story progress logic
  // if (!Array.isArray(user.progress)) {
  //   user.progress = [
  //     {
  //       storyId: "3",
  //       episodeId: "2",
  //       progress: 60,
  //       lastReadAt: new Date("2023-10-01T12:00:00Z"),
  //       isCompleted: false,
  //     },
  //   ];
  // }
  // const storiesWithProgress = allStories
  //   ?.filter((story) => user?.progress.some((p) => p.storyId === story.id))
  //   .map((story) => ({
  //     ...story,
  //     progress: calculateStoryProgress(story, user?.progress),
  //     isCompleted: isStoryCompleted(story, user?.progress),
  //     lastRead: user?.progress
  //       .filter((p) => p.storyId === story.id)
  //       .sort((a, b) => b.lastReadAt.getTime() - a.lastReadAt.getTime())[0]
  //       ?.lastReadAt,
  //   }))
  //   .sort((a, b) => b.lastRead!.getTime() - a.lastRead!.getTime());

  // const currentlyReading =
  //   storiesWithProgress?.filter((s) => !s.isCompleted) ?? [];
  // const completedStories =
  //   storiesWithProgress?.filter((s) => s.isCompleted) ?? [];

  // const totalReads = completedStories.length + currentlyReading.length;
  // const bookmarkStories =
  //   allStories?.filter((story) => user.bookmarks.includes(story.id)) ?? [];

  // if (!allStories) {
  //   return (
  //     <section className="relative w-full h-screen flex justify-center items-center">
  //       <PageLoader />
  //     </section>
  //   );
  // }
  return <ProfileClient />;
}
