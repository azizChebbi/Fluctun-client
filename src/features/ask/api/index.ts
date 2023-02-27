import { api } from "@api/index";

export type PostQuestionBody = {
  question: string;
  description: string;
  subject: string;
};

export const postQuestion = (data: PostQuestionBody) =>
  api.post("/questions", data);
