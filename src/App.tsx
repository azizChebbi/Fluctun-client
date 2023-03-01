import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useAuth } from "@context/auth";
import { authenticatedRoutes, unauthenticatedRoutes } from "./routes";

const App = () => {
  const { token } = useAuth();

  if (token) {
    return <RouterProvider router={createBrowserRouter(authenticatedRoutes)} />;
  } else {
    return (
      <RouterProvider router={createBrowserRouter(unauthenticatedRoutes)} />
    );
  }
};
export default App;
