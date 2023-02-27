import React, { FC, ReactNode } from "react";

interface IProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const AskSection: FC<IProps> = ({ title, description, children }) => {
  return (
    <div className=" bg-[#FCFCFC] border-[#C5C5C5] border p-4 mb-6">
      <p className=" text-lg sm:text-xl font-medium">{title}</p>
      <p className=" text-sm font-light mt-2">{description}</p>
      <div>{children}</div>
    </div>
  );
};

export default AskSection;
