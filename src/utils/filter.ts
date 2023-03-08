import { Dispatch, SetStateAction } from "react";
import { URLParams } from "@features/questions/types";
import { getLevels, getSubjects, level, levelOptions, subject, subjectOptions } from "./options";

// define generic option of key and value
export type Option<T extends string> = {
  [key in T]?: boolean;
};

export type TypeOptions = Option<"Avec réponse" | "Sans réponse">;
export type SubjectsOptions = Option<subject>;
export type LevelsOptions = Option<level>;
export type DateOrderOptions = Option<"asc" | "desc">;

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

const getSubjectsFromParams = (params: URLParams, level: level, existedSubjects: subject[]): SubjectsOptions => {
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
    if (existedSubjects.includes(subject)) {
      newSubjects[subject] = false;
    }
    // newSubjects[subject] = false;
  });
  return newSubjects;
};

const getLevelsFromParams = (params: URLParams, subject: subject, existedLevels: level[]): LevelsOptions => {
  const { levels } = params;
  console.log(existedLevels, getLevels(subject));
  if (levels) {
    const acc: Option<level> = {} as Option<level>;
    getLevels(subject).forEach((level) => {
      acc[level] = levels.includes(level);
    });
    return acc;
  }
  const newLevels: Option<level> = {} as Option<level>;
  getLevels(subject).forEach((level) => {
    if (existedLevels.includes(level)) {
      newLevels[level] = false;
    }
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

const resetSubjects = (setSubjects: Dispatch<SetStateAction<Option<subject>>>) => {
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

export class FilterService {
  params: URLParams;
  existedLevels: level[];
  existedSubjects: subject[];
  constructor(params: URLParams, existedLevels: level[], existedSubjects: subject[]) {
    this.params = params;
    this.existedLevels = existedLevels;
    this.existedSubjects = existedSubjects;
  }

  getTablesIntersection(table1: string[], table2: string[]) {
    return table1.filter((value) => table2.includes(value));
  }

  getSubjectsFromParams = (level: level): SubjectsOptions => {
    const { subjects } = this.params;
    if (subjects) {
      const acc: Option<subject> = {} as Option<subject>;
      getSubjects(level).forEach((subject) => {
        acc[subject] = subjects.includes(subject);
      });
      return acc;
    }
    const newSubjects: Option<subject> = {} as Option<subject>;
    this.getTablesIntersection(this.existedSubjects, getSubjects(level)).forEach((subject) => {
      newSubjects[subject as subject] = false;
    });
    return newSubjects;
  };

  getLevelsFromParams = (subject: subject): LevelsOptions => {
    const { levels } = this.params;
    if (levels) {
      const acc: Option<level> = {} as Option<level>;
      getLevels(subject).forEach((level) => {
        acc[level] = levels.includes(level);
      });
      return acc;
    }
    const newLevels: Option<level> = {} as Option<level>;
    this.getTablesIntersection(this.existedLevels, getLevels(subject)).forEach((level) => {
      newLevels[level as level] = false;
    });
    return newLevels;
  };

  getTypeFromParams() {
    const { type } = this.params;
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
  }

  getDateOrderFromParams() {
    const { dateOrder } = this.params;
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
  }

  getStartDateFromParams() {
    const { startDate } = this.params;
    if (startDate) {
      return new window.Date(startDate);
    }
    return null;
  }

  getEndDateFromParams() {
    const { endDate } = this.params;
    if (endDate) {
      return new window.Date(endDate);
    }
    return null;
  }

  resetType = (setQuestionTypes: Dispatch<SetStateAction<TypeOptions>>) => {
    setQuestionTypes({
      "Avec réponse": false,
      "Sans réponse": false,
    });
  };

  resetSubjects = (setSubjects: Dispatch<SetStateAction<Option<subject>>>) => {
    const newSubjects: Option<subject> = {} as Option<subject>;
    subjectOptions.forEach((subject) => {
      newSubjects[subject.label] = false;
    });
    setSubjects(newSubjects);
  };

  resetLevels = (setLevels: Dispatch<SetStateAction<Option<level>>>, subject: subject) => {
    const newLevels: Option<level> = {} as Option<level>;
    this.getTablesIntersection(this.existedLevels, getLevels(subject)).forEach((level) => {
      newLevels[level as level] = false;
    });
    setLevels(newLevels);
  };

  resetDateOrder = (setDateOrder: SetDateOrder) => {
    setDateOrder({
      asc: false,
      desc: false,
    });
  };

  resetDate = (setStartDate: SetStartDate, setEndDate: SetEndDate) => {
    setStartDate(null);
    setEndDate(null);
  };

  resetAll: ResetAll = (
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
}

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
