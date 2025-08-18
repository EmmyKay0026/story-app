"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const [theme, setTheme] = useState("light");

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
  ];
  useEffect(() => {
    const preferences = localStorage.getItem("theme");
    // const UserPreferences = preferences ? JSON.parse(preferences) : null;
    // const UserPreferences = preferences ? JSON.parse(preferences) : null;
    // console.log(UserPreferences);

    // if (!UserPreferences) {
    //   localStorage.setItem(
    //     "theme",
    //     JSON.stringify({ theme: "light" })
    //   );
    //   return;
    // }
    if (!preferences) {
      localStorage.setItem("theme", "light");
      return;
    }

    // const storedTheme = UserPreferences.theme || "light";
    const storedTheme = preferences || "light";
    setTheme(storedTheme);
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    const preference = localStorage.getItem("theme");
    // const userPreference = preference ? JSON.parse(preference) : null;

    // preference = newTheme;

    // console.log(userPreference);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <div className="flex items-center w-[70px] p-0 border overflow-hidden border-xl border-second rounded-[50px] ease-in-out theme-transition">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => toggleTheme()}
          className={`
            flex items-center px-2 cursor-pointer w-[35px] rounded-[50%] py-2 text-sm font-medium theme-transition
            ${
              theme === value
                ? "bg-white dark:bg-gray-900 text-white dark:text-gray-900 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900"
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
