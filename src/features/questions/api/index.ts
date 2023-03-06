import { api } from "@api/index";
import { GetQuestionResponse, AddCommentBody } from "../types";

export const getQuestionById = (
  id: string | undefined
): Promise<{ data: GetQuestionResponse }> => {
  return api.get(`/questions/${id}`);
};

export const addComment = (body: AddCommentBody) => {
  return api.post("/questions/comment", body);
};
