import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <h1 className=" text-red-400">Navbar</h1>
      <Outlet />
      <h1 className=" text-red-400">Footer</h1>
    </div>
  );
};

export default MainLayout;
