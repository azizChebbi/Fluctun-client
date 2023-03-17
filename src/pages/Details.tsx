import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { useTranslation } from "react-i18next";
import { getQuestionById } from "@features/questions/api";
import QuestionOrAnswerDetails from "@features/questions/components/QuestionOrAnswerDetails";
import usePayload from "@hooks/usePayload";
import { api } from "@api/index";
import { queryClient } from "@context/index";
import { notifyError } from "@utils/notify";
import AddAnswer from "@features/questions/components/AddOrEditAnswer";
import Back from "@atoms/Back";
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
  const navigate = useNavigate();

  // =======================================
  // ========= MUTATION AND QUERIES ========
  // =======================================
  const { data, isLoading, isError } = useQuery(["question", id], () => getQuestionById(id), {
    retry: false,
  });
  const addAnswerMutation = useMutation(
    (data: { questionId: string | undefined; description: string }) => api.post("/questions/answer", data),
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
      <Back />
      <QuestionOrAnswerDetails
        isQuestion={true}
        id={id}
        teacherId={null}
        studentId={data?.data.studentId || null}
        title={data?.data.question}
        description={data?.data.description || ""}
        comments={data?.data.comments || []}
        createdAt={data?.data.createdAt || ""}
        subject={data?.data.subject || ""}
        postComment={() => null}
        onDelete={() => null}
      />
      {data?.data?.answers?.map((answer) => (
        <QuestionOrAnswerDetails
          key={answer.id}
          isQuestion={false}
          id={answer.id}
          teacherId={answer.teacher.id || null}
          studentId={null}
          teacher={answer.teacher}
          description={answer.description || ""}
          subject={data?.data.subject || ""}
          comments={answer.comments || []}
          createdAt={answer.createdAt || ""}
          postComment={() => null}
          onDelete={() => null}
        />
      ))}
      {payload.role === "teacher" && (
        <AddAnswer
          answer={answer}
          setAnswer={setAnswer}
          handleValidate={handleAddAnswer}
          isLoading={addAnswerMutation.isLoading}
        />
      )}
    </div>
  );
};

export default Description;
