import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import logo from "@icons/logo.svg";
import profilePicture from "@images/profile.svg";
import useUser from "@hooks/useUser";

const MobileNavbar = () => {
  const user = useUser();

  return (
    <nav className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between border-b-[1px] border-blue bg-white px-10 py-5">
      <Link to="/">
        <img src={logo} alt="logo" className=" h-8 w-36" />
      </Link>
      <Link to="/profile">
        <Avatar sx={{ width: 30, height: 30 }} alt="E" src={user?.photo || profilePicture} />
      </Link>
    </nav>
  );
};

export default MobileNavbar;
