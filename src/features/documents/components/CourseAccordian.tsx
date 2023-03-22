import React, { FC } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

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
      <div
        className=" flex cursor-pointer items-center justify-between border border-[#C5C5C5] bg-white p-4 md:p-8"
        onClick={handleClick}
      >
        <p className=" text-blue md:text-xl">{title}</p>
        {expanded ? <KeyboardArrowDownIcon /> : <ChevronRightIcon />}
      </div>
      {expanded && <div className=" border border-t-0 border-[#C5C5C5] ">{children}</div>}
    </div>
  );
};

export default CourseAccordian;
