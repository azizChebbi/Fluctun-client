import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth, Auth } from "@context/auth";
import { authenticatedRoutes, unauthenticatedRoutes } from "./routes";

const App = () => {
  const { token } = useAuth() as unknown as Auth;

  if (token) {
    return <RouterProvider router={createBrowserRouter(authenticatedRoutes)} />;
  } else {
    return (
      <RouterProvider router={createBrowserRouter(unauthenticatedRoutes)} />
    );
  }
};
export default App;
