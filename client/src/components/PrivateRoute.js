import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./Header"; // Import your header component

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return userInfo ? (
    <div>
      <Header /> {/* Render Header component */}
      <Outlet /> {/* Continue rendering the child components */}
    </div>
  ) : (
    <Navigate to={"/auth"} replace />
  );
};

export default PrivateRoute;
