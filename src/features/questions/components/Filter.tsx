import React, { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import useUrlState from "@ahooksjs/use-url-state";
import { useMutation } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import {
  questionTypeObject,
  dateOrderObject,
  subjectsObject,
  levelsObject,
  synonyms,
  reverseSynonyms,
} from "@utils/filter";
import FilterAccordian from "@atoms/FilterAccordian";
import CheckOptions from "@atoms/CheckOptions";
import useExistedSubjetcs from "@hooks/useExistedSubjetcs";
import useExistedLevels from "@hooks/useExistedLevels";
import useRole from "@hooks/useRole";
import refresh from "@icons/refresh.svg";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import Date from "./Date";
import { Question } from "../types";

// =================================================
// ================= 2 WAYS BINDING ================
// =================================================

const generateObjectFromArrayOfStrings = (array: string[], value?: boolean) => {
  const object: Record<string, boolean> = {};
  array.forEach((key) => {
    object[key] = !!value;
  });
  return object;
};

// =========================VS====================

export const generateArrayOfStringsFromObject = (object: Record<string, boolean>) => {
  const array = [];
  for (const key in object) if (object[key]) array.push(reverseSynonyms[key] || key);
  return array;
};

// =================================================
// =================== END =========================
// =================================================

const getOptions = (value: string | string[], object: Record<string, boolean>, initialState: any): any => {
  if (!value) return initialState;
  value = synonyms[value as string] || value;
  if (Array.isArray(value)) {
    const newObject = generateObjectFromArrayOfStrings(value, true);
    return { ...object, ...newObject };
  } else {
    return { ...object, [value]: true };
  }
};

interface IProps {
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Filter: FC<IProps> = ({ setQuestions, setIsLoading }) => {
  const [params, setParams] = useUrlState(
    {
      type: undefined,
      subjects: undefined,
      levels: undefined,
      dateOrder: undefined,
      startDate: undefined,
      endDate: undefined,
    },
    {
      parseOptions: {
        arrayFormat: "comma",
      },
      stringifyOptions: {
        arrayFormat: "comma",
      },
    }
  );
  const [type, setType] = useState(questionTypeObject);
  const [subjects, setSubjects] = useState(subjectsObject);
  const [levels, setLevels] = useState(levelsObject);
  const [dateOrder, setDateOrder] = useState(dateOrderObject);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const existedSubjects = useExistedSubjetcs();
  const existedLevels = useExistedLevels();
  const role = useRole();

  useEffect(() => {
    const { type, subjects, levels, dateOrder, startDate, endDate } = params;
    console.log(params);
    setType((prev) => getOptions(type, prev, questionTypeObject));
    setSubjects((prev) => getOptions(subjects, prev, generateObjectFromArrayOfStrings(existedSubjects || [])));
    setLevels((prev) => getOptions(levels, prev, generateObjectFromArrayOfStrings(existedLevels || [])));
    setDateOrder((prev) => getOptions(dateOrder, prev, dateOrderObject));
    setStartDate(startDate ? new window.Date(startDate) : null);
    setEndDate(endDate ? new window.Date(endDate) : null);
  }, [params]);

  useEffect(() => {
    filterMuation.mutate(params);
  }, []);

  useEffect(() => {
    const object = generateObjectFromArrayOfStrings(existedSubjects || [], false);
    setSubjects(getOptions(params.subjects, object, object));
  }, [existedSubjects]);

  useEffect(() => {
    const object = generateObjectFromArrayOfStrings(existedLevels || [], false);
    setLevels(getOptions(params.levels, object, object));
  }, [existedLevels]);

  const filterMuation = useMutation((params: any) => api.get("/questions", { params }), {
    onSuccess: (data) => {
      setQuestions(data.data);
      setIsLoading(false);
    },
    onError: () => {
      notifyError("Une erreur est survenue");
    },
  });

  const handleFilter = () => {
    filterMuation.mutate(params);
  };

  const handleReset = () => {
    setParams(() => {
      const newParams = {
        type: undefined,
        subjects: undefined,
        levels: undefined,
        dateOrder: undefined,
        startDate: undefined,
        endDate: undefined,
      };
      filterMuation.mutate(newParams);
      return newParams;
    });
  };

  return (
    <div className=" pb-12">
      <p className=" my-12 text-center text-base text-orange underline underline-offset-1 md:text-xl">Les filtres</p>
      <div>
        <FilterAccordian title="Type" isExpanded>
          <CheckOptions state={type} setState={setType} setParams={setParams} query={"type"} />
        </FilterAccordian>
        {role == "student" && (
          <FilterAccordian title="Les Matiéres" isExpanded>
            <CheckOptions state={subjects} setState={setSubjects} setParams={setParams} query={"subjects"} isMultiple />
          </FilterAccordian>
        )}
        {role == "teacher" && (
          <FilterAccordian title="Les Niveaux" isExpanded>
            <CheckOptions state={levels} setState={setLevels} setParams={setParams} query={"levels"} isMultiple />
          </FilterAccordian>
        )}
        <FilterAccordian title="Date" isExpanded>
          <Date
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            setParams={setParams}
          />
          <CheckOptions state={dateOrder} setState={setDateOrder} setParams={setParams} query={"dateOrder"} />
        </FilterAccordian>
        <button
          type="button"
          onClick={handleFilter}
          className=" flex h-20 w-full items-center justify-center border-y border-[#E2E2E2] bg-[#FFF4F2] text-base font-medium text-orange md:text-lg "
          disabled={filterMuation.isLoading}
        >
          {filterMuation.isLoading ? <ClipLoader color="#F68E79" size="25px" /> : <p>Appliquer les filtres</p>}
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
