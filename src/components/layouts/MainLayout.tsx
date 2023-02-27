import React from "react";
import { Outlet } from "react-router-dom";
import useMediaQuery from "@hooks/useMediaQuery";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

const MainLayout = () => {
  const matches = useMediaQuery("(min-width: 768px)");
  return (
    <div>
      {matches ? (
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      ) : (
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      )}
    </div>
  );
};

export default MainLayout;
