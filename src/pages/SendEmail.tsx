import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import emailSvg from "@icons/verifyEmail.svg";
import CustomLink from "@atoms/CustomLink";

const SendEmail = () => {
  const { state } = useLocation();
  return (
    <div className=" w-full min-h-screen">
      <div className=" text-center w-1/3 m-auto mt-10 py-20 px-16 border-2 border-g300 rounded-xl">
        <p className=" text-3xl text-blue font-medium mb-14">
          Vérifiez votre email
        </p>
        <img src={emailSvg} alt="email" className="m-auto" />
        <p className=" text-lg text-[#757575] font-medium my-8 leading-7">
          Nous avons envoyé un lien de réinitialisation du mot de passe à{" "}
          <span className=" font-extrabold">{state.email}</span>
        </p>
        <CustomLink to="/forgot-password">
          Vous n'avez pas reçu l'email ? Cliquez ici pour renvoyer.
        </CustomLink>
        <CustomLink to="/login">Retour login</CustomLink>
      </div>
    </div>
  );
};

export default SendEmail;
