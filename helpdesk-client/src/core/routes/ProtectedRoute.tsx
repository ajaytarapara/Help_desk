import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUserRole, isTokenExpired } from "../../utils/authUtils";
import { Routes } from "../../utils/constant";
import Header from "../../Components/common/Header";
interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const token = getToken();
  const role = getUserRole();

  // 🔒 If no token or token expired → redirect to login
  if (!token || isTokenExpired()) {
    localStorage.removeItem("token");
    return <Navigate to={Routes.LOGIN} replace />;
  }

  // 🚫 If user role is not allowed → redirect to login or a “not authorized” page
  if (!role || !allowedRoles.includes(role)) {
    return <Navigate to={Routes.LOGIN} replace />;
  }

  // Otherwise, allow access
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
