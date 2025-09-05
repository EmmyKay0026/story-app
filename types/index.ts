// export const stories = [
//   {
//     id: 1,
//     title: "The Magical Forest",
//     description:
//       "A young adventurer discovers a hidden forest where trees whisper ancient secrets and magical creatures roam freely through moonlit paths.",
//     coverImage: "/api/placeholder/300/200",
//   },
//   {
//     id: 2,
//     title: "Journey to the Stars",
//     description:
//       "Follow Luna as she builds a rocket ship in her backyard and embarks on an incredible journey through space, meeting aliens and exploring distant planets.",
//     coverImage: "/api/placeholder/300/200",
//   },
//   {
//     id: 3,
//     title: "The Dragon's Library",
//     description:
//       "In a castle high above the clouds, a friendly dragon collects books from around the world and shares them with curious visitors seeking knowledge.",
//     coverImage: "/api/placeholder/300/200",
//   },
//   {
//     id: 4,
//     title: "Ocean of Dreams",
//     description:
//       "Dive into an underwater adventure where mermaids sing lullabies and seahorses carry messages between coral kingdoms.",
//     coverImage: "/api/placeholder/300/200",
//   },
//   {
//     id: 5,
//     title: "The Time Keeper's Clock",
//     description:
//       "When all the clocks in town stop working, a clever young inventor must find the Time Keeper to restore the flow of time itself.",
//     coverImage: "/api/placeholder/300/200",
//   },
//   {
//     id: 6,
//     title: "Garden of Wonders",
//     description:
//       "In a secret garden, flowers bloom in impossible colors and plants grow backwards, creating a world where anything can happen.",
//     coverImage: "/api/placeholder/300/200",
//   },
// ];

export interface Episode {
  id: string;
  title: string;
  content: string;
  isPremium: boolean;
  pointsCost: number;
  readTime: number; // in minutes
  order: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  created_at: string;
}

export type Category = {
  id: string;
  label: string;
  value: string;
};

export interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  coverImage?: string | { url: string };
  category: Category;
  tags?: string[];
  rating: number;
  totalEpisodes: number;
  totalReadTime: number; // in minutes
  episodes: Episode[];
  isFeatured: boolean | string;
  reviews?: Review[];
}

export interface UserProgress {
  story_id: string;
  episode_id: string;
  progress: number; // 0-100 percentage
  lastReadAt: Date;
  isCompleted: boolean;
}

export interface User {
  id: string;
  phoneNumber: string | null;
  points: number;
  preferences: {
    theme: "light" | "dark" | "system";
    fontSize: "small" | "medium" | "large" | "extra-large";
  };
  progress: UserProgress[];
  bookmarks: string[]; // story IDs
  unlockedEpisodes: string[]; // episode IDs
}

export interface ApiError {
  error: string;
  code: number;
}

export interface FetchedResponse {
  featured: Story[];
  trending: Story[];
}
