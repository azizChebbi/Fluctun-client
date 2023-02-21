import React from "react";
import { Outlet } from "react-router-dom";
import logo from "@icons/logo.svg";

const AuthScreensLayout = () => {
  return (
    <div>
      <div className="  py-10 border-b-2 border-[#AFAFAF]">
        <div className=" flex items-center justify-between w-10/12 m-auto">
          <img src={logo} alt="logo" />
          <p className=" text-[#757575] text-lg font-medium">
            Bienvenue à fluctun
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthScreensLayout;
