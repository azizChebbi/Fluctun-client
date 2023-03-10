import * as yup from "yup";
import i18 from "../config/i18";

export const loginSchema = yup
  .object({
    email: yup
      .string()
      .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email doit être valide")
      .email("Email doit être valide")
      .required(),
    password: yup.string().min(8).required("Please Enter your password"),
  })
  .required();

export const forgotPasswordSchema = yup
  .object({
    email: yup
      .string()
      .matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, "Email doit être valide")
      .email("Email doit être valide")
      .required(),
  })
  .required();

export const resetPasswordsSchema = yup.object({
  password: yup.string().min(8).required("Password is required"),
  passwordConfirmation: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
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

export const addDocumentShema = yup.object({
  title: yup
    .string()
    .min(3, " Titre doit être plus que 3 caractères")
    .max(40, "Titre doit être moins que 40 caractères")
    .required("Titre est obligatoire"),
  file: yup
    .mixed()
    .test("required", " Vous devez selectionner une fichier", (files: any) => {
      // return file && file.size <-- u can use this if you don't want to allow empty files to be uploaded;
      if (files?.length) return true;
      return false;
    })
    .test("fileSize", "Fichier doit être moins que 30MB", (files: any) => {
      console.log(" files", files);
      return files?.length && files[0].size <= 30000000;
    }),
  // .test(
  //   "fileFormat",
  //   "Fichier doit être PDF ou DOCX",
  //   (files: any) => files?.length && (files[0].type === "application/pdf" || files[0].type === "application/docx")
  // ),
  levels: yup
    .array()
    .min(1, "Vous devez selectionner au moins un niveau")
    .of(
      yup.object().shape({
        label: yup.string().required(),
        value: yup.string().required(),
      })
    )
    .required("Vous devez selectionner au moins un niveau"),
});
