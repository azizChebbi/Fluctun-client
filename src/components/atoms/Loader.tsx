import React, { FC, ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IProps {
  isLoading?: boolean;
  children?: ReactNode;
}

const Loader: FC<IProps> = ({ isLoading, children }) => {
  return (
    <div>{isLoading ? <ClipLoader color="#142B33" size={28} /> : children}</div>
  );
};

export default Loader;
