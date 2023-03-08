import React, { FC, SetStateAction } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import {
  DateOrderOptions,
  LevelsOptions,
  SubjectsOptions,
  TypeOptions,
} from "@utils/filter";
import FilterAccordian from "@atoms/FilterAccordian";
import CheckOptions from "@atoms/CheckOptions";
import usePayload from "@hooks/usePayload";
import refresh from "@icons/refresh.svg";
import Date from "./Date";

interface IProps {
  questionTypes: TypeOptions;
  setQuestionTypes: React.Dispatch<SetStateAction<TypeOptions>>;
  subjects: SubjectsOptions;
  setSubjects: React.Dispatch<SetStateAction<SubjectsOptions>>;
  levels: LevelsOptions;
  setLevels: React.Dispatch<SetStateAction<LevelsOptions>>;
  startDate: Date | null;
  setStartDate: React.Dispatch<SetStateAction<Date | null>>;
  endDate: Date | null;
  setEndDate: React.Dispatch<SetStateAction<Date | null>>;
  dateOrder: DateOrderOptions;
  setDateOrder: React.Dispatch<SetStateAction<DateOrderOptions>>;
  handleFilter: () => void;
  handleReset: () => void;
  isLoading: boolean;
}

const FilterUI: FC<IProps> = ({
  questionTypes,
  setQuestionTypes,
  subjects,
  setSubjects,
  levels,
  setLevels,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  dateOrder,
  setDateOrder,
  handleFilter,
  handleReset,
  isLoading,
}) => {
  const { role } = usePayload();
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
          disabled={isLoading}
        >
          {isLoading ? (
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

export default FilterUI;
