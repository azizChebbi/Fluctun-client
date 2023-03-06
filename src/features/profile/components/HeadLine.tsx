import React, { FC } from "react";

interface IProps {
  name: string;
  id?: string;
  cin?: string;
  level?: string;
  subject?: string;
}

const HeadLine: FC<IProps> = ({ name, id, cin, level, subject }) => {
  return (
    <div className=" flex items-center justify-between">
      <div>
        <p className=" text-xl font-medium text-blue md:mb-1 md:text-2xl">
          {name}
        </p>
        <p className=" text-sm font-light text-[#B3B3B3] md:text-base ">
          {id ? `ID: ${id}` : `CIN: ${cin}`}
        </p>
      </div>
      <p className=" text-sm text-blue md:text-base">
        {level ? level : subject}
      </p>
    </div>
  );
};

export default HeadLine;
