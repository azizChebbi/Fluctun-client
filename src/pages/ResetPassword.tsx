import React from "react";
import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "@atoms/Input";
import Button from "@atoms/Button";
import { resetPasswordsSchema } from "@utils/validations";

interface IFormInputs {
  password: string;
  passwordConfirmation: string;
}

const schema = resetPasswordsSchema;

const ResetPassword = () => {
  const params = useParams();
  console.log(params);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => console.log(data);
  return (
    <div>
      <div className=" text-center w-1/3 m-auto mt-10 py-20 px-16 border-2 border-g300 rounded-xl">
        <p className=" text-3xl text-blue font-medium mb-14">
          Bienvenue chez FlucTun
        </p>
        <p className=" text-lg text-[#757575] font-medium my-8 leading-7">
          Votre nouveau mot de passe doit être différent du mot de passe utilisé
          précédemment
        </p>
        <form className="m-auto text-left" onSubmit={handleSubmit(onSubmit)}>
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
          <div className=" mb-5">
            <label className=" text-lg text-g400 font-semibold">
              Confirmez le mot de passe
            </label>
            <br />
            <Input
              type="password"
              registration={register("passwordConfirmation")}
              errorMessage={errors.passwordConfirmation?.message}
              placeholder="*************"
            />
            <p className=" text-red-500 text-sm mt-2">
              {errors.passwordConfirmation?.message}
            </p>
          </div>

          <div className=" flex justify-center items-center w-full mt-10">
            <Button className=" rounded-3xl px-24" type="submit">
              reset
            </Button>
          </div>
          <p className=" text-blue text-sm underline underline-offset-1 font-medium text-center mt-2">
            <Link to={"/login"}>Retour login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
