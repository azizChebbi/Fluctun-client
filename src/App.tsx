import React, { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OneSignal from "react-onesignal";
import { useAuth } from "@context/auth";
import { authenticatedRoutes, unauthenticatedRoutes } from "./routes";

const App = () => {
  const { token } = useAuth();
  //  hi my name is hdoknqsdnrbaieznfgennscjxqbx,;qnwaozidnzeudn yOU'RE LY EDQNDQSKJNAZODINAZDKNSQLXNQSXXJBWAWSZGDEGFGGGHFJDSBQ,AZNEWAAQWSZXE
  useEffect(() => {
    OneSignal.init({
      appId: "d3405cc3-6fba-4cc9-9baf-fae5ad04f9d4",
      allowLocalhostAsSecureOrigin: true,
    });
    OneSignal.showSlidedownPrompt();
    OneSignal.sendTag("tech", "react");
  }, []);

  if (token) {
    return <RouterProvider router={createBrowserRouter(authenticatedRoutes)} />;
  } else {
    return (
      <RouterProvider router={createBrowserRouter(unauthenticatedRoutes)} />
    );
  }
};
export default App;
