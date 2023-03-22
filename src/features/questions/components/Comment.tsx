import { Avatar } from "@mui/material";
import React, { FC } from "react";
import { useMutation } from "react-query";
import usePayload from "@hooks/usePayload";
import { queryClient } from "@context/index";
import { notifyError } from "@utils/notify";
import { api } from "@api/index";
import profilePicture from "@images/profile.svg";
import { getDetailedDateFormat } from "@utils/transformDate";
import { Comment as CommentType } from "../types";

interface IProps {
  comment: CommentType;
}

const Comment: FC<IProps> = ({ comment }) => {
  const payload = usePayload();

  const deleteCommentMutation = useMutation((commentId: string) => api.delete("/questions/comment?id=" + commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(["question"]);
    },
    onError: () => {
      notifyError("Une erreur est survenue lors de la suppression du commentaire");
    },
  });
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
            payload.id == comment.teacher?.id || payload.id == comment.student?.id
              ? comment.student?.photo || comment.teacher?.photo || profilePicture
              : profilePicture
          }
        />
        <p className=" mt-[2px] flex-1 text-base font-light text-blue md:text-lg">{comment.text}</p>
      </div>
      <div className=" flex flex-row-reverse items-center justify-between px-12">
        <p className="text-sm font-light text-[#A1A1A1] md:text-base">{getDetailedDateFormat(comment.createdAt)}</p>
        {(payload.role === "teacher" ? payload.id == comment.teacher?.id : payload.id == comment.student?.id) && (
          <button className=" text-xs text-[#A1A1A1] md:text-base" onClick={() => handleDeleteComment(comment.id)}>
            Supprimer
          </button>
        )}
      </div>
    </>
  );
};

export default Comment;
