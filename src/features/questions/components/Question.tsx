import React, { FC } from "react";
import { Link } from "react-router-dom";
import AnsweredBar from "@atoms/AnsweredTicket";
import math from "@icons/subjects/math.svg";
import UnAnsweredBar from "@atoms/UnAnsweredTicket";

type subject = "math" | "english" | "science" | "history" | "geography";

interface IProps {
  title: string;
  description: string;
  answered: boolean;
}

const Question: FC<IProps> = ({ title, description, answered }) => {
  return (
    <div className=" relative">
      <div className=" bg-[#FCFCFC] absolute w-max p-3 rounded-[50%] shadow-subject top-0 left-7 transform -translate-y-[50%] z-10">
        <img src={math} />
      </div>
      <div className=" relative overflow-hidden">
        <div className=" bg-[#FCFCFC] rounded relative pt-6">
          <div className=" absolute top-0 transform -translate-y-1/2 right-12 -rotate-45 z-10">
            {answered ? <AnsweredBar /> : <UnAnsweredBar />}
          </div>
          <p className=" text-blue text-xl font-semibold border-b border-[#DADADA] pl-4 py-4 pr-12">
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
                className=" underline underline-offset-1 text-lg text-blue font-medium text-center ml-auto mr-auto"
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
