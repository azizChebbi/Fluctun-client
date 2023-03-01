import React, { FC } from "react";
import { Link } from "react-router-dom";
import AnsweredBar from "@atoms/AnsweredTicket";
import math from "@icons/subjects/math.svg";
import UnAnsweredBar from "@atoms/UnAnsweredTicket";

export type subject = "Mathématique" | "Anglais" | "Science" | "Physique";

export type QuestionType = {
  id: string;
  title: string;
  description: string;
  answered: boolean;
  subject: subject;
};

const Question: FC<QuestionType> = ({ title, description, answered }) => {
  return (
    <div className=" relative">
      <div className=" bg-[#FCFCFC] absolute w-max p-2 md:p-3 rounded-[50%] shadow-subject top-0 left-7 transform -translate-y-[50%] z-[1]">
        <img src={math} className=" w-6 h-6 md:w-8 md:h-8" />
      </div>
      <div className=" relative overflow-hidden">
        <div className=" bg-[#FCFCFC] rounded relative pt-4 md:pt-6">
          <div className=" absolute top-0 transform -translate-y-1/2 right-12 -rotate-45 z-10">
            {answered ? <AnsweredBar /> : <UnAnsweredBar />}
          </div>
          <p className=" text-blue text-base md:text-xl font-semibold border-b border-[#DADADA] pl-4 py-4 pr-12">
            <span className=" text-orange ">Question: </span>
            {title}
          </p>
          <div>
            <div className=" max-h-24 relative overflow-hidden p-4">
              {description}
              <div className=" absolute top-0 left-0 right-0 bottom-0 flex items-end justify-center question-cover"></div>
            </div>
            <div className=" text-center py-4 pb-6 ">
              <Link
                to=""
                className=" underline underline-offset-1 text-base md:text-lg  text-blue font-medium text-center ml-auto mr-auto"
              >
                Plus d'info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
