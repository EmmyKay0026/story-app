import React from "react";

const PageLoader = () => {
  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default PageLoader;
