import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { api } from "@api/index";
import usePayload from "@hooks/usePayload";
import { notifyError, notifySuccess } from "@utils/notify";
import { queryClient } from "@context/index";
import Back from "@atoms/Back";
import EditAnswerSection from "@features/questions/components/AddOrEditAnswer";
import FullPageSpinner from "./FullPageSpinner";

const EditAnswer = () => {
  // =======================================
  // ============== STATE ==================
  // =======================================
  const [description, setDescription] = useState<string>("");

  // =======================================
  // ============== HOOKS ==================
  // =======================================
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const payload = usePayload();

  // =======================================
  // ========= MUTATION AND QUERIES ========
  // =======================================
  const { isError, isLoading } = useQuery(
    "answer",
    () => api.get("/questions/answers/" + id),
    {
      onSuccess: (data) => {
        setDescription(data?.data?.description || "");
      },
      onError: () => {
        navigate(-1);
      },
    }
  );

  const editAnswerMutation = useMutation(
    () => api.put("/questions/answers/" + id, { description: description }),
    {
      onSuccess: () => {
        notifySuccess("La réponse a été modifiée avec succès");
        queryClient.invalidateQueries("answer");
        navigate(-1);
      },
      onError: () => {
        notifyError(
          "Une erreur est survenue lors de la modification de la réponse"
        );
      },
    }
  );

  // =======================================
  // ============== HANDLERS ===============
  // =======================================

  const handleEditAnswer = () => {
    editAnswerMutation.mutate();
  };

  // =======================================
  // ============== UI ===============
  // =======================================
  if (isError || !id || payload.role != "teacher")
    return <Navigate to="/questions" replace={true} />;
  if (isLoading) return <FullPageSpinner />;
  return (
    <div className=" m-auto px-6 py-12 md:w-1/2">
      <div>
        <Back />
        <EditAnswerSection
          answer={description}
          setAnswer={setDescription}
          isLoading={editAnswerMutation.isLoading}
          handleValidate={handleEditAnswer}
        />
      </div>
    </div>
  );
};

export default EditAnswer;
