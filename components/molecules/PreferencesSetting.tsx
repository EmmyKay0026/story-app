import { Settings, X } from "lucide-react";
import React, { useState } from "react";
import FontSizeControl from "../atoms/FontSizeControl";
import { ThemeToggle } from "../atoms/ThemeToggle";

const PreferencesSetting = () => {
  const [showPreferences, setShowPreferences] = useState<boolean>(false);
  return (
    <>
      {" "}
      <button
        onClick={() => setShowPreferences(!showPreferences)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Reading preferences"
      >
        <Settings className="w-5 h-5 cursor-pointer" />
      </button>
      {showPreferences && (
        <article className="fixed h-screen inset-0 bg-black/50  z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex  justify-between mb-4">
              <div className="">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Set Reading Preferences
                </h3>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Adjust your reading experience with these settings.
                </p>
              </div>
              <span className="w-[20%] flex justify-end ">
                <X
                  onClick={() => setShowPreferences(!showPreferences)}
                  className="text-2xl text-right cursor-pointer text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                />
              </span>
            </div>
            <div className="space-y-4">
              <h4 className="">Switch between light and dark mode</h4>
              <ThemeToggle />
              <h4 className="">Adjust font size</h4>
              <FontSizeControl />
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default PreferencesSetting;
