import React, { useEffect, useState } from "react";

const texts = [
  "Access to Swiggy tools and support",
  "Reach customers far away from you",
  "Increase your online orders",
];

const TextChangeComponent = () => {
  const [activeText, setActiveText] = useState(texts[0]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount((prevCount) => (prevCount + 1) % texts.length);
    }, 2000);

    // Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setActiveText(texts[count]);
  }, [count]);

  return (
    <>
      <div className="support_text">{activeText}</div>
      <div className="active_text_line">
        {texts.map((_, index) => (
          <div
            key={index}
            className={`text_line ${index === count ? "isActive" : ""}`}
          ></div>
        ))}
      </div>
    </>
  );
};

export default TextChangeComponent;
