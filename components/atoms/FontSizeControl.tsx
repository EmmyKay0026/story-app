"use client";
import React, { use, useEffect, useState } from "react";
import { Minus, Plus, Type } from "lucide-react";
import { useFontSizeStore } from "@/hooks/store";
import { fontSizes } from "@/constants/fonts";

const FontSizeControl = () => {
  //   const [fontSize, setFontSize] = useState<string>("medium");
  const {
    fontSizeLabel,
    canIncrease,
    canDecrease,
    increaseFontSize,
    decreaseFontSize,
  } = useFontSizeStore();

  //   const currentIndex = fontSizes.findIndex((f) => f.size === fontSize);
  //   const canDecrease = currentIndex > 0;
  //   const canIncrease = currentIndex < fontSizes.length - 1;

  //   const decreaseFontSize = () => {
  //     if (canDecrease) {
  //       setFontSize(fontSizes[currentIndex - 1].value);
  //       localStorage.setItem("fontSize", fontSizes[currentIndex - 1].value);
  //     }
  //   };

  //   const increaseFontSize = () => {
  //     if (canIncrease) {
  //       setFontSize(fontSizes[currentIndex + 1].value);
  //       localStorage.setItem("fontSize", fontSizes[currentIndex + 1].value);
  //     }
  //   };
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-gray-800 p-1 theme-transition">
      <button
        onClick={() => decreaseFontSize()}
        disabled={!canDecrease}
        className={`
          p-2 rounded-md theme-transition
          ${
            canDecrease
              ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/50"
              : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
          }
        `}
        title="Decrease font size"
      >
        <Minus size={16} />
      </button>

      <div className="flex items-center gap-1 px-2">
        <Type size={16} className="text-gray-600 dark:text-gray-400" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
          {fontSizeLabel}
        </span>
      </div>

      <button
        onClick={() => increaseFontSize()}
        disabled={!canIncrease}
        className={`
          p-2 rounded-md theme-transition
          ${
            canIncrease
              ? "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-white/50 dark:hover:bg-gray-700/50"
              : "text-gray-400 dark:text-gray-600 cursor-not-allowed"
          }
        `}
        title="Increase font size"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default FontSizeControl;
