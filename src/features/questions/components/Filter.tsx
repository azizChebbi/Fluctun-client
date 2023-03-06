import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import useUrlState from "@ahooksjs/use-url-state";
import CheckOptions from "@atoms/CheckOptions";
import FilterAccordian from "@atoms/FilterAccordian";
import refresh from "@icons/refresh.svg";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import useRole from "@hooks/useRole";
import {
  getDateOrderFromParams,
  getEndDateFromParams,
  getStartDateFromParams,
  getTypeFromParams,
  getLevelsFromParams,
  getSubjectsFromParams,
  resetAll,
} from "@utils/filter";
import Date from "./Date";
import { level, Question as QuestionType, subject, URLParams } from "../types";

type SubjectsObject = {
  [key in subject]: boolean;
};

interface IProps {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const Filter: FC<IProps> = ({ setQuestions }) => {
  // =================================================
  // =================== STATE =======================
  // =================================================
  const [params, setParams] = useUrlState<Partial<URLParams>>(
    {},
    {
      parseOptions: {
        arrayFormat: "comma",
      },
      stringifyOptions: {
        arrayFormat: "comma",
      },
    }
  );
  console.log(params);
  const [questionTypes, setQuestionTypes] = React.useState(() =>
    getTypeFromParams(params)
  );
  const [subjects, setSubjects] = React.useState<SubjectsObject>(() =>
    getSubjectsFromParams(params)
  );
  const [levels, setLevels] = React.useState(() => getLevelsFromParams(params));
  const [startDate, setStartDate] = useState<Date | null>(() =>
    getStartDateFromParams(params)
  );
  const [endDate, setEndDate] = useState<Date | null>(() =>
    getEndDateFromParams(params)
  );
  const [dateOrder, setDateOrder] = React.useState(() =>
    getDateOrderFromParams(params)
  );
  const role = useRole();

  // =================================================
  // =================== EFFECT ======================
  // =================================================

  useEffect(() => {
    filterMuation.mutate();
  }, []);

  useEffect(() => {
    const params: URLParams = {};

    // QUESTION TYPE
    if (questionTypes["Avec réponse"]) {
      params.type = "answered";
    } else if (questionTypes["Sans réponse"]) {
      params.type = "unanswered";
    } else {
      params.type = undefined;
    }

    // SUBJECTS
    const subjectsArray: subject[] = [];
    Object.entries(subjects).forEach(([key, value]) => {
      if (value) {
        subjectsArray.push(key as subject);
      }
    });

    if (subjectsArray.length > 0) {
      params.subjects = subjectsArray;
    } else {
      params.subjects = undefined;
    }

    // LEVELS
    const levelsArray: level[] = [];
    Object.entries(levels).forEach(([key, value]) => {
      if (value) {
        levelsArray.push(key as level);
      }
    });

    if (levelsArray.length > 0) {
      params.levels = levelsArray;
    } else {
      params.levels = undefined;
    }

    // DATE ORDER
    if (dateOrder["asc"]) {
      params.dateOrder = "asc";
    } else if (dateOrder["desc"]) {
      params.dateOrder = "desc";
    } else {
      params.dateOrder = undefined;
    }

    // DATE
    if (startDate) {
      params.startDate = startDate.toString();
    } else {
      params.startDate = undefined;
    }
    if (endDate) {
      params.endDate = endDate.toString();
    } else {
      params.endDate = undefined;
    }

    setParams(params);
  }, [questionTypes, subjects, levels, dateOrder, startDate, endDate]);

  // =================================================
  // =================== MUTATION ====================
  // =================================================

  const filterMuation = useMutation(
    () => api.get("/questions", { params: params }),
    {
      onSuccess: (data) => {
        setQuestions(data.data);
      },
      onError: () => {
        notifyError("Une erreur est survenue");
      },
    }
  );

  // =================================================
  // =================== HANDLERS ====================
  // =================================================

  const handleFilter = () => {
    filterMuation.mutate();
  };

  const handleReset = () => {
    resetAll(
      setQuestionTypes,
      setSubjects,
      setDateOrder,
      setStartDate,
      setEndDate,
      setParams
    );
    handleFilter();
  };

  return (
    <div className=" pb-12">
      <p className=" my-12 text-center text-base text-orange underline underline-offset-1 md:text-xl">
        Les filtres
      </p>
      <div>
        <FilterAccordian title="Type" isExpanded>
          <CheckOptions state={questionTypes} setState={setQuestionTypes} />
        </FilterAccordian>
        {role === "student" && (
          <FilterAccordian title="Matiére">
            <CheckOptions state={subjects} setState={setSubjects} isMultiple />
          </FilterAccordian>
        )}
        {role === "teacher" && (
          <FilterAccordian title="Niveau">
            <CheckOptions state={levels} setState={setLevels} isMultiple />
          </FilterAccordian>
        )}
        <FilterAccordian title="Date">
          <Date
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
          />
          <CheckOptions state={dateOrder} setState={setDateOrder} />
        </FilterAccordian>
        <button
          type="button"
          onClick={handleFilter}
          className=" flex h-20 w-full items-center justify-center border-y border-[#E2E2E2] bg-[#FFF4F2] text-base font-medium text-orange md:text-lg "
          disabled={filterMuation.isLoading}
        >
          {filterMuation.isLoading ? (
            <ClipLoader color="#F68E79" size="25px" />
          ) : (
            <p>Appliquer les filtres</p>
          )}
        </button>
        <button
          type="button"
          onClick={handleReset}
          className=" flex h-20 w-full items-center justify-center gap-2  py-6 px-4 text-base font-medium text-[#A0A0A0] md:text-lg "
        >
          <img src={refresh} />
          <span>Réinitialiser</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
