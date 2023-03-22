import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
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
import { generateLabelValueOptions, getSubjects, subject } from "@utils/options";
import QuillEditor from "@organisms/QuillEditor";
import { postQuestion, PostQuestionBody } from "@features/ask/api";
import { notifyError, notifySuccess } from "@utils/notify";
import minios from "@images/minions.svg";
import { api } from "@api/index";
import useStudent from "@hooks/useStudent";
import { getTablesIntersection } from "@utils/filter";
import useExistedSubjetcs from "@hooks/useExistedSubjetcs";

interface IFormInputs {
  question: string;
  description: string;
  subject: { label: string; value: string };
}

const schema = askQuestionSchema;

const Ask = () => {
  // =========================================
  // ============= State & Refs =============
  // =========================================
  const [subjects, setSubjects] = useState<subject[]>([]);
  const location = useLocation();
  const state = location.state as {
    id: string;
    title: string;
    description: string;
    subject: {
      label: string;
      value: string;
    };
  };
  const [description, setDescription] = useState<string>(state?.description || "");

  // =========================================
  // ============= Hooks & Methods ==========
  // =========================================

  const { t } = useTranslation();
  const navigate = useNavigate();
  const student = useStudent();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      question: state?.title,
      subject: state?.subject,
    },
  });

  // =========================================
  // ============= Mutations ================
  // =========================================

  const postQuestionMutation = useMutation((data: PostQuestionBody) => postQuestion(data), {
    onSuccess: () => {
      notifySuccess("Question est ajouter avec succée");
      navigate(-1);
    },
    onError: () => {
      notifyError("Une erreur s'est produite, actualisez la page et réessayez");
    },
  });

  const editQuestionMutation = useMutation((data: PostQuestionBody) => api.put("/questions/" + state.id, data), {
    onSuccess: () => {
      notifySuccess("Question est modifier avec succée");
      navigate(-1);
    },
    onError: () => {
      notifyError("Une erreur s'est produite, actualisez la page et réessayez");
    },
  });

  const existedSubjects = useExistedSubjetcs();

  // =========================================
  // ============= Effects ==================
  // =========================================

  useEffect(() => {
    const existedLevelSubjects = existedSubjects;
    const whichSubjectsTeachedInThisLevel = getSubjects(student?.level);
    const intersectionSubjects = getTablesIntersection(existedLevelSubjects || [], whichSubjectsTeachedInThisLevel);
    setSubjects([...(intersectionSubjects as subject[])]);
  }, [existedSubjects, student]);

  // =========================================
  // ============= Handlers =================
  // =========================================

  const onSubmit = (data: IFormInputs) => {
    if (!state) {
      postQuestionMutation.mutate({
        question: data.question,
        description,
        subject: data.subject.value,
      });
    } else {
      editQuestionMutation.mutate({
        question: data.question,
        description,
        subject: data.subject.value,
      });
    }
  };

  return (
    <div className=" items-start md:my-24 md:flex md:w-11/12">
      <div className=" m-auto w-full p-4 text-blue md:w-2/3">
        <div className=" mb-6 border border-[#56B6FF] bg-[#E1F2FF] p-4">
          <h2 className=" font-medium sm:text-xl">{t("ask:advices.title")}</h2>
          <div className=" ml-4 mt-4">
            {t<string, string[]>("ask:advices.advices", {
              returnObjects: true,
            }).map((t: string, index: number) => (
              <p key={index} className=" my-2 flex items-start gap-x-2 text-blue">
                <FiberManualRecordIcon sx={{ color: "#142B33", fontSize: "5px", marginTop: "4px" }} />
                <p className=" text-xs font-light sm:text-base">{t}</p>
              </p>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <AskSection title={t("ask:form.subject.title")} description={t("ask:form.subject.description")}>
            <Controller
              name="subject"
              control={control}
              render={({ field }: { field: any }) => (
                <SelectOption
                  {...field}
                  ref={null}
                  placeholder=""
                  options={generateLabelValueOptions(subjects)}
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
          <AskSection title={t("ask:form.question.title")} description={t("ask:form.question.description")}>
            <Input
              registration={register("question")}
              errorMessage={errors.question?.message}
              placeholder="Ajouter un titre"
              className=" mt-4"
            />
            <ErrorMessage>{errors.question?.message}</ErrorMessage>
          </AskSection>
          <AskSection title={t("ask:form.description.title")} description={t("ask:form.description.description")}>
            <div className=" mt-4">
              <QuillEditor value={description} setValue={setDescription} placeholder="Ecrivez votre question ici..." />
            </div>
          </AskSection>

          <div className=" mt-8 flex items-center justify-between">
            <Button
              className=" rounded p-3 px-12 text-sm"
              type="submit"
              isLoading={postQuestionMutation.isLoading}
              disabled={!isValid || description.replace(/<(.|\n)*?>/g, "").trim().length < 10}
            >
              Valider
            </Button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className=" text-base  text-red-500 underline underline-offset-1 md:text-lg"
            >
              cancel
            </button>
          </div>
        </form>
      </div>
      <img src={minios} className=" -mt-24 -ml-48 hidden max-w-[300px] md:block" />
    </div>
  );
};

export default Ask;
