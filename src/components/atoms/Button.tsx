import React, { FC, ReactNode } from "react";

interface IProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children?: ReactNode;
  color?: string;
  outlined?: boolean;
}

const Button: FC<IProps> = ({
  children,
  color,
  className,
  disabled,
  outlined,
  ...props
}) => {
  return (
    <button
      style={{
        color: outlined ? color || "#142B33" : "white",
        background: disabled
          ? "#9CA3AF"
          : outlined
          ? "white"
          : color || "#142B33",
        borderColor: disabled ? "#9CA3AF" : color || "#142B33",
      }}
      className={` border-[1px]
    text-base font-semibold py-3 px-8 text-center outline-none ${
      disabled ? "cursor-not-allowed bg-gray-400" : ""
    } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
