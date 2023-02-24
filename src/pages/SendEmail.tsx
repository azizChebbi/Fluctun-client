import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useLocation } from "react-router-dom";
import emailSvg from "@icons/verifyEmail.svg";
import CustomLink from "@atoms/CustomLink";
import AuthScreenFormWrapper from "@layouts/AuthScreenFormWrapper";

const SendEmail = () => {
  const { state } = useLocation();
  return (
    <div className=" w-full min-h-screen">
      <AuthScreenFormWrapper>
        <p className=" text-xl sm:text-3xl text-blue font-medium mb-8 sm:mb-14">
          Vérifiez votre email
        </p>
        <img src={emailSvg} alt="email" className="m-auto" />
        <p className=" text-lg text-[#757575] font-medium my-4 sm:my-8 leading-7">
          Nous avons envoyé un lien de réinitialisation du mot de passe à{" "}
          <span className=" font-extrabold">{state.email}</span>
        </p>
        <CustomLink to="/forgot-password">
          Vous n'avez pas reçu l'email ? Cliquez ici pour renvoyer.
        </CustomLink>
        <CustomLink to="/login">Retour login</CustomLink>
      </AuthScreenFormWrapper>
    </div>
  );
};

export default SendEmail;
