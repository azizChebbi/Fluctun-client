import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import Home from "@pages/Home";
import Login from "@pages/Login";
import ForgotPassword from "@pages/ForgotPassword";
import AuthScreensLayout from "@layouts/AuthScreensLayout";
import ResetPassword from "@pages/ResetPassword";
import SendEmail from "@pages/SendEmail";
import ResetSuccess from "@pages/ResetSuccess";

type Path =
  | "/"
  | "/login"
  | "*"
  | "/forgot-password"
  | "/reset-password/:id/:token"
  | "/email-sent"
  | "/reset-success";

type RouteType = {
  path: Path;
  element: ReactNode;
  children?: RouteType[];
};

export const authenticatedRoutes: RouteType[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace={true} />,
      },
    ],
  },
];

export const unauthenticatedRoutes: RouteType[] = [
  {
    path: "/",
    element: <AuthScreensLayout />,
    children: [
      {
        path: "/",
        element: <Navigate to="/login" replace={true} />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "/email-sent",
        element: <SendEmail />,
      },
      {
        path: "/reset-success",
        element: <ResetSuccess />,
      },
      {
        path: "*",
        element: <Navigate to="/login" replace={true} />,
      },
    ],
  },
];
