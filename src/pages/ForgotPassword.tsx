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

interface IFormInputs {
  email: string;
}

const schema = forgotPasswordSchema;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const sendEmail = useMutation(
    () => api.post("/auth/send-email", { email: getValues().email }),
    {
      onSuccess: () => {
        navigate("/email-sent", { state: { email: getValues().email } });
      },
      onError: () => {
        alert(sendEmail.error);
      },
    }
  );

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
    <div className=" w-full min-h-screen">
      <div className=" text-center w-1/3 m-auto mt-10 py-20 px-16 border-2 border-g300 rounded-xl">
        <p className=" text-3xl text-blue font-medium mb-14">
          Mot de passe oublié ?
        </p>
        <p className=" text-[#757575] text-left mb-12 font-medium text-lg">
          Entrez votre adresse e-mail et sélectionnez{" "}
          <span className=" font-extrabold">Envoyer un email</span>.
        </p>
        <form className=" m-auto text-left" onSubmit={handleSubmit(onSubmit)}>
          <div className=" mb-5">
            <label className=" text-lg text-g400 font-semibold">EMAIL</label>
            <br />
            <Input
              type={"email"}
              registration={register("email")}
              errorMessage={errors.email?.message}
              placeholder="example@domain.com"
            />
            <p className=" text-red-500 text-sm mt-2">
              {errors.email?.message}
            </p>
          </div>
          <div className=" flex justify-center items-center w-full mt-10">
            <Button className=" rounded-3xl px-24" type="submit">
              Envoyer en email
            </Button>
          </div>
          <CustomLink to="/login">Retour login</CustomLink>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
