import React, { FC, ReactNode } from "react";

interface IProps {
  title: string;
  description: string;
  children?: ReactNode;
}

const AskSection: FC<IProps> = ({ title, description, children }) => {
  return (
    <div className=" mb-6 border border-[#C5C5C5] bg-[#FCFCFC] p-4">
      <p className=" text-lg font-medium sm:text-xl">{title}</p>
      <p className=" my-2 text-sm font-light">{description}</p>
      <div>{children}</div>
    </div>
  );
};

export default AskSection;
