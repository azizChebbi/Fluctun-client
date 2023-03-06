import * as yup from "yup";
import i18 from "../config/i18";

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

export const askQuestionSchema = yup.object({
  question: yup
    .string()
    .min(5, i18.t("ask:errorMessages.question.min") as string)
    .max(150, i18.t("ask:errorMessages.question.max") as string)
    .required(i18.t("ask:errorMessages.question") as string),
  subject: yup
    .object()
    .shape({
      label: yup.string().required(),
      value: yup.string().required(),
    })
    .required(),
});

export const addCommentSchema = yup.object({
  comment: yup.string().required(),
});
