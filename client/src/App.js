import { Outlet, useLocation } from "react-router-dom";
import addFontsLoadedClass from "./utils/fontFaceHelper"; // Import the helper
import { useEffect } from "react";
import Footer from "./components/footer";
import { useSelector } from "react-redux";
import { useMessage } from "./hooks/useAlert.js";

const App = () => {
  const { showMessage } = useMessage();
  const { isAlert, type, content } = useSelector((state) => state.alertReducer);
  const location = useLocation(); // Get the current location

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); // Depend on the path

  //async
  useEffect(() => {
    addFontsLoadedClass("ProximaNova");
  }, []);

  useEffect(() => {
    if (isAlert) {
      showMessage(type, content);
    }
  }, [isAlert, content, type, showMessage]);

  return (
    <div className="main_wrapper">
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
