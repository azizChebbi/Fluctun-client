import React from "react";
import { QuestionType } from "@features/questions/components/Question";
import QuestionsList from "@features/questions/components/QuestionsList";
import Filter from "@features/questions/components/Filter";
import SideDrawer from "@features/questions/components/Drawer";

const questionss: QuestionType[] = [
  {
    id: "1",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.",
    answered: true,
    subject: "Mathématique",
  },
  {
    id: "2",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.",
    answered: true,
    subject: "Mathématique",
  },
  {
    id: "3",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.",
    answered: true,
    subject: "Mathématique",
  },
  {
    id: "4",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.",
    answered: true,
    subject: "Mathématique",
  },
  {
    id: "5",
    title:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus commodi placeat atque optio pariatur quas aliquam modi nobis quis, ipsa blanditiis ea ut odio iste consequatur perspiciatis odit ad? Aperiam.",
    answered: true,
    subject: "Mathématique",
  },
];

const Questions = () => {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  return (
    <div className=" grid  md:grid-cols-[1fr_280px] h-full ">
      <div className=" md:border-r border-[#AFAFAF] px-3 md:px-6 md:py-6  md:p-12 h-full overflow-scroll">
        <div className=" mb-12 mt-6 flex items-center justify-between">
          <h1 className=" text-[#303030] text-2xl md:text-3xl font-semibold">
            Questions
          </h1>
          <p
            className=" block md:hidden text-base md:text-xl text-orange text-center underline underline-offset-1"
            onClick={() => setOpen(true)}
          >
            Filtrer
          </p>
        </div>
        <QuestionsList questions={questionss} />
      </div>
      <div className=" hidden md:block overflow-scroll">
        <Filter questions={questions} setQuestions={setQuestions} />
      </div>
      <SideDrawer open={open} setOpen={setOpen}>
        <Filter questions={questions} setQuestions={setQuestions} />
      </SideDrawer>
    </div>
  );
};

export default Questions;
