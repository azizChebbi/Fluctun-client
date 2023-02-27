import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import AskSection from "@features/ask/components/AskSection";
import Input from "@atoms/Input";
import SelectOption from "@atoms/SelectOption";
import Button from "@atoms/Button";
import { askQuestionSchema } from "@utils/validations";
import ErrorMessage from "@atoms/ErrorMessage";
import { subjectOptions } from "@utils/options";
import QuillEditor from "@organisms/QuillEditor";
import { postQuestion, PostQuestionBody } from "@features/ask/api";
import { notifyError, notifySuccess } from "@utils/notify";
import minios from "@images/minions.svg";

interface IFormInputs {
  question: string;
  description: string;
  subject: { label: string; value: string };
}

const schema = askQuestionSchema;

const Ask = () => {
  const [description, setDescription] = useState<string>(
    "<p></br></br></br></br></br></br></br></p>"
  );

  const { t } = useTranslation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const postQuestionMutation = useMutation(
    (data: PostQuestionBody) => postQuestion(data),
    {
      onSuccess: () => {
        notifySuccess("Question est ajouter avec succée");
        navigate("/");
      },
      onError: () => {
        notifyError(
          "Une erreur s'est produite, actualisez la page et réessayez"
        );
      },
    }
  );

  const onSubmit = (data: IFormInputs) => {
    postQuestionMutation.mutate({
      question: data.question,
      description,
      subject: data.subject.value,
    });
  };

  return (
    <div className=" md:flex items-start md:my-24 md:w-11/12">
      <div className=" w-full md:w-2/3 m-auto p-4 text-blue">
        <div className=" bg-[#E1F2FF] border-[#56B6FF] border p-4 mb-6">
          <h2 className=" sm:text-xl font-medium">{t("ask:advices.title")}</h2>
          <div className=" ml-4 mt-4">
            {t<string, string[]>("ask:advices.advices", {
              returnObjects: true,
            }).map((t: string, index: number) => (
              <p
                key={index}
                className=" text-blue flex gap-x-2 items-start my-2"
              >
                <FiberManualRecordIcon
                  sx={{ color: "#142B33", fontSize: "5px", marginTop: "4px" }}
                />
                <p className=" text-xs sm:text-base font-light">{t}</p>
              </p>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AskSection
            title={t("ask:form.question.title")}
            description={t("ask:form.question.description")}
          >
            <Input
              registration={register("question")}
              errorMessage={errors.question?.message}
              placeholder="Ajouter un titre"
              className=" mt-4"
            />
            <ErrorMessage>{errors.question?.message}</ErrorMessage>
          </AskSection>
          <AskSection
            title={t("ask:form.description.title")}
            description={t("ask:form.description.description")}
          >
            <div className=" mt-4">
              <QuillEditor value={description} setValue={setDescription} />
            </div>
          </AskSection>
          <AskSection
            title={t("ask:form.subject.title")}
            description={t("ask:form.subject.description")}
          >
            <Controller
              name="subject"
              control={control}
              render={({ field }: { field: any }) => (
                <SelectOption
                  {...field}
                  ref={null}
                  placeholder=""
                  options={subjectOptions}
                  controlStyle={{
                    borderColor: "#929292",
                    fontSize: "12px",
                    marginTop: "16px",
                  }}
                  className={`${errors.subject ? " text-red-500" : ""}`}
                />
              )}
            />
            <ErrorMessage>{errors.subject?.message}</ErrorMessage>
          </AskSection>
          <div className=" flex items-center justify-between mt-8">
            <Button
              className=" rounded p-3 px-12 text-sm"
              type="submit"
              isLoading={postQuestionMutation.isLoading}
              disabled={
                !isValid ||
                description.replace(/<(.|\n)*?>/g, "").trim().length < 50
              }
            >
              Valider
            </Button>
            <Link
              to="/"
              className=" text-red-500 text-sm underline-offset-1 underline"
            >
              cancel
            </Link>
          </div>
        </form>
      </div>
      <img
        src={minios}
        className=" max-w-[300px] hidden md:block -mt-24 -ml-48"
      />
    </div>
  );
};

export default Ask;
