// LoadingSpinner.jsx
import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
