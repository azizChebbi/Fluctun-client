import React from "react";
import { Question as QuestionType } from "@features/questions/types";
import QuestionsList from "@features/questions/components/QuestionsList";
import Filter from "@features/questions/components/Filter";
import SideDrawer from "@features/questions/components/Drawer";

const Questions = () => {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  return (
    <div className="grid h-full grid-rows-[1fr] md:grid-cols-[1fr_280px]">
      <div className=" overflow-scroll border-[#AFAFAF]  px-3 md:border-r md:p-12 md:px-6 md:py-6">
        <div className=" mb-12 mt-6 flex items-center justify-between">
          <h1 className=" text-2xl font-semibold text-[#303030] md:text-3xl">
            Questions
          </h1>
          <p
            className=" block text-center text-base text-orange underline underline-offset-1 md:hidden md:text-xl"
            onClick={() => setOpen(true)}
          >
            Filtrer
          </p>
        </div>
        {/* {questions.length == 0 ? (
          [0, 1, 2, 3].map((i) => <QuestionSkeleton key={i} />)
        ) : (
          <QuestionsList questions={questions} />
        )} */}
        <QuestionsList questions={questions} />
      </div>
      <div className=" hidden overflow-scroll  md:block">
        <Filter
          questions={questions}
          setQuestions={setQuestions}
          setOpen={setOpen}
        />
      </div>
      <SideDrawer open={open} setOpen={setOpen}>
        <Filter
          questions={questions}
          setQuestions={setQuestions}
          setOpen={setOpen}
        />
      </SideDrawer>
    </div>
  );
};

export default Questions;
