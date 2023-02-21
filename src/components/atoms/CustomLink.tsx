import React, { FC, ReactNode } from "react";
import { Link } from "react-router-dom";

interface IProps {
  to: string;
  children: ReactNode;
}

const CustomLink: FC<IProps> = ({ to, children }) => {
  return (
    <p className=" text-blue text-sm underline underline-offset-1 font-medium text-center mt-2">
      <Link to={to}>{children}</Link>
    </p>
  );
};

export default CustomLink;
