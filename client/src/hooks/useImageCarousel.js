import { useRef, useState, useEffect, useCallback } from "react";

function useImageCarousel(images, widthPerSlide = 260) {
  const carouselViewportRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkPosition = useCallback(() => {
    if (carouselViewportRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        carouselViewportRef.current;
      setIsAtStart(scrollLeft < 5);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 5);
    }
  }, []);

  useEffect(() => {
    const element = carouselViewportRef.current;
    if (element) {
      // Set scroll behavior to smooth
      element.style.scrollBehavior = "smooth";

      // MutationObserver for changes
      const observer = new MutationObserver(checkPosition);
      observer.observe(element, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style"],
      });

      // Initial check
      checkPosition();

      // Clean up
      return () => {
        observer.disconnect();
      };
    }
  }, [checkPosition]);

  const moveCarousel = (directionMultiplier) => {
    const scrollAmount = widthPerSlide * directionMultiplier;
    if (carouselViewportRef.current) {
      carouselViewportRef.current.scrollLeft += scrollAmount;
    }
    // Delay check position to allow for smooth scrolling to finish
    setTimeout(checkPosition, 300); // Adjust this duration as needed
  };

  const moveLeft = () => moveCarousel(-1);
  const moveRight = () => moveCarousel(1);

  return {
    carouselViewportRef,
    moveLeft,
    moveRight,
    images,
    isAtStart,
    isAtEnd,
  };
}

export default useImageCarousel;
