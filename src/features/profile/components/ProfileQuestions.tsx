import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { api } from "@api/index";
import useRole from "@hooks/useRole";
import { notifyError } from "@utils/notify";
import DateFomratted from "@atoms/DateFomratted";

const ProfileQuestions = () => {
  const [questions, setQuestion] = React.useState<
    {
      id: string;
      question: string;
      createdAt: string;
    }[]
  >([]);
  const questionsQuery = useQuery(
    "profile-questions",
    () => api.get("/profile/questions"),
    {
      onSuccess: (data) => {
        console.log(data.data);
        setQuestion(data.data);
      },
      onError: (error) => {
        console.log(error);
        notifyError(
          "Une erreur est survenue lors de la récupération des questions. Veuillez réessayer ultérieurement."
        );
      },
      retry: false,
      refetchOnWindowFocus: false,
    }
  );
  const role = useRole();
  return (
    <div className=" ">
      <p className=" mb-4 text-lg font-medium text-blue md:text-xl">
        {role == "student"
          ? "Nombre total de questions: "
          : "Nombre total de réponses: "}
        {questions.length}
      </p>
      <div className="max-h-[300px] overflow-scroll ">
        {questions.map((question) => (
          <Link key={question.id} to={"/questions/" + question.id}>
            <div className="my-4 rounded border border-[#E2E2E2] bg-[#FCFCFC] p-4">
              <p className=" my-1 text-base font-medium text-blue md:text-lg">
                {question.question}
              </p>
              <p className=" text-xs text-[#A1A1A1] md:text-sm">
                Publié: <DateFomratted date={question.createdAt} />
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileQuestions;
