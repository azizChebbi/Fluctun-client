import React, { FC } from "react";
import Question from "./Question";
import { Question as QuestionType } from "../types";

interface IProps {
  questions: QuestionType[];
}
const QuestionsList: FC<IProps> = ({ questions }) => {
  return (
    <div>
      {questions.map((question) => (
        <div
          key={question.id}
          className=" my-6 rounded border-2 border-[#E2E2E2] transition hover:shadow-question md:my-16"
        >
          <Question {...question} />
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
