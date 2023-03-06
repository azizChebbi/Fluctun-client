import { URLParams } from "@features/questions/types";

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

const getLevelsFromParams = (params: URLParams) => {
  const { levels } = params;
  if (levels) {
    return {
      "1ére année": levels.includes("1ére année"),
      "2éme année": levels.includes("2éme année"),
      "3éme année": levels.includes("3éme année"),
      "4éme année": levels.includes("4éme année"),
    };
  }
  return {
    "1ére année": false,
    "2éme année": false,
    "3éme année": false,
    "4éme année": false,
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

export {
  getTypeFromParams,
  getSubjectsFromParams,
  getDateOrderFromParams,
  getStartDateFromParams,
  getEndDateFromParams,
  getLevelsFromParams,
  resetAll,
};
