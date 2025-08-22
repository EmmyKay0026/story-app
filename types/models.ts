// types/models.ts
export interface Episode {
  id: string;
  title: string;
  content: string;
  readTime: number; // in minutes
  episodeNumber: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number; // 1-5 stars
  comment: string;
  createdAt: string;
  updatedAt: string;
  isVerified?: boolean;
}

export interface Story {
  id: string;
  title: string;
  description: string;
  author: string;
  authorId?: string;
  coverImage: string;
  category: string;
  tags: string[];
  rating: number; // Average rating
  totalEpisodes: number;
  totalReadTime: number; // in minutes
  episodes: Episode[];
  isFeatured: boolean;
  reviews: Review[];
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  status: "draft" | "published" | "archived";
  viewCount?: number;
  likeCount?: number;
  bookmarkCount?: number;
}
