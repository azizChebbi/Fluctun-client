import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { useMutation } from "react-query";
import { loginSchema } from "@utils/validations";
import Input from "@atoms/Input";
import Button from "@atoms/Button";
import CustomLink from "@atoms/CustomLink";
import ErrorMessage from "@atoms/ErrorMessage";
import AuthScreenFormWrapper from "@layouts/AuthScreenFormWrapper";
import { api } from "@api/index";
import { Auth, useAuth } from "@context/auth";
import { notifyError } from "@utils/notify";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = loginSchema;

const Login = () => {
  const { setToken } = useAuth() as unknown as Auth;

  const login = useMutation(
    (data: IFormInputs) => api.post("/auth/login", data),
    {
      onSuccess: (res) => {
        setToken(res.data.access_token);
      },
      onError: () => {
        notifyError("L'adresse email ou le mot de passe est incorrect");
      },
    }
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // ==================================================
  // handler
  // ==================================================
  // const onSubmit = (data: IFormInputs) => login(data);
  const onSubmit = (data: IFormInputs) => login.mutate(data);

  // ==================================================
  // ui
  // ==================================================
  return (
    <div className=" w-full min-h-screen">
      <AuthScreenFormWrapper>
        <p className=" text-xl sm:text-3xl text-blue font-medium mb-8 sm:mb-14">
          Bienvenue chez FlucTun
        </p>
        <form className="m-auto text-left" onSubmit={handleSubmit(onSubmit)}>
          <div className=" mb-5">
            <label className=" text-sm sm:text-lg text-g400 font-semibold">
              EMAIL
            </label>
            <br />
            <Input
              type={"email"}
              registration={register("email")}
              errorMessage={errors.email?.message}
              placeholder="example@domain.com"
            />
            <ErrorMessage>{errors.email?.message}</ErrorMessage>
          </div>
          <div className=" mb-5">
            <label className=" text-sm sm:text-lg text-g400 font-semibold">
              Password
            </label>
            <br />
            <Input
              type="password"
              registration={register("password")}
              errorMessage={errors.password?.message}
              placeholder="*************"
            />
            <ErrorMessage>{errors.password?.message}</ErrorMessage>
          </div>

          <div className=" flex justify-center items-center w-full mt-10">
            <Button className=" rounded-3xl px-24" type="submit">
              Login
            </Button>
          </div>
          <CustomLink to="/forgot-password">Mot de passe oublié ?</CustomLink>
        </form>
      </AuthScreenFormWrapper>
    </div>
  );
};

export default Login;
