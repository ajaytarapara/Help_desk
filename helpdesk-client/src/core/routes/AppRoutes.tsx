import { Suspense } from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";
import LoadingFallback from "../../Components/LoadingFallback";
import { publicRoutes } from "./routeConfig/publicRoutes";
import { protectedRoutes } from "./routeConfig/protectedRoutes";
import { Routes } from "../../utils/constant";

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <RouterRoutes>
        {/* 🔓 Public Routes */}
        {publicRoutes.map((route, index) => (
          <Route key={index} element={<PublicRoute />}>
            <Route path={route.path} element={route.element} />
          </Route>
        ))}

        {/* 🔒 Protected Routes */}
        {protectedRoutes.map((route, index) => (
          <Route
            key={index}
            element={<ProtectedRoute allowedRoles={route.roles} />}>
            <Route path={route.path} element={route.element} />
          </Route>
        ))}

        {/* 🧭 Catch-All Fallback */}
        <Route path="*" element={<Navigate to={Routes.LOGIN} replace />} />
      </RouterRoutes>
    </Suspense>
  );
};

export default AppRoutes;
