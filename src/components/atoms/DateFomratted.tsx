import React, { FC } from "react";
import Moment from "react-moment";

interface IProps {
  date: any;
}

const DateFomratted: FC<IProps> = ({ date }) => {
  return <Moment format="DD/MM/YYYY">{date}</Moment>;
};

export default DateFomratted;
