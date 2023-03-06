import React, { FC } from "react";

interface IProps {
  children?: React.ReactNode;
}

const Bio: FC<IProps> = ({ children }) => {
  if (!children) return null;
  return <p className=" my-8 text-sm text-[#2B2B2B] md:text-lg">{children}</p>;
};

export default Bio;
