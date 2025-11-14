import { Navigate, Outlet } from "react-router-dom";
import { getToken, getUserRole, isTokenExpired } from "../../utils/authUtils";
import { Roles, Routes } from "../../utils/constant";

const PublicRoute: React.FC = () => {
  const token = getToken();
  const role = getUserRole();
  // 🔒 If logged in and token is valid → redirect to the proper dashboard
  if (token && !isTokenExpired()) {
    if (role === Roles.ADMIN)
      return <Navigate to={Routes.ADMIN_DASHBOARD} replace />;
    if (role === Roles.AGENT)
      return <Navigate to={Routes.AGENT_DASHBOARD} replace />;
    if (role === Roles.USER)
      return <Navigate to={Routes.USER_DASHBOARD} replace />;
  }

  // ✅ Otherwise, allow access to public routes
  return <Outlet />;
};

export default PublicRoute;
