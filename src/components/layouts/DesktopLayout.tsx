import React, { FC, ReactNode } from "react";
import DesktopNavbar from "@organisms/DesktopNavbar";
import Sidebar from "@organisms/Sidebar";

interface IProps {
  children?: ReactNode;
}

const DesktopLayout: FC<IProps> = ({ children }) => {
  return (
    <div className=" grid h-screen grid-cols-[220px_1fr] grid-rows-[100px_1fr]">
      <DesktopNavbar />
      <Sidebar />
      <main className=" overflow-hidden">{children}</main>
    </div>
  );
};

export default DesktopLayout;
