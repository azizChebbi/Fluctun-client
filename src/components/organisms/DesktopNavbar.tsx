import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import logo from "@icons/logo.svg";
import Button from "@atoms/Button";
import profilePicture from "@images/profile.svg";
import useRole from "@hooks/useRole";
import useUser from "@hooks/useUser";

const DesktopNavbar = () => {
  const role = useRole();
  const user = useUser();
  return (
    <nav className=" col-span-2 flex items-center justify-between border-b border-[#AFAFAF] px-24">
      <Link to="/">
        <img src={logo} className=" h-12 w-44" />
      </Link>
      <div className=" flex items-center justify-center gap-12">
        <Link to={role == "student" ? "/ask" : "/questions"}>
          <Button className=" flex items-center justify-center gap-4 rounded px-6 py-4">
            {role == "student" && <span className=" font-medium ">+</span>}
            <p>{role == "student" ? "Poser une question" : "Répondre aux questions"}</p>
          </Button>
        </Link>
        <Link to="/profile">
          <Avatar sx={{ width: 40, height: 40 }} alt="E" src={user?.photo || profilePicture} />
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
