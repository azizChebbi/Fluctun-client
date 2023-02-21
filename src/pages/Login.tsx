import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { loginSchema } from "@utils/validations";
import Input from "@atoms/Input";
import Button from "@atoms/Button";

interface IFormInputs {
  email: string;
  password: string;
}

const schema = loginSchema;

const Login = () => {
  // const { login } = useAuth() as unknown as Auth;
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
  const onSubmit = (data: IFormInputs) => console.log(data);

  // ==================================================
  // ui
  // ==================================================
  return (
    <div className=" w-full min-h-screen">
      <div className=" text-center w-1/3 m-auto mt-10 py-20 px-16 border-2 border-g300 rounded-xl">
        <p className=" text-3xl text-blue font-medium mb-14">
          Bienvenue chez FlucTun
        </p>
        <form className="m-auto text-left" onSubmit={handleSubmit(onSubmit)}>
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
          <div className=" mb-5">
            <label className=" text-lg text-g400 font-semibold">Password</label>
            <br />
            <Input
              type="password"
              registration={register("password")}
              errorMessage={errors.password?.message}
              placeholder="*************"
            />
            <p className=" text-red-500 text-sm mt-2">
              {errors.password?.message}
            </p>
          </div>

          <div className=" flex justify-center items-center w-full mt-10">
            <Button className=" rounded-3xl px-24" type="submit">
              Login
            </Button>
          </div>
          <p className=" text-blue text-sm underline underline-offset-1 font-medium text-center mt-2">
            <Link to={"/forgot-password"}>Mot de passe oublié ?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
