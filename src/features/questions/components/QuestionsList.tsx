import React, { FC } from "react";
import Question, { QuestionType } from "./Question";

interface IProps {
  questions: QuestionType[];
}
const QuestionsList: FC<IProps> = ({ questions }) => {
  return (
    <div>
      {questions.map((question, index) => (
        <div key={question.id} className=" my-12 md:my-16 shadow-question">
          <Question
            title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis"
            description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam."
            answered={index % 2 == 0}
            subject="Mathématique"
            id={question.id}
          />
        </div>
      ))}
    </div>
  );
};

export default QuestionsList;
