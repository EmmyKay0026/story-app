import { fontSizes } from "@/constants/fonts";
import { create } from "zustand";

const defaultFontSizeValue = "medium";

const getPreloadedFontSize = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("fontSize") || defaultFontSizeValue;
  }
  return defaultFontSizeValue; // fallback for SSR
};

const preLoadedFontSizeValue = getPreloadedFontSize();

type FontSizeValue = (typeof fontSizes)[number]["size"];
type FontSizeState = {
  fontSize: FontSizeValue;
  fontSizeLabel: (typeof fontSizes)[number]["label"];
  canIncrease: boolean | null;
  canDecrease: boolean | null;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const useFontSizeStore = create<FontSizeState & { currentIndex: number }>(
  (set) => {
    const initialIndex = fontSizes.findIndex(
      (fs) => fs.value === preLoadedFontSizeValue
    );
    const safeIndex =
      initialIndex === -1
        ? fontSizes.findIndex((fs) => fs.value === "medium")
        : initialIndex;

    return {
      fontSize: fontSizes[safeIndex].size,
      fontSizeLabel: fontSizes[safeIndex].label,
      currentIndex: safeIndex,
      canIncrease: safeIndex < fontSizes.length - 1,
      canDecrease: safeIndex > 0,

      increaseFontSize: async () => {
        set((state) => {
          const nextIndex = Math.min(
            state.currentIndex + 1,
            fontSizes.length - 1
          );

          if (typeof window !== "undefined") {
            localStorage.setItem("fontSize", fontSizes[nextIndex].value);
          }

          return {
            fontSize: fontSizes[nextIndex].size,
            fontSizeLabel: fontSizes[nextIndex].label,
            currentIndex: nextIndex,
            canIncrease: nextIndex < fontSizes.length - 1,
            canDecrease: nextIndex > 0,
          };
        });
      },

      decreaseFontSize: () =>
        set((state) => {
          const prevIndex = Math.max(state.currentIndex - 1, 0);

          if (typeof window !== "undefined") {
            localStorage.setItem("fontSize", fontSizes[prevIndex].value);
          }

          return {
            fontSize: fontSizes[prevIndex].size,
            fontSizeLabel: fontSizes[prevIndex].label,
            currentIndex: prevIndex,
            canIncrease: prevIndex < fontSizes.length - 1,
            canDecrease: prevIndex > 0,
          };
        }),
    };
  }
);

export { useFontSizeStore };
