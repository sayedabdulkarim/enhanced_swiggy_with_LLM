import { useState, useEffect } from "react";

// Custom hook for sticky behaviort to the top with BOM
function useScrollSticky(selector) {
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector(selector);
      if (element) {
        const elementOffsetTop = element.offsetTop;

        setSticky(window.pageYOffset >= elementOffsetTop);
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selector]);

  return isSticky;
}

export default useScrollSticky;
