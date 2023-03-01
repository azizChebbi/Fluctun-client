import React from "react";
import Question from "@features/questions/components/Question";

const Questions = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className=" grid  md:grid-cols-[1fr_250px] h-full ">
      <div className=" md:border-r border-[#AFAFAF] p-12">
        <div>
          {arr.map((question) => (
            <div key={question} className=" my-16 shadow-question">
              <Question
                title="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis"
                description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam."
                answered={question % 2 == 0}
              />
            </div>
          ))}
        </div>
      </div>
      <div className=" hidden md:block"></div>
    </div>
  );
};

export default Questions;
