import { useState, useEffect } from "react";

export type Theme = "light" | "dark" | "system";
export type FontSize = "small" | "medium" | "large" | "extra-large";

const FONT_SIZES = {
  small: "text-sm",
  medium: "text-base",
  large: "text-lg",
  "extra-large": "text-xl",
} as const;

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("system");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [fontSize, setFontSize] = useState<FontSize>("medium");

  useEffect(() => {
    // Get theme from localStorage on mount
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }

    const savedFontSize = localStorage.getItem("fontSize") as FontSize;
    if (savedFontSize) {
      setFontSize(savedFontSize);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing font size classes
    Object.values(FONT_SIZES).forEach((size) => {
      root.classList.remove(size);
    });

    // Apply current font size
    root.classList.add(FONT_SIZES[fontSize]);
  }, [fontSize]);

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove existing theme classes
    root.classList.remove("light", "dark");

    if (theme === "system") {
      // Use system preference
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      setResolvedTheme(systemTheme);

      // Listen for system theme changes
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        const newSystemTheme = e.matches ? "dark" : "light";
        root.classList.remove("light", "dark");
        root.classList.add(newSystemTheme);
        setResolvedTheme(newSystemTheme);
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      root.classList.add(theme);
      setResolvedTheme(theme);
    }
  }, [theme]);

  const updateTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const updateFontSize = (newFontSize: FontSize) => {
    setFontSize(newFontSize);
    localStorage.setItem("fontSize", newFontSize);
  };
  return {
    theme,
    resolvedTheme,
    setTheme: updateTheme,
    fontSize,
    setFontSize: updateFontSize,
  };
};
