import React, { FC, ReactNode } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface IProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  children?: ReactNode;
  color?: string;
  outlined?: boolean;
  isLoading?: boolean;
}

const Button: FC<IProps> = ({ children, color, className, disabled, outlined, isLoading, ...props }) => {
  return (
    <>
      {isLoading ? (
        <ClipLoader color="#142B33" size={28} />
      ) : (
        <button
          style={{
            color: outlined ? color || "#142B33" : "white",
            background: disabled ? "#9CA3AF" : outlined ? "white" : color || "#142B33",
            borderColor: disabled ? "#9CA3AF" : color || "#142B33",
          }}
          className={` border-[1px]
      py-3 text-center text-base font-semibold outline-none ${
        disabled ? "cursor-not-allowed bg-gray-400" : ""
      } ${className}`}
          {...props}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
