"use client";

import React from "react";
import { Sun, Moon } from "lucide-react";
import { useUserStore } from "@/stores/useUserStore";
import { usePreferenceStore } from "@/stores/usePreferenceStore";

export const ThemeToggle = () => {
  const user = useUserStore((state) => state.user);
  const theme = usePreferenceStore((state) => state.theme);
  const toggleTheme = usePreferenceStore((state) => state.toggleTheme);

  // const [theme, setTheme] = useState("");

  const themes = [
    { value: "light" as const, icon: Sun, label: "Light" },
    { value: "dark" as const, icon: Moon, label: "Dark" },
  ];

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
