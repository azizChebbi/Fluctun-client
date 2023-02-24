import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import resetSuccessSvg from "@icons/resetSuccess.svg";
import Button from "@atoms/Button";
import AuthScreenFormWrapper from "@layouts/AuthScreenFormWrapper";

const ResetSuccess = () => {
  return (
    <AuthScreenFormWrapper>
      <p className=" text-3xl text-blue font-medium mb-8">Succès</p>
      <img src={resetSuccessSvg} alt="email" className="m-auto" />
      <p className=" text-lg text-[#757575] font-medium my-8 leading-7">
        Votre mot de passe a été réinitialisé avec succès
      </p>
      <Button className=" rounded-3xl px-24" type="submit">
        <Link to="/login">Login</Link>
      </Button>
    </AuthScreenFormWrapper>
  );
};

export default ResetSuccess;
