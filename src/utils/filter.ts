import { Dispatch, SetStateAction } from "react";
import { URLParams } from "@features/questions/types";
import {
  getLevels,
  getSubjects,
  level,
  levelOptions,
  subject,
  subjectOptions,
} from "./options";

// define generic option of key and value
type Option<T extends string> = {
  [key in T]?: boolean;
};

type TypeOptions = Option<"Avec réponse" | "Sans réponse">;
type SubjectsOptions = Option<subject>;
type LevelsOptions = Option<level>;
type DateOrderOptions = Option<"asc" | "desc">;

// ================================
// ========= TYPES ================
// ================================
type SetQuestionTypes = Dispatch<SetStateAction<TypeOptions>>;
type SetSubjects = Dispatch<SetStateAction<Option<subject>>>;
type SetLevels = Dispatch<SetStateAction<Option<level>>>;
type SetDateOrder = Dispatch<SetStateAction<Option<"asc" | "desc">>>;
type SetStartDate = Dispatch<SetStateAction<Date | null>>;
type SetEndDate = Dispatch<SetStateAction<Date | null>>;
type SetParams = Dispatch<SetStateAction<URLParams>>;
type ResetAll = (
  setQuestionTypes: SetQuestionTypes,
  setSubjects: SetSubjects,
  setLevels: SetLevels,
  setDateOrder: SetDateOrder,
  setStartDate: SetStartDate,
  setEndDate: SetEndDate,
  setParams: SetParams
) => void;
type resetType = (setQuestionTypes: SetQuestionTypes) => void;
type resetSubjects = (setSubjects: SetSubjects) => void;
type resetLevels = (setLevels: SetLevels) => void;
type resetDateOrder = (setDateOrder: SetDateOrder) => void;
type resetDate = (setStartDate: SetStartDate, setEndDate: SetEndDate) => void;

// ==================================
// ============ GET FUNCTIONS ===========
// ==================================

const getTypeFromParams = (params: URLParams): TypeOptions => {
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

const getSubjectsFromParams = (
  params: URLParams,
  level: level
): SubjectsOptions => {
  const { subjects } = params;
  if (subjects) {
    const acc: Option<subject> = {} as Option<subject>;
    getSubjects(level).forEach((subject) => {
      acc[subject] = subjects.includes(subject);
    });
    return acc;
  }
  // return all subjects as false
  const newSubjects: Option<subject> = {} as Option<subject>;
  getSubjects(level).forEach((subject) => {
    newSubjects[subject] = false;
  });
  return newSubjects;
};

const getLevelsFromParams = (
  params: URLParams,
  subject: subject
): LevelsOptions => {
  const { levels } = params;
  if (levels) {
    const acc: Option<level> = {} as Option<level>;
    getLevels(subject).forEach((level) => {
      acc[level] = levels.includes(level);
    });
    return acc;
  }
  // return all levels as false
  const newLevels: Option<level> = {} as Option<level>;
  getLevels(subject).forEach((level) => {
    newLevels[level] = false;
  });
  return newLevels;
};

const getDateOrderFromParams = (params: URLParams): DateOrderOptions => {
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

// ==================================
// ============ RESET FUNCTIONS ===========
// ==================================

const resetType = (setQuestionTypes: Dispatch<SetStateAction<TypeOptions>>) => {
  setQuestionTypes({
    "Avec réponse": false,
    "Sans réponse": false,
  });
};

const resetSubjects = (
  setSubjects: Dispatch<SetStateAction<Option<subject>>>
) => {
  const newSubjects: Option<subject> = {} as Option<subject>;
  subjectOptions.forEach((subject) => {
    newSubjects[subject.label] = false;
  });
  setSubjects(newSubjects);
};

const resetLevels = (setLevels: Dispatch<SetStateAction<Option<level>>>) => {
  const newLevels: Option<level> = {} as Option<level>;
  levelOptions.forEach((level) => {
    newLevels[level.label] = false;
  });
  setLevels(newLevels);
};

const resetDateOrder = (setDateOrder: SetDateOrder) => {
  setDateOrder({
    asc: false,
    desc: false,
  });
};

const resetDate = (setStartDate: SetStartDate, setEndDate: SetEndDate) => {
  setStartDate(null);
  setEndDate(null);
};

const resetAll: ResetAll = (
  setQuestionTypes,
  setSubjects,
  setLevels,
  setDateOrder,
  setStartDate,
  setEndDate,
  setParams
) => {
  resetType(setQuestionTypes);
  resetSubjects(setSubjects);
  resetLevels(setLevels);
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

// ==================================
// ============ EXPORTS ===========
// ==================================

export {
  getTypeFromParams,
  getSubjectsFromParams,
  getDateOrderFromParams,
  getStartDateFromParams,
  getEndDateFromParams,
  getLevelsFromParams,
  resetAll,
};
