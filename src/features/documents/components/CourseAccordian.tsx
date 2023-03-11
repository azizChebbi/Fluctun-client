import React, { FC } from "react";

interface IProps {
  children?: React.ReactNode;
  title: string;
  isExpanded?: boolean;
}

const CourseAccordian: FC<IProps> = ({ children, title, isExpanded = false }) => {
  const [expanded, setExpanded] = React.useState(isExpanded);
  const handleClick = () => setExpanded(!expanded);
  return (
    <div>
      <div className=" cursor-pointer border border-[#C5C5C5] bg-white p-4 md:p-8" onClick={handleClick}>
        <p className=" text-blue md:text-xl">{title}</p>
      </div>
      {expanded && <div className=" border border-t-0 border-[#C5C5C5] ">{children}</div>}
    </div>
  );
};

export default CourseAccordian;
