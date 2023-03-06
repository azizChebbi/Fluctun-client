import React, { FC } from "react";
import Avatar from "@mui/material/Avatar";
import DateFomratted from "@atoms/DateFomratted";
import usePayload from "@hooks/usePayload";
import AddComment from "./AddComment";
import { Comment } from "../types";

interface IProps {
  isQuestion: boolean;
  id: string;
  title?: string;
  teacherId: string | null;
  studentId: string | null;
  description: string;
  comments: Comment[];
  teacher?: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
  createdAt?: string;
  postComment: () => void;
  onDelete: () => void;
}

const QuestionOrAnswerDetails: FC<IProps> = ({
  isQuestion,
  id,
  studentId,
  title,
  description,
  comments,
  createdAt,
  teacherId,
  teacher,
}) => {
  const payload = usePayload();
  return (
    <div className="my-6 rounded border border-[#E2E2E2]">
      {isQuestion && (
        <div className=" flex items-start justify-between gap-3 border-b border-[#E2E2E2] bg-[#FCFCFC] p-4 md:p-8">
          <p className=" flex-1 font-medium text-blue md:text-xl">
            <span className=" text-orange">Question: </span>
            {title}
          </p>
          <p className=" mt-1 w-max text-xs text-[#A1A1A1] md:text-base">
            Publié: <DateFomratted date={createdAt || ""} />
          </p>
        </div>
      )}
      <div
        dangerouslySetInnerHTML={{ __html: description }}
        className=" border-b border-[#E2E2E2] p-4 md:p-8"
      />
      <div className=" bg-[#FCFCFC] p-4 md:p-8 md:pt-4">
        {!isQuestion && (
          <div className=" mb-4 flex items-center justify-between text-xs text-[#A1A1A1] md:text-base">
            <p className=" ">
              Publié: <DateFomratted date={createdAt || ""} />
            </p>
            <p className=" flex items-center gap-2 md:gap-4">
              Publié par:
              <span className="font-medium">
                {teacher?.firstName + " " + teacher?.lastName}
              </span>
              <Avatar
                sx={{ width: 30, height: 30 }}
                alt="E"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
              />
            </p>
          </div>
        )}
        {/* ======================================== */}
        {/* =============== COMMENTS =============== */}
        {/* ======================================== */}
        <div className=" md:mt-12">
          <p className=" text-lg font-medium text-blue md:text-xl">
            Commentaires:
          </p>
          <div className=" my-6">
            {comments.map((comment, index) => (
              <div
                key={comment.id}
                className={`my-4 pb-3 ${
                  index < comments.length - 1 ? "border-b border-[#E2E2E2]" : ""
                }`}
              >
                <div className=" flex items-start gap-3 p-4">
                  <Avatar
                    sx={{ width: 30, height: 30 }}
                    alt="Emery"
                    src={
                      payload.role === "teacher"
                        ? ""
                        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzHQv_th9wq3ivQ1CVk7UZRxhbPq64oQrg5Q&usqp=CAU"
                    }
                  />
                  <p className=" mt-[2px] flex-1 text-sm font-light text-blue md:text-lg">
                    {comment.text}
                  </p>
                </div>
                <p className=" text-right text-xs font-light text-[#A1A1A1] md:text-base">
                  <DateFomratted date={comment.createdAt || ""} />
                </p>
              </div>
            ))}
          </div>
          <AddComment
            studentId={studentId}
            teacherId={teacherId}
            questionId={isQuestion ? id : null}
            answerId={isQuestion ? null : id}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionOrAnswerDetails;
