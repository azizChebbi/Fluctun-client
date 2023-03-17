import React from "react";
import { Outlet } from "react-router-dom";
import useWhichLayout from "@hooks/useWhichLayout";
import DesktopLayout from "./DesktopLayout";
import MobileLayout from "./MobileLayout";

const MainLayout = () => {
  const layout = useWhichLayout();
  return (
    <div>
      {layout == "desktop" ? (
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
