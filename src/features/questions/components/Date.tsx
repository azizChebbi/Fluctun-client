import React, { Dispatch, FC, SetStateAction } from "react";
import DatePicker from "react-datepicker";
import calendarSvg from "@icons/calendar.svg";

import "react-datepicker/dist/react-datepicker.css";

function CalendarIcon({ className }: { className?: string }) {
  return (
    <div
      className={` z-20 flex -translate-x-full transform items-center justify-center border-l border-[#B4B4B4] px-3 ${className}`}
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
  setParams: Dispatch<SetStateAction<any>>;
}

const Date: FC<IProps> = ({ startDate, endDate, setEndDate, setStartDate, setParams }) => {
  return (
    <div className=" my-3">
      <div className="relative mb-3 flex justify-center">
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            setParams((params: any) => ({ ...params, startDate: date || undefined }));
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Date de début"
          className={` ${
            startDate ? "border-blue text-blue" : "border-[#B4B4B4] text-[#B4B4B4]"
          } w-full  rounded  border p-3 pr-12 tracking-widest`}
        />
        <CalendarIcon />
      </div>
      <div className="relative flex justify-center">
        <DatePicker
          selected={endDate}
          onChange={(date) => {
            setEndDate(date);
            setParams((params: any) => ({ ...params, endDate: date || undefined }));
          }}
          selectsStart
          startDate={startDate}
          endDate={endDate}
          placeholderText="Date de fin"
          minDate={startDate}
          className={` ${
            endDate ? "border-blue text-blue" : "border-[#B4B4B4] text-[#B4B4B4]"
          } w-full  rounded  border p-3 pr-12 tracking-widest`}
        />
        <CalendarIcon />
      </div>
    </div>
  );
};

export default Date;
