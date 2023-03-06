import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { api } from "@api/index";
import usePayload from "@hooks/usePayload";
import Button from "@atoms/Button";
import QuillEditor from "@organisms/QuillEditor";
import AskSection from "@features/ask/components/AskSection";
import { notifyError, notifySuccess } from "@utils/notify";
import { queryClient } from "@context/index";
import FullPageSpinner from "./FullPageSpinner";

const EditAnswer = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const [description, setDescription] = useState<string>("");
  const navigate = useNavigate();
  const payload = usePayload();

  const { t } = useTranslation();

  // =======================================
  // ========= MUTATION AND QUERIES ========
  // =======================================

  const { data, isError, isLoading } = useQuery(
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
        // navigate(-1);
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
        <Button
          outlined
          className=" flex items-center gap-2 border-none"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIcon sx={{ color: "#142B33" }} />
          Back
        </Button>
        <div className=" mt-12">
          <AskSection
            title={t("ask:form.description.title")}
            description={t("ask:form.description.description")}
          >
            <div className=" mt-4">
              <QuillEditor
                value={description}
                setValue={setDescription}
                placeholder="Ecrivez votre réponse ici..."
              />
              <div className=" text-right">
                <Button
                  className=" mt-6 rounded px-6 py-3 text-sm md:px-10 md:text-lg"
                  type="submit"
                  onClick={handleEditAnswer}
                  isLoading={editAnswerMutation.isLoading}
                  disabled={
                    description.replace(/<(.|\n)*?>/g, "").trim().length < 200
                  }
                >
                  Valider
                </Button>
              </div>
            </div>
          </AskSection>
        </div>
      </div>
    </div>
  );
};

export default EditAnswer;
