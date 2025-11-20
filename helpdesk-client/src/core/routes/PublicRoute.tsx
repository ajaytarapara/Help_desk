import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store";
import { Roles, Routes } from "../../utils/constant";

const PublicRoute: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (user) {
    if (user.role === Roles.ADMIN)
      return <Navigate to={Routes.ADMIN_DASHBOARD} replace />;
    if (user.role === Roles.AGENT)
      return <Navigate to={Routes.AGENT_DASHBOARD} replace />;
    if (user.role === Roles.USER)
      return <Navigate to={Routes.USER_DASHBOARD} replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
