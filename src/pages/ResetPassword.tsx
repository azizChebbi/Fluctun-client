import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import Input from "@atoms/Input";
import Button from "@atoms/Button";
import { resetPasswordsSchema } from "@utils/validations";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import AuthScreenFormWrapper from "@layouts/AuthScreenFormWrapper";
import ErrorMessage from "@atoms/ErrorMessage";
import CustomLink from "@atoms/CustomLink";
import ResetSuccess from "./ResetSuccess";

interface IFormInputs {
  password: string;
  passwordConfirmation: string;
}

const schema = resetPasswordsSchema;

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const verifyIdAndToken = useMutation(
    () => api.post("/auth/verify-reset", { id, token }),
    {
      onError: () => {
        navigate("/forgot-password");
      },
    }
  );

  const resetPassword = useMutation(
    () =>
      api.post("/auth/reset-password", {
        id,
        token,
        password: getValues().password,
        passwordConfirmation: getValues().passwordConfirmation,
      }),
    {
      onError: () => {
        notifyError(
          "le nouveau mot de passe ne doit pas être égal à l'ancien mot de passe ou l'url n'est pas valide"
        );
      },
    }
  );

  useEffect(() => {
    verifyIdAndToken.mutate();
  }, []);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: IFormInputs) => resetPassword.mutate();
  return (
    <div>
      {resetPassword.isSuccess ? (
        <ResetSuccess />
      ) : (
        <AuthScreenFormWrapper>
          <p className=" text-3xl text-blue font-medium mb-14">
            Bienvenue chez FlucTun
          </p>
          <p className=" text-sm sm:text-lg text-[#757575] font-medium my-4 sm:my-8 leading-7">
            Votre nouveau mot de passe doit être différent du mot de passe
            utilisé précédemment
          </p>
          <form className="m-auto text-left" onSubmit={handleSubmit(onSubmit)}>
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
            <div className=" mb-5">
              <label className=" text-sm sm:text-lg text-g400 font-semibold">
                Confirmez le mot de passe
              </label>
              <br />
              <Input
                type="password"
                registration={register("passwordConfirmation")}
                errorMessage={errors.passwordConfirmation?.message}
                placeholder="*************"
              />
              <ErrorMessage>
                {errors.passwordConfirmation?.message}
              </ErrorMessage>
            </div>

            <div className=" flex justify-center items-center w-full mt-10">
              <Button
                className=" rounded-3xl px-24"
                type="submit"
                isLoading={resetPassword.isLoading}
              >
                reset
              </Button>
            </div>
            <CustomLink to="/login">Retour login</CustomLink>
          </form>
        </AuthScreenFormWrapper>
      )}
    </div>
  );
};

export default ResetPassword;
