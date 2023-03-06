import { Avatar } from "@mui/material";
import React, { FC } from "react";
import { useMutation } from "react-query";
import usePayload from "@hooks/usePayload";
import DateFomratted from "@atoms/DateFomratted";
import { queryClient } from "@context/index";
import { notifyError } from "@utils/notify";
import { api } from "@api/index";
import { Comment as CommentType } from "../types";

interface IProps {
  comment: CommentType;
}

const Comment: FC<IProps> = ({ comment }) => {
  const payload = usePayload();

  const deleteCommentMutation = useMutation(
    (commentId: string) => api.delete("/questions/comment?id=" + commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["question"]);
      },
      onError: () => {
        notifyError(
          "Une erreur est survenue lors de la suppression du commentaire"
        );
      },
    }
  );
  const handleDeleteComment = (id: string) => {
    deleteCommentMutation.mutate(id);
  };
  return (
    <>
      <div className=" flex items-start gap-3 p-4">
        <Avatar
          sx={{ width: 30, height: 30 }}
          alt="Emery"
          src={
            payload.role === "teacher"
              ? ""
              : comment.student?.photo ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmatBzkPfadV3gbygHddFgNYbNzBbINaWqFamNP3zOCJyY-EZzJJZW3SjSpeYSGfSlsgI&usqp=CAU"
          }
        />
        <p className=" mt-[2px] flex-1 text-sm font-light text-blue md:text-lg">
          {comment.text}
        </p>
      </div>
      <div className=" flex flex-row-reverse items-center justify-between px-12">
        <p className="text-xs font-light text-[#A1A1A1] md:text-base">
          <DateFomratted date={comment.createdAt || ""} />
        </p>
        {(payload.role === "teacher"
          ? payload.id == comment.teacher?.id
          : payload.id == comment.student?.id) && (
          <button
            className=" text-xs text-[#A1A1A1] md:text-base"
            onClick={() => handleDeleteComment(comment.id)}
          >
            Supprimer
          </button>
        )}
      </div>
    </>
  );
};

export default Comment;
