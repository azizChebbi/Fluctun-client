import React, { useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import ReactPaginate from "react-paginate";
import { Question as QuestionType } from "@features/questions/types";
import QuestionsList from "@features/questions/components/QuestionsList";
import SideDrawer from "@features/questions/components/Drawer";
import QuestionSkeleton from "@features/questions/components/QuestionSkeleton";
import Filter from "@features/questions/components/Filter";
import useWhichLayout from "@hooks/useWhichLayout";

const Questions = () => {
  const [open, setOpen] = React.useState(false);
  const [questions, setQuestions] = React.useState<QuestionType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [params, setParams] = useUrlState();
  const layout = useWhichLayout();
  console.log("questions page: ", params);

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
        <ReactPaginate
          breakLabel="..."
          // breakClassName=" text-red-500"
          containerClassName=" flex items-center justify-center mt-8"
          pageClassName=" px-3 py-1 text-base font-medium text-blue"
          nextLabel={layout === "desktop" ? "Suivante >" : ">"}
          activeClassName=" bg-orange rounded-[50%] text-white"
          nextClassName=" ml-5"
          previousClassName=" mr-5"
          onPageChange={(p) => setParams({ page: p.selected == 0 ? undefined : p.selected + 1 })}
          pageRangeDisplayed={2}
          pageCount={40}
          previousLabel={layout === "desktop" ? "< Précédente" : "<"}
          initialPage={params.page ? params.page - 1 : 0}
          // renderOnZeroPageCount={null}
        />
      </div>
      <div className=" hidden overflow-scroll  md:block">
        <Filter setQuestions={setQuestions} setIsLoading={setIsLoading} />
      </div>
      <SideDrawer open={open} setOpen={setOpen}>
        <Filter setQuestions={setQuestions} setIsLoading={setIsLoading} />
      </SideDrawer>
    </div>
  );
};

// plus récent et plus ancien

export default Questions;
