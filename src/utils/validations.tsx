import * as yup from "yup";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email doit être valide"
      )
      .email("Email doit être valide")
      .required(),
    password: yup.string().min(8).required("Please Enter your password"),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .matches(
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Email doit être valide"
      )
      .email("Email doit être valide")
      .required(),
  })
  .required();

export const resetPasswordsSchema = yup.object({
  password: yup.string().min(8).required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});
