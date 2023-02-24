import React, { FC, ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const AuthScreenFormWrapper: FC<IProps> = ({ children }) => {
  return (
    <div className=" text-center w-full sm:w-1/2 md:w-1/3 m-auto mt-10 py-16 sm:py-20 px-16 sm:border-2 border-g300 rounded-xl">
      {children}
    </div>
  );
};

export default AuthScreenFormWrapper;
