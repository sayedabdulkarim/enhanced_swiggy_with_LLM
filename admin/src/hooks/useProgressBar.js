import React, { useState, useEffect } from "react";

// Custom Hook
const useProgressBar = () => {
  const [progress, setProgress] = useState(0);

  const startProgress = () => {
    setProgress(20); // Initial progress
    // Increment progress
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return Math.min(oldProgress + 10, 100);
      });
    }, 500);
  };

  const endProgress = () => {
    setProgress(100);
    setTimeout(() => setProgress(0), 400); // Reset after a short delay
  };

  return { progress, startProgress, endProgress };
};

export { useProgressBar };
