import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const Date = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new (window.Date as any)("2014/02/08")
  );
  const [endDate, setEndDate] = useState(
    new (window.Date as any)("2014/02/10")
  );
  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={startDate}
        endDate={endDate}
      />
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
      />
    </>
  );
};

export default Date;
