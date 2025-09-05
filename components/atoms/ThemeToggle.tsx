"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { handleThemeChange } from "@/services/user/userAction";
import { useUserStore } from "@/stores/useUserStore";

export const ThemeToggle = () => {
  const user = useUserStore((state) => state.user);

  const [theme, setTheme] = useState("light");

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
  ];
  useEffect(() => {
    let storedTheme;
    if (!user) {
      const preferences = localStorage.getItem("theme");

      if (!preferences) {
        localStorage.setItem("theme", "light");
        return;
      }
      storedTheme = preferences || "light";
      setTheme(storedTheme);
    } else {
      storedTheme = user.preferences?.theme;
      setTheme(storedTheme);
    }

    // const storedTheme = UserPreferences.theme || "light";

    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    if (!user) return;
    await handleThemeChange(newTheme);
  };

  return (
    <div className="flex items-center w-[70px] p-0 overflow-hidden rounded-[50px] ease-in-out theme-transition shadow-[0px_0px_6px_8px_rgba(219,218,218,0.123)]  dark:shadow-[0px_0px_6px_8px_rgba(65,55,55,0.16)]">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => toggleTheme()}
          className={`
            flex items-center px-2 cursor-pointer w-[35px] rounded-[50%] py-2 text-sm font-medium theme-transition
            ${
              theme === value
                ? "bg-white dark:bg-gray-900  text-yellow-400 dark:text-white shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                : "text-gray-600 dark:text-gray-400 "
            }
          `}
          title={`Switch to ${label.toLowerCase()} theme`}
        >
          <Icon size={16} />
        </button>
      ))}
    </div>
  );
};
