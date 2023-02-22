import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import FallbackScreen from "@pages/FallbackScreen";
import useLocalStorage from "@hooks/useLocalstorage";
import { NotifyContainer } from "@utils/notify";
import { authenticatedRoutes, unauthenticatedRoutes } from "./routes";

const queryClient = new QueryClient();

const App = () => {
  const [token] = useLocalStorage("at", null);
  console.log(token);
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={FallbackScreen}>
        <NotifyContainer />
        {!token ? (
          <RouterProvider router={createBrowserRouter(authenticatedRoutes)} />
        ) : (
          <RouterProvider router={createBrowserRouter(unauthenticatedRoutes)} />
        )}
      </ErrorBoundary>
    </QueryClientProvider>
  );
};

export default App;
