import React from "react";
import logo from "@icons/logo.svg";

const MobileNavbar = () => {
  return (
    <nav className="bg-white flex items-center justify-between px-10 fixed top-0 right-0 left-0 z-10 py-5 border-b-[1px] border-blue">
      <img src={logo} alt="logo" className=" w-36 h-8" />
      <div className=" w-max rounded-[50%] overflow-hidden">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
          alt="image profile"
          className=" w-10 h-10 object-cover"
        />
      </div>
    </nav>
  );
};

export default MobileNavbar;
