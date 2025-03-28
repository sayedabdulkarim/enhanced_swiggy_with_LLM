import { useState, useEffect } from "react";

function useTextCycle(texts, interval = 1000) {
  const [currentText, setCurrentText] = useState(texts[0]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [texts, interval]);

  useEffect(() => {
    setCurrentText(texts[index]);
  }, [index, texts]);

  return currentText;
}

export { useTextCycle };
