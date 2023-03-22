import React from "react";
import { Link } from "react-router-dom";
import Button from "@atoms/Button";
import useRole from "@hooks/useRole";

const Home = () => {
  const role = useRole();
  return (
    <div className="">
      <div className=" mx-8 mt-32 flex flex-col items-center justify-center gap-6 md:flex-row md:items-stretch">
        {/* ==================================== */}
        {role == "student" && (
          <div className=" rounded border border-[#A1A1A1] px-8 py-10 md:w-1/3">
            <div className=" h-24">
              <p className=" orangeBackground m-auto w-max bg-[url('@/icons/bgOrange.svg')] py-3 px-6 text-center text-xl font-medium text-[#EF6965]">
                Poser une question
              </p>
            </div>
            <div>
              <p className=" h-20 text-blue">
                Ici vous pouvez deposer vos questions sur les matieres les chapitres ou meme les exercices non compris
                pour les clarifier .
              </p>
              <div className=" text-center">
                <Link to="/ask">
                  <Button color="#EF6965" className=" mt-8 rounded px-4">
                    Poser une question
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ==================================== */}
        <div className=" rounded border border-[#A1A1A1] px-8 py-10 md:w-1/3">
          <div className=" h-24">
            <p className=" blueBackground m-auto w-max py-3 px-6 text-center text-xl font-medium text-blue">
              Voir les questions
            </p>
          </div>
          <div>
            <p className=" h-20 text-blue">
              Vous pouvez ici voir les questions posés et si il ya des reponses et les explications demandés
            </p>
            <div className=" text-center">
              <Link to="/questions">
                <Button className=" mt-8 rounded px-4">Voir les questions</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
