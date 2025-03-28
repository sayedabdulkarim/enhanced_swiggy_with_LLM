// fontHelper.js
import FontFaceObserver from "fontfaceobserver";

const addFontsLoadedClass = (fontName) => {
  const font = new FontFaceObserver(fontName);

  font
    .load()
    .then(() => {
      document.documentElement.classList.add("fonts-loaded");
    })
    .catch((e) => {
      console.error("Font loading failed:", e);
    });
};

export default addFontsLoadedClass;
