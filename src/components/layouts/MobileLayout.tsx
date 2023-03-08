import React, { FC, ReactNode } from "react";
import BottomNavigation from "@organisms/BottomNavigation";
import MobileNavbar from "@organisms/MobileNavbar";

interface IProps {
  children?: ReactNode;
}

const MobileLayout: FC<IProps> = ({ children }) => {
  return (
    <div>
      <MobileNavbar />
      <div className=" bg-red mx-4 mb-28 mt-24 h-screen">{children}</div>
      <BottomNavigation />
    </div>
  );
};

export default MobileLayout;
