import { User } from "@/constants/stories";
import api, { formatError } from "../../stores/api";
import axios from "axios";
// import { useUserStore } from "@/stores/user/userStore";
import { redirect } from "next/navigation";
import { useUserStore } from "@/hooks/useUserStore";
// import { useUserStore } from "@/hooks/userStore";

export const handleLogin = async (phoneNumber: string) => {
  try {
    const response = await api.post("/auth/login", {
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
    // const rpgaej = JSON.parse(localStorage.getItem("accessToken")!);
    // const rpga ej_token = ;
    const userId = localStorage.getItem("userId");
    let accessToken: string | null = null;
    let tokenExpiration: number | null = null;

    // const userId = localStorage.getItem("userId");
    // console.log(accessToken);

    if (userId) {
      const res = await useUserStore.getState().getMe(userId);
      if (res === null) {
        redirect("/auth/login");
      }
      console.log(res);
      useUserStore.setState({ user: res, isAuthenticated: true });
    } else {
      window.location.href = `/auth/login?to=${
        encodeURIComponent(currentPath) || `/library`
      }`;
      //   if (!useUserStore.getState().user) {
      // const userData = await getUserById(userId!);
      // useUserStore.getState().setUser(userData);
      //   }
    }
  } catch (error) {
    window.location.href = `/auth/login?to=${
      encodeURIComponent(currentPath) || `/`
    }`;
  }
};

export const handleUpdateUserProgress = async (upadatedUserData: User) => {
  try {
    const response = await api.put("/user/progress", upadatedUserData);
    if (response.status == 200 || response.status == 201) {
      return response.data;
    }
  } catch (error) {
    return { error: formatError(error) };
  }
};
