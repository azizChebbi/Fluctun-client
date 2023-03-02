import React, { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import calendarSvg from "@icons/calendar.svg";

import "react-datepicker/dist/react-datepicker.css";

function CalendarIcon({ className }: { className?: string }) {
  return (
    <div
      className={` flex items-center justify-center z-20 px-3 border-l border-[#B4B4B4] transform -translate-x-full ${className}`}
    >
      <img src={calendarSvg} />
    </div>
  );
}

interface IProps {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  setEndDate: Dispatch<SetStateAction<Date | null>>;
}

const Date: FC<IProps> = ({ startDate, endDate, setEndDate, setStartDate }) => {
  return (
    <div className=" my-3">
      <div className="relative flex justify-center mb-3">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Date de début"
          className={` ${
            startDate
              ? "text-blue border-blue"
              : "text-[#B4B4B4] border-[#B4B4B4]"
          } border  rounded  p-3 pr-12 w-full tracking-widest`}
        />
        <CalendarIcon />
      </div>
      <div className="relative flex justify-center">
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Date de fin"
          minDate={startDate}
          className={` ${
            endDate
              ? "text-blue border-blue"
              : "text-[#B4B4B4] border-[#B4B4B4]"
          } border  rounded  p-3 pr-12 w-full tracking-widest`}
        />
        <CalendarIcon />
      </div>
    </div>
  );
};

export default Date;
