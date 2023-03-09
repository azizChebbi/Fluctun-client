import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQueries } from "react-query";
import useUrlState from "@ahooksjs/use-url-state";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import {
  getDateOrderFromParams,
  getEndDateFromParams,
  getStartDateFromParams,
  getTypeFromParams,
  resetAll,
  Option,
  getSubjectsFromParams,
  getLevelsFromParams,
  getSFP,
  getLFP,
} from "@utils/filter";
import { subject, level } from "@utils/options";
import usePayload from "@hooks/usePayload";
import FilterUI from "./FilterUI";
import { Question as QuestionType, URLParams } from "../types";

interface IProps {
  questions: QuestionType[];
  setQuestions: Dispatch<SetStateAction<QuestionType[]>>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Filter: FC<IProps> = ({ setQuestions, setIsLoading }) => {
  // =================================================
  // =================== PRE SETUP ===================
  // =================================================

  const payload = usePayload();

  const queryResults = useQueries([
    {
      queryKey: [payload.role, payload.id],
      queryFn: () => api.get("/profile/" + payload.id),
    },
    {
      queryKey: "subjects",
      queryFn: () => api.get("/documents/subjects"),
    },
    {
      queryKey: "levels",
      queryFn: () => api.get("/documents/levels"),
    },
  ]);

  useEffect(() => {
    const user = queryResults[0].data?.data;
    const existedSubjects = queryResults[1].data?.data;
    const existedLevels = queryResults[2].data?.data;
    if (user && (existedLevels || existedSubjects)) {
      setSubjects(() => getSubjectsFromParams(params, user.level || "", existedSubjects || []));
      setLevels(() => getLevelsFromParams(params, user.subject || "", existedLevels || []));
    }
    // }
  }, [queryResults[0].isSuccess, queryResults[1].isSuccess, queryResults[2].isSuccess]);

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
  const [questionTypes, setQuestionTypes] = React.useState(() => getTypeFromParams(params));
  const [subjects, setSubjects] = React.useState<Option<subject>>(() => getSFP(params));
  const [levels, setLevels] = React.useState<Option<level>>(() => getLFP(params));
  const [startDate, setStartDate] = useState<Date | null>(() => getStartDateFromParams(params));
  const [endDate, setEndDate] = useState<Date | null>(() => getEndDateFromParams(params));
  const [dateOrder, setDateOrder] = React.useState(() => getDateOrderFromParams(params));

  // =================================================
  // =================== EFFECT ======================
  // =================================================

  useEffect(() => {
    filterMuation.mutate();
  }, []);

  useEffect(() => {
    const params: URLParams = {};
    // ================= DATE ORDER =================
    if (questionTypes["Avec réponse"]) {
      params.type = "answered";
    } else if (questionTypes["Sans réponse"]) {
      params.type = "unanswered";
    } else {
      params.type = undefined;
    }
    // ================= SUBJECTS =================
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
    // ================= LEVELS =================
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
    // ================= DATE ORDER =================
    if (dateOrder["asc"]) {
      params.dateOrder = "asc";
    } else if (dateOrder["desc"]) {
      params.dateOrder = "desc";
    } else {
      params.dateOrder = undefined;
    }
    // ================= DATE =================
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

  const filterMuation = useMutation(() => api.get("/questions", { params: params }), {
    onSuccess: (data) => {
      setQuestions(data.data);
      setIsLoading(false);
    },
    onError: () => {
      notifyError("Une erreur est survenue");
    },
  });

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
      setLevels,
      setDateOrder,
      setStartDate,
      setEndDate,
      setParams,
      queryResults[2].data?.data,
      queryResults[1].data?.data,
      queryResults[0].data?.data.level,
      queryResults[0].data?.data.subject
    );
    handleFilter();
  };

  return (
    <FilterUI
      questionTypes={questionTypes}
      setQuestionTypes={setQuestionTypes}
      subjects={subjects}
      setSubjects={setSubjects}
      levels={levels}
      setLevels={setLevels}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
      dateOrder={dateOrder}
      setDateOrder={setDateOrder}
      handleFilter={handleFilter}
      handleReset={handleReset}
      isLoading={filterMuation.isLoading}
    />
  );
};

export default Filter;
