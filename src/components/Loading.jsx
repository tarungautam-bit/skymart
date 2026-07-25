import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="text-white text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
};

export default Loading;