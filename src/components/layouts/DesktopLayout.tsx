import React, { FC, ReactNode } from "react";
import DesktopNavbar from "@organisms/DesktopNavbar";
import Sidebar from "@organisms/Sidebar";

interface IProps {
  children?: ReactNode;
}

const DesktopLayout: FC<IProps> = ({ children }) => {
  return (
    <div className=" h-screen grid grid-cols-[250px_1fr] grid-rows-[100px_1fr]">
      <DesktopNavbar />
      <Sidebar />
      <main className=" overflow-scroll">{children}</main>
    </div>
  );
};

export default DesktopLayout;
