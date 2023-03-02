import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { useMutation } from "react-query";
import useRole from "@hooks/useRole";
import CheckOptions from "@atoms/CheckOptions";
import FilterAccordian from "@atoms/FilterAccordian";
import refresh from "@icons/refresh.svg";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import { QuestionType, subject } from "./Question";
import Date from "./Date";

type SubjectsObject = {
  [key in subject]: boolean;
};

type URLParams = {
  type?: "answered" | "unanswered";
  subjects?: subject[];
  dateOrder?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
};

const getTypeFromParams = (params: URLParams) => {
  const { type } = params;
  if (type) {
    return {
      "Avec réponse": type === "answered",
      "Sans réponse": type === "unanswered",
    };
  }
  return {
    "Avec réponse": false,
    "Sans réponse": false,
  };
};

const getSubjectsFromParams = (params: URLParams) => {
  const { subjects } = params;
  if (subjects) {
    return {
      Mathématique: subjects.includes("Mathématique"),
      Physique: subjects.includes("Physique"),
      Science: subjects.includes("Science"),
      Anglais: subjects.includes("Anglais"),
    };
  }
  return {
    Mathématique: false,
    Physique: false,
    Science: false,
    Anglais: false,
  };
};

const getDateOrderFromParams = (params: URLParams) => {
  const { dateOrder } = params;
  if (dateOrder) {
    return {
      asc: dateOrder === "asc",
      desc: dateOrder === "desc",
    };
  }
  return {
    asc: false,
    desc: false,
  };
};

const getStartDateFromParams = (params: URLParams) => {
  const { startDate } = params;
  if (startDate) {
    return new window.Date(startDate);
  }
  return null;
};

const getEndDateFromParams = (params: URLParams) => {
  const { endDate } = params;
  if (endDate) {
    return new window.Date(endDate);
  }
  return null;
};

const resetType = (setQuestionTypes: any) => {
  setQuestionTypes({
    "Avec réponse": false,
    "Sans réponse": false,
  });
};

const resetSubjects = (setSubjects: any) => {
  setSubjects({
    Mathématique: false,
    Physique: false,
    Science: false,
    Anglais: false,
  });
};

const resetDateOrder = (setDateOrder: any) => {
  setDateOrder({
    asc: false,
    desc: false,
  });
};

const resetDate = (setStartDate: any, setEndDate: any) => {
  setStartDate(null);
  setEndDate(null);
};

const resetAll = (
  setQuestionTypes: any,
  setSubjects: any,
  setDateOrder: any,
  setStartDate: any,
  setEndDate: any,
  setParams: any
) => {
  resetType(setQuestionTypes);
  resetSubjects(setSubjects);
  resetDateOrder(setDateOrder);
  resetDate(setStartDate, setEndDate);
  setParams({
    type: undefined,
    subjects: undefined,
    dateOrder: undefined,
    startDate: undefined,
    endDate: undefined,
  });
};

interface IProps {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
}

const Filter: FC<IProps> = ({ questions, setQuestions }) => {
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
  const [questionTypes, setQuestionTypes] = React.useState(() =>
    getTypeFromParams(params)
  );
  const [subjects, setSubjects] = React.useState<SubjectsObject>(() =>
    getSubjectsFromParams(params)
  );
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

  useEffect(() => {
    const params: URLParams = {};
    if (questionTypes["Avec réponse"]) {
      params.type = "answered";
    } else if (questionTypes["Sans réponse"]) {
      params.type = "unanswered";
    }
    const subjectsArray: subject[] = [];
    Object.entries(subjects).forEach(([key, value]) => {
      if (value) {
        subjectsArray.push(key as subject);
      }
    });

    if (subjectsArray.length > 0) {
      params.subjects = subjectsArray;
    }
    if (dateOrder["asc"]) {
      params.dateOrder = "asc";
    } else if (dateOrder["desc"]) {
      params.dateOrder = "desc";
    }
    if (startDate) {
      params.startDate = startDate.toString();
    }
    if (endDate) {
      params.endDate = endDate.toString();
    }
    setParams(params);
  }, [questionTypes, subjects, dateOrder, startDate, endDate]);

  const filterMuation = useMutation(
    () => api.get("/questions", { params: params }),
    {
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (error) => {
        console.log(error);
        notifyError("Une erreur est survenue");
      },
    }
  );

  const handleFilter = () => {
    filterMuation.mutate();
  };

  return (
    <div className=" pb-12">
      <p className=" text-base md:text-xl text-orange text-center underline underline-offset-1 my-12">
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
          className=" text-orange bg-[#FFF4F2] text-base md:text-lg font-medium py-6 px-4 w-full border-y border-[#E2E2E2] "
        >
          Appliquer les filtres
        </button>
        <button
          type="button"
          onClick={() => {
            resetAll(
              setQuestionTypes,
              setSubjects,
              setDateOrder,
              setStartDate,
              setEndDate,
              setParams
            );
          }}
          className=" flex items-center justify-center gap-2 text-[#A0A0A0]  text-base md:text-lg font-medium py-6 px-4 w-full "
        >
          <img src={refresh} />
          <span>Réinitialiser</span>
        </button>
      </div>
    </div>
  );
};

export default Filter;
