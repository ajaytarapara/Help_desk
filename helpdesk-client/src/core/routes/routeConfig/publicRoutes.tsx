

import { lazy } from "react";
import { Routes } from "../../../utils/constant";

const LandingPage = lazy(() => import("../../../pages/LandingPage"));
const LoginPage = lazy(() => import("../../../pages/LoginPage"));
const SignUpPage = lazy(() => import("../../../pages/SignUpPage"));

export const publicRoutes = [
  { path: Routes.LANDING, element: <LandingPage /> },
  { path: Routes.LOGIN, element: <LoginPage /> },
  { path: Routes.SIGN_UP, element: <SignUpPage /> },
];
