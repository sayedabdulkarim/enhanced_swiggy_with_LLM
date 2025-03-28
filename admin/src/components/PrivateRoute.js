import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header"; // Import your header component
import Footer from "./Footer";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return userInfo ? (
    <div>
      <Header /> {/* Render Header component */}
      <Outlet /> {/* Continue rendering the child components */}
      {/* <Footer /> */}
    </div>
  ) : (
    <Navigate to={"/auth"} replace />
  );
};

export default PrivateRoute;
