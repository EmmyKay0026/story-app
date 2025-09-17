import { create } from "zustand";

type Theme = "light" | "dark" | "";

interface PreferenceState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Helper to get initial theme from localStorage or default to 'light'
const getInitialTheme = (): Theme => {
  let stored;
  if (typeof window !== "undefined") {
    stored = localStorage.getItem("theme");
    if (!stored) {
      return "";
    }
  }
  return stored === "dark" ? "dark" : "light";
};

export const usePreferenceStore = create<PreferenceState>((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    localStorage.setItem("theme", theme);
    set({ theme });
  },
  toggleTheme: () => {
    set((state) => {
      const newTheme: Theme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { theme: newTheme };
    });
  },
}));
