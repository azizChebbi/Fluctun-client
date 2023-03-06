import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import Input from "@atoms/Input";
import Button from "@atoms/Button";
import { addCommentSchema } from "@utils/validations";
import ErrorMessage from "@atoms/ErrorMessage";
import { queryClient } from "@context/index";
import { notifyError } from "@utils/notify";
import { addComment } from "../api";
import { AddCommentBody } from "../types";

interface IFormInputs {
  comment: string;
}
const schema = addCommentSchema;

interface IProps {
  studentId: string | null;
  teacherId: string | null;
  questionId: string | null;
  answerId: string | null;
}

const AddComment: FC<IProps> = ({
  studentId,
  teacherId,
  questionId,
  answerId,
}) => {
  // ==================================================
  // ==================== HOOKS =======================
  // ==================================================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  // ==================================================
  // ==================== MUTATION ====================
  // ==================================================

  const addCommentMutation = useMutation(
    (data: AddCommentBody) => addComment(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["question"]);
        reset();
      },
      onError: () => {
        notifyError("Une erreur est survenue lors de l'ajout du commentaire");
      },
    }
  );

  // ==================================================
  // ==================== HANDLER =====================
  // ==================================================

  const onSubmit = (data: IFormInputs) => {
    addCommentMutation.mutate({
      studentId,
      teacherId,
      questionId,
      answerId,
      text: data.comment,
    });
  };

  const checkKeyDown = (e: any) => {
    if (e.code === "Enter") e.preventDefault();
  };

  // ==================================================
  // ==================== UI ==========================
  // ==================================================

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => checkKeyDown(e)}
      className=" my-4 w-full text-right"
    >
      <div>
        <Input
          className=" w-full"
          type="text"
          placeholder="Ajouter un commentaire"
          registration={register("comment")}
        />
        <ErrorMessage>{errors.comment?.message}</ErrorMessage>
      </div>
      <br />
      <Button
        isLoading={addCommentMutation.isLoading}
        className=" -my-2 rounded px-6 py-3 text-sm  md:px-10 md:text-lg"
      >
        Publier
      </Button>
    </form>
  );
};

export default AddComment;
