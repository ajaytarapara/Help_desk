import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../core/store";
import { Routes } from "../../utils/constant";
import Header from "../../Components/common/Header";

interface ProtectedRouteProps {
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to={Routes.LOGIN} replace />;
  }
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={Routes.LOGIN} replace />;
  }

  return (
    <Header>
      <Outlet />
    </Header>
  );
};

export default ProtectedRoute;
