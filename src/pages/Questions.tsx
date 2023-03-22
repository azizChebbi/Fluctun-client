import React, { useState } from "react";
import { Question as QuestionType } from "@features/questions/types";
import QuestionsList from "@features/questions/components/QuestionsList";
import Filter from "@features/questions/components/FilterController";
import SideDrawer from "@features/questions/components/Drawer";
import QuestionSkeleton from "@features/questions/components/QuestionSkeleton";
import Filter2 from "@features/questions/components/Filter2";

const Questions = () => {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="grid h-full grid-rows-[1fr] md:grid-cols-[1fr_280px]">
      <div className=" overflow-scroll border-[#AFAFAF]  px-3 md:border-r md:p-12 md:px-6 md:py-6">
        <div className=" mb-12 mt-6 flex items-center justify-between">
          <h1 className=" text-2xl font-semibold text-[#303030] md:text-3xl">Questions</h1>
          <button
            className=" block rounded-[2px] bg-orange p-2 px-4 text-center text-sm font-medium text-white md:hidden "
            onClick={() => setOpen(true)}
          >
            Filtrer
          </button>
        </div>
        {isLoading ? [0, 1, 2, 3].map((i) => <QuestionSkeleton key={i} />) : <QuestionsList questions={questions} />}
      </div>
      <div className=" hidden overflow-scroll  md:block">
        {/* <Filter questions={questions} setQuestions={setQuestions} setOpen={setOpen} setIsLoading={setIsLoading} /> */}
        <Filter2 />
      </div>
      <SideDrawer open={open} setOpen={setOpen}>
        <Filter questions={questions} setQuestions={setQuestions} setOpen={setOpen} setIsLoading={setIsLoading} />
      </SideDrawer>
    </div>
  );
};

// plus récent et plus ancien

export default Questions;
