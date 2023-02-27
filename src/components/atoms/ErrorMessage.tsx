import React, { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const ErrorMessage: FC<IProps> = ({ children }) => {
  return (
    <p className=" text-red-500 text-xs sm:text-sm mt-2 ml-2">{children}</p>
  );
};

export default ErrorMessage;
