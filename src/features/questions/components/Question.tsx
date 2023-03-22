import React, { FC } from "react";
import { Link } from "react-router-dom";
import AnsweredBar from "@atoms/AnsweredTicket";
import UnAnsweredBar from "@atoms/UnAnsweredTicket";
import { getDetailedDateFormat } from "@utils/transformDate";
import { icons } from "@utils/icons";
import { Question as QuestionType } from "../types";

const Question: FC<QuestionType> = ({ title, description, answered, id, createdAt, subject }) => {
  return (
    <div className=" relative">
      <div className=" absolute top-0 left-7 z-[1] w-max -translate-y-[50%] transform rounded-[50%] bg-[#FCFCFC] p-2 shadow-subject md:p-3">
        <img src={icons[subject]} className=" h-6 w-6 md:h-8 md:w-8" />
      </div>
      <div className=" relative overflow-hidden">
        <div className=" relative rounded bg-[#FCFCFC] pt-4 md:pt-6">
          <div className=" absolute top-0 right-12 z-10 -translate-y-1/2 -rotate-45 transform">
            {answered ? <AnsweredBar /> : <UnAnsweredBar />}
          </div>
          <p className=" border-b border-[#DADADA] py-4 pl-4 pr-12 text-base font-semibold text-blue md:text-xl">
            <span className=" text-orange ">{subject}: </span>
            {title}
          </p>
          <div>
            <div className=" relative max-h-24 overflow-hidden p-4">
              <div dangerouslySetInnerHTML={{ __html: description }} />
              <div className=" question-cover absolute top-0 left-0 right-0 bottom-0 flex items-end justify-center"></div>
            </div>
            <div className=" relative flex items-center justify-center py-4 pb-6">
              <Link
                to={"/questions/" + id}
                className="text-base  font-medium text-blue underline underline-offset-1 md:text-lg"
              >
                Plus d'info
              </Link>
              <p className="text absolute top-1/2 right-6 -translate-y-2/3 transform text-sm text-[#A1A1A1] md:text-base">
                {getDetailedDateFormat(createdAt)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
