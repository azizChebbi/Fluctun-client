import React from "react";
import { Link } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import { useQuery } from "react-query";
import logo from "@icons/logo.svg";
import Button from "@atoms/Button";
import usePayload from "@hooks/usePayload";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";

const DesktopNavbar = () => {
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
    <nav className=" col-span-2 flex items-center justify-between border-b border-[#AFAFAF] px-24">
      <Link to="/">
        <img src={logo} className=" h-12 w-44" />
      </Link>
      <div className=" flex items-center justify-center gap-12">
        <Link to="/ask">
          <Button className=" flex items-center justify-center gap-4 rounded px-6 py-4">
            <span className=" font-medium ">+</span>
            <p>Poser une question</p>
          </Button>
        </Link>
        <Link to="/profile">
          <Avatar
            sx={{ width: 40, height: 40 }}
            alt="E"
            src={
              student.data?.data.photo ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
            }
          />
        </Link>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
