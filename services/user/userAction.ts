import { User, UserProgress } from "@/types";
import api, { formatError } from "../../stores/api";
import axios from "axios";
// import { useUserStore } from "@/stores/user/userStore";
import { redirect } from "next/navigation";
import { useUserStore } from "@/stores/useUserStore";
import { convertDateFormat } from "@/utils/dateTimeConverter";
// import { useUserStore } from "@/hooks/userStore";

export const handleLogin = async (phoneNumber: string) => {
  try {
    const response = await api.post(`/auth/login/`, {
      username: phoneNumber,
    });
    if (response.status == 200 || response.status == 201) {
      //   console.log(response.data);
      if (response.data.User) {
        localStorage.setItem("userId", response.data.User[0].phoneNumber);
      }
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
      return response.data;
    }
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      console.error("Login failed:", error || error);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
};
export const handleGetMe = async (phoneNumber: string) => {
  try {
    const response = await api.get(`/auth/${phoneNumber}`);
    if (response.status == 200 || response.status == 201) {
      return response.data;
    }
  } catch {
    return null;
  }
};

// --- Authorization Checker ---
export const authorizationChecker = async (currentPath: string) => {
  try {
    const userId = localStorage.getItem("userId");
    // let accessToken: string | null = null;
    // let tokenExpiration: number | null = null;

    if (userId) {
      const res = await useUserStore.getState().getMe(userId);
      if (res === null) {
        redirect("/auth/login");
      }

      useUserStore.setState({ user: res, isAuthenticated: true });
    } else {
      window.location.href = `/auth/login?to=${
        encodeURIComponent(currentPath) || `/library`
      }`;
    }
  } catch (error) {
    window.location.href = `/auth/login?to=${
      encodeURIComponent(currentPath) || `/`
    }`;
  }
};

export const handleUpdateBookmark = async (bookmarkedStories: string[]) => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      redirect("/auth/login");
    }
    const bookmarkedStoriesAsString = bookmarkedStories.join(",");

    const response = await api.put(`/user/${userId}`, {
      bookmarks: bookmarkedStoriesAsString,
    });

    if (response.status == 200 || response.status == 201) {
      return response.data;
    } else {
      return { error: "Failed to update user data" };
    }
  } catch (error) {
    return { error: formatError(error) };
  }
};

export const handleUpdateUserProgress = async (
  upadatedUserProgress: UserProgress
) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    redirect("/auth/login");
  }

  // console.log(upadatedUserProgress.lastReadAt.toString(), "to string");
  // console.log(upadatedUserProgress.lastReadAt.toDateString(), "to date string");
  // console.log(convertDateFormat(upadatedUserProgress.lastReadAt.toString()));
  // return;

  try {
    const response = await api.put(`/userprogress/${userId}`, {
      ...upadatedUserProgress,
      episodeId: upadatedUserProgress.episode_id,
      storyId: upadatedUserProgress.story_id,
      user_id: userId,
      lastReadAt: convertDateFormat(upadatedUserProgress.lastReadAt.toString()),
    });

    // console.log(response);

    if (response.status == 200 || response.status == 201) {
      return response.data;
    }
  } catch (error) {
    return { error: formatError(error) };
  }
};

export const handleUnlockEpisode = async (
  unlockedEpisodes: string[],
  cost: number
) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    redirect("/auth/login");
  }
  const unlockedEpisodesAsString = unlockedEpisodes.join(",");

  try {
    const response = await api.put(`/user/${userId}`, {
      unlockedEpisodes: unlockedEpisodesAsString,
      points: cost,
    });
    if (response.status == 200 || response.status == 201) {
      return response.data;
    }
  } catch (error) {
    return { error: formatError(error) };
  }
};

export const handleFontSizeChange = async (fontSize: string) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    redirect("/auth/login");
  }
  try {
    const response = await api.put(`/user/${userId}`, { fontSize });
    if (response.status == 200 || response.status == 201) {
      return response.data;
    }
  } catch (error) {
    return { error: formatError(error) };
  }
};

export const handleThemeChange = async (theme: string) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    return;
  }
  try {
    const response = await api.put(`/user/${userId}`, { theme });

    if (response.status == 200 || response.status == 201) {
      return response.data;
    }
  } catch (error) {
    return { error: formatError(error) };
  }
};
