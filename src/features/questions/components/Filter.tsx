import React from "react";
import useRole from "@hooks/useRole";
import CheckOptions from "@atoms/CheckOptions";
import FilterAccordian from "@atoms/FilterAccordian";
import { subject } from "./Question";

type SubjectsObject = {
  [key in subject]: boolean;
};

const Filter = () => {
  const [questionTypes, setQuestionTypes] = React.useState({
    "Avec réponse": false,
    "Sans réponse": false,
  });
  const [subjects, setSubjects] = React.useState<SubjectsObject>({
    Mathématique: false,
    Physique: false,
    Science: false,
    Anglais: false,
  });
  const [dateOrder, setDateOrder] = React.useState({
    asc: false,
    desc: false,
  });
  const role = useRole();
  return (
    <div>
      <p className=" text-base md:text-xl text-orange text-center underline underline-offset-1 my-12">
        Les filtres
      </p>
      <form>
        <FilterAccordian title="Type" isExpanded>
          <CheckOptions state={questionTypes} setState={setQuestionTypes} />
        </FilterAccordian>
        <FilterAccordian title="Matiére">
          <CheckOptions state={subjects} setState={setSubjects} isMultiple />
        </FilterAccordian>
        <FilterAccordian title="Date">
          {/* <Date /> */}
          <CheckOptions state={dateOrder} setState={setDateOrder} />
        </FilterAccordian>
      </form>
    </div>
  );
};

export default Filter;
