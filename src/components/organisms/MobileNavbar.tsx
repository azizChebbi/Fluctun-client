import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import logo from "@icons/logo.svg";
import usePayload from "@hooks/usePayload";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import profilePicture from "@images/profile.svg";

const MobileNavbar = () => {
  const { id } = usePayload();

  const student = useQuery(["student", id], () => api.get("/profile/" + id), {
    onSuccess: (data) => {
      console.log(data);
    },
    onError: () => {
      notifyError("Un erreur s'est produite");
    },
  });

  return (
    <nav className="fixed top-0 right-0 left-0 z-[100] flex items-center justify-between border-b-[1px] border-blue bg-white px-10 py-5">
      <Link to="/">
        <img src={logo} alt="logo" className=" h-8 w-36" />
      </Link>
      <Link to="/profile">
        <Avatar
          sx={{ width: 30, height: 30 }}
          alt="E"
          src={student.data?.data.photo || profilePicture}
        />
      </Link>
    </nav>
  );
};

export default MobileNavbar;
