import { useState, useEffect, useRef } from "react";

function useSticky(ref, hysteresis = 100) {
  // hysteresis value can be adjusted
  const [isSticky, setSticky] = useState(false);
  const originalPos = useRef(null);

  const handleScroll = () => {
    if (originalPos.current === null) {
      originalPos.current =
        ref.current.getBoundingClientRect().top + window.scrollY;
    }

    const scrollY = window.scrollY;
    // Add hysteresis here
    if (scrollY > originalPos.current + hysteresis && !isSticky) {
      setSticky(true);
    } else if (scrollY < originalPos.current - hysteresis && isSticky) {
      setSticky(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]); // Added isSticky as a dependency

  return isSticky;
}

export default useSticky;
