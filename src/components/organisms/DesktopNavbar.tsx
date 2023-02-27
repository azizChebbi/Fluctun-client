import React from "react";
import { Link } from "react-router-dom";
import logo from "@icons/logo.svg";
import Button from "@atoms/Button";

const DesktopNavbar = () => {
  return (
    <nav className=" col-span-2 border-b border-[#AFAFAF] flex items-center justify-between px-24">
      <img src={logo} className=" w-44 h-12" />
      <div className=" flex items-center justify-center gap-12">
        <Link to="/ask">
          <Button className=" flex items-center justify-center gap-4 px-6 py-4 rounded">
            <span className=" font-medium ">+</span>
            <p>poser une question</p>
          </Button>
        </Link>
        <div className=" w-max rounded-[50%] overflow-hidden">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
            alt="image profile"
            className=" w-14 h-14 object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default DesktopNavbar;
