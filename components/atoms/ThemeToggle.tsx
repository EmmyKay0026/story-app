"use client";

import React from "react";
import { Sun, Moon, Monitor } from "lucide-react";
import { useThemeContext } from "@/context/ThemeContext";

export const ThemeToggle = () => {
  const { theme, setTheme } = useThemeContext();

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
    { value: "system" as const, icon: Monitor, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 rounded-lg dark:bg-[170010] p-1 theme-transition">
      {themes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`
            flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium theme-transition
            ${
              theme === value
                ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm ring-1 ring-black/5 dark:ring-white/10"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:bg-[rgba(69,182,73,0.2)] hover:bg-[#45B64980] "
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
