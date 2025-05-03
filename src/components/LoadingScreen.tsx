
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-wedding-ivory">
      <div className="w-16 h-16 border-4 border-wedding-rosegold border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-wedding-deep-rosegold font-medium">Loading your invitation...</p>
    </div>
  );
};

export default LoadingScreen;
