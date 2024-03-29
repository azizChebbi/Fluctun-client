import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import { useMutation } from "react-query";
import usePayload from "@hooks/usePayload";
import Button from "@atoms/Button";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import { queryClient } from "@context/index";
import { getDetailedDateFormat } from "@utils/transformDate";
import AddComment from "./AddComment";
import Comment from "./Comment";
import { getDirection } from "./Question";
import { Comment as CommentType } from "../types";

interface IProps {
  isQuestion: boolean;
  id: string;
  title?: string;
  teacherId: string | null;
  studentId: string | null;
  description: string;
  comments: CommentType[];
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  createdAt?: string;
  subject: string;
  postComment: () => void;
  onDelete: () => void;
}

const QuestionOrAnswerDetails: FC<IProps> = ({
  isQuestion,
  id,
  studentId,
  title,
  description,
  comments,
  createdAt,
  teacherId,
  teacher,
  subject,
}) => {
  // ========================================
  // =============== STATES ===============
  // ========================================
  const [open, setOpen] = React.useState(false);

  // ========================================
  // =============== HOOKS ==================
  // ========================================
  const payload = usePayload();
  const navigate = useNavigate();

  // =========================================
  // =============== MUTATIONS ===============
  // =========================================

  const deleteQuestionMutation = useMutation(() => api.delete("/questions/question?id=" + id), {
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries(["question", id]);
      navigate(-1);
    },
    onError: () => {
      notifyError("Une erreur est survenue lors de la suppression de la question");
      handleClose();
    },
  });

  const deleteAnswerMutation = useMutation(() => api.delete("/questions/answer?id=" + id), {
    onSuccess: () => {
      handleClose();
      queryClient.invalidateQueries("question");
    },
    onError: () => {
      notifyError("Une erreur est survenue lors de la suppression de la réponse");
      handleClose();
    },
  });

  // ========================================
  // =============== HANDLERS ===============
  // ========================================

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeletePost = () => {
    if (isQuestion) {
      deleteQuestionMutation.mutate();
    } else {
      deleteAnswerMutation.mutate();
    }
  };

  return (
    <>
      <div className={"my-6 rounded border border-[#E2E2E2] bg-[#F1F1F1]"}>
        {isQuestion && (
          <div className=" flex items-start justify-between gap-3 border-b border-[#E2E2E2]  p-4 md:p-8">
            <p className=" flex-1 font-medium text-blue md:text-xl">
              <span className=" text-orange">Question: </span>
              {title}
            </p>
            <p className=" mt-1 w-max text-xs text-[#A1A1A1] md:text-base">
              Publié: {getDetailedDateFormat(createdAt)}
            </p>
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className=" border-b border-[#E2E2E2] bg-white p-4 md:p-8"
          dir={getDirection(subject)}
        />
        <div className=" p-4 md:p-8 md:pt-4">
          <div className=" flex flex-row-reverse items-start justify-between">
            {!isQuestion && (
              <div className=" mb-4 w-max items-center justify-between bg-[#EBF7FF] p-4 text-xs  md:text-base">
                <p className=" text-[#A1A1A1]">Publié le {getDetailedDateFormat(createdAt)}</p>
                <div className=" mt-2 flex items-center gap-2 md:gap-4">
                  <img
                    src={
                      teacher?.photo ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmatBzkPfadV3gbygHddFgNYbNzBbINaWqFamNP3zOCJyY-EZzJJZW3SjSpeYSGfSlsgI&usqp=CAU"
                    }
                    className=" h-9 w-9 rounded object-cover"
                  />
                  <p className=" max-w-[18ch] text-blue">
                    {teacher ? teacher?.firstName + " " + teacher?.lastName : "teacher"}
                  </p>
                </div>
              </div>
            )}
            {(isQuestion ? payload.id == studentId : payload.id == teacherId) && (
              <div className=" mt-2 flex items-center gap-4">
                <Link
                  to={isQuestion ? "/ask" : "/edit-answer/" + id}
                  state={{
                    id,
                    title,
                    description,
                    subject: { label: subject, value: subject },
                  }}
                  className=" text-xs font-semibold text-[#A1A1A1] md:text-base"
                >
                  Editer
                </Link>
                <button className=" text-xs font-semibold text-[#A1A1A1] md:text-base" onClick={handleOpen}>
                  Supprimer
                </button>
              </div>
            )}
          </div>

          {/* ======================================== */}
          {/* =============== COMMENTS =============== */}
          {/* ======================================== */}
          <div className=" md:mt-12">
            <p className=" text-lg font-medium text-blue md:text-xl">Commentaires:</p>
            <div className=" my-6">
              {comments.map((comment, index) => (
                <div
                  key={comment.id}
                  className={`my-4 pb-3 ${index < comments.length - 1 ? "border-b border-[#E2E2E2]" : ""}`}
                >
                  <Comment comment={comment} />
                </div>
              ))}
            </div>
            <AddComment
              studentId={payload.role == "student" ? payload.id : null}
              teacherId={payload.role == "teacher" ? payload.id : null}
              questionId={isQuestion ? id : null}
              answerId={isQuestion ? null : id}
            />
          </div>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className=" absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transform rounded bg-[#FCFCFC] p-12">
          <div>
            <p className=" md:max-w-3/4 m-auto text-center md:text-lg">
              {isQuestion
                ? "Etes vous sur de supprimer cette question ?"
                : "Etes vous sur de supprimer cette réponse ?"}
            </p>
            <div className=" mt-4 flex items-center justify-center gap-4">
              <Button
                color="#EF4445"
                className=" px-6 py-2"
                onClick={handleDeletePost}
                isLoading={deleteAnswerMutation.isLoading || deleteQuestionMutation.isLoading}
              >
                Supprimer
              </Button>
              <Button className=" px-6 py-2" onClick={handleClose}>
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuestionOrAnswerDetails;
