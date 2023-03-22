import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { forgotPasswordSchema } from "@utils/validations";
import Input from "@atoms/Input";
import Button from "@atoms/Button";
import CustomLink from "@atoms/CustomLink";
import { api } from "@api/index";
import ErrorMessage from "@atoms/ErrorMessage";
import AuthScreenFormWrapper from "@layouts/AuthScreenFormWrapper";
import { notifyError } from "@utils/notify";

interface IFormInputs {
  email: string;
}

const schema = forgotPasswordSchema;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const sendEmail = useMutation(() => api.post("/auth/send-email", { email: getValues().email }), {
    onSuccess: () => {
      navigate("/email-sent", { state: { email: getValues().email } });
    },
    onError: () => {
      notifyError("Une erreur est survenue");
    },
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // ==================================================
  // handler
  // ==================================================
  // const onSubmit = (data: IFormInputs) => login(data);
  const onSubmit = (data: IFormInputs) => {
    sendEmail.mutate();
  };

  // ==================================================
  // ui
  // ==================================================
  return (
    <div className=" min-h-screen w-full">
      <AuthScreenFormWrapper>
        <p className=" mb-8 text-xl font-medium text-blue sm:mb-14 sm:text-3xl">Mot de passe oublié ?</p>
        <p className=" mb-6 text-center text-base font-medium text-[#757575] sm:mb-12 sm:text-lg">
          Entrez votre adresse e-mail et sélectionnez <span className=" font-extrabold">Envoyer un email</span>.
        </p>
        <form className=" m-auto text-left" onSubmit={handleSubmit(onSubmit)}>
          <div className=" mb-5">
            <label className=" text-sm font-semibold text-g400 sm:text-lg">EMAIL</label>
            <br />
            <Input
              type={"email"}
              registration={register("email")}
              errorMessage={errors.email?.message}
              placeholder="example@domain.com"
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div className=" mt-10 flex w-full items-center justify-center">
            <Button className=" rounded-3xl px-24" type="submit" isLoading={sendEmail.isLoading}>
              Envoyer en email
            </Button>
          </div>
          <CustomLink to="/login">Retour login</CustomLink>
        </form>
      </AuthScreenFormWrapper>
    </div>
  );
};

export default ForgotPassword;
