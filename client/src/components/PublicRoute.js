import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const { userInfo } = useSelector((state) => state.authReducer);

  return userInfo ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
