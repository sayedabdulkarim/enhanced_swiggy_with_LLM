import { useEffect } from "react";
import { useProgressBar } from "../hooks/useProgressBar";

const ProgressBar = ({ onStart, onEnd }) => {
  const { progress, startProgress, endProgress } = useProgressBar();

  useEffect(() => {
    if (onStart) {
      startProgress();
    }
    if (onEnd) {
      endProgress();
    }
  }, [onStart, onEnd]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: `${progress}%`,
        height: "4px",
        backgroundColor: "#FC8019",
        transition: "width 0.4s ease",
        zIndex: 9999,
      }}
    />
  );
};

export default ProgressBar;
