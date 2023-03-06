import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { getQuestionById } from "@features/questions/api";
import QuestionOrAnswerDetails from "@features/questions/components/QuestionOrAnswerDetails";
import usePayload from "@hooks/usePayload";
import AskSection from "@features/ask/components/AskSection";
import QuillEditor from "@organisms/QuillEditor";
import Button from "@atoms/Button";
import { api } from "@api/index";
import { queryClient } from "@context/index";
import { notifyError } from "@utils/notify";
import FullPageSpinner from "./FullPageSpinner";

const Description = () => {
  // =======================================
  // ============== STATE ==================
  // =======================================
  const [answer, setAnswer] = useState<string>("");

  // =======================================
  // ============== HOOKS ==================
  // =======================================
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const payload = usePayload();

  // =======================================
  // ========= MUTATION AND QUERIES ========
  // =======================================
  const { data, isLoading, isError } = useQuery(
    ["question", id],
    () => getQuestionById(id),
    {
      onSuccess: (data) => console.log("data", data),
      retry: false,
    }
  );
  const addAnswerMutation = useMutation(
    (data: { questionId: string | undefined; description: string }) =>
      api.post("/questions/answer", data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("question");
        setAnswer("");
      },
      onError: () => {
        notifyError("Une erreur est survenue lors de l'ajout de la réponse");
      },
    }
  );

  // =======================================
  // ============== HANDLERS ===============
  // =======================================

  const handleAddAnswer = () => {
    addAnswerMutation.mutate({
      questionId: id,
      description: answer,
    });
  };

  // =======================================
  // ============== UI ================
  // =======================================

  if (isLoading) return <FullPageSpinner />;
  if (isError || !id) return <Navigate to="/questions" replace={true} />;
  return (
    <div className=" m-auto px-6 py-12 md:w-1/2">
      <QuestionOrAnswerDetails
        isQuestion={true}
        id={id}
        teacherId={payload.role === "teacher" ? payload.id : null}
        studentId={payload.role === "student" ? payload.id : null}
        title={data?.data.question}
        description={data?.data.description || ""}
        comments={data?.data.comments || []}
        createdAt={data?.data.createdAt || ""}
        postComment={() => null}
        onDelete={() => null}
      />
      {data?.data.answers.map((answer) => (
        <QuestionOrAnswerDetails
          key={answer.id}
          isQuestion={false}
          id={answer.id}
          teacherId={payload.role === "teacher" ? payload.id : null}
          studentId={payload.role === "student" ? payload.id : null}
          teacher={answer.teacher}
          description={answer.description || ""}
          comments={answer.comments || []}
          createdAt={answer.createdAt || ""}
          postComment={() => null}
          onDelete={() => null}
        />
      ))}
      {payload.role === "teacher" && (
        <div className=" mt-12">
          <AskSection
            title={t("ask:form.description.title")}
            description={t("ask:form.description.description")}
          >
            <div className=" mt-4">
              <QuillEditor
                value={answer}
                setValue={setAnswer}
                placeholder="Ecrivez votre réponse ici..."
              />
              <div className=" text-right">
                <Button
                  className=" mt-6 rounded px-6 py-3 text-sm md:px-10 md:text-lg"
                  type="submit"
                  onClick={handleAddAnswer}
                  isLoading={addAnswerMutation.isLoading}
                  disabled={
                    answer.replace(/<(.|\n)*?>/g, "").trim().length < 200
                  }
                >
                  Valider
                </Button>
              </div>
            </div>
          </AskSection>
        </div>
      )}
    </div>
  );
};

export default Description;
