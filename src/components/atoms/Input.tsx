import { Tooltip } from "@mui/material";
import React, { FC, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  registration: Partial<UseFormRegisterReturn> | null;
}

const Input: FC<IProps> = ({
  placeholder,
  className,
  errorMessage,
  registration,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Tooltip
      title={errorMessage ? <p className=" text-sm">{errorMessage}</p> : null}
      arrow
      sx={{ fontSize: "20px" }}
    >
      <div className=" p-0 flex-1 relative">
        <input
          className={`ipt outline-none w-full ${
            errorMessage && " text-red-500 border-red-500"
          } ${className}`}
          placeholder={placeholder}
          type={showPassword ? "text" : type}
          {...props}
          {...registration}
        />
        {type == "password" && (
          <button
            className=" absolute top-[55%] right-4 -translate-y-1/2"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
            {/* <img src={eye} /> */}
          </button>
        )}
      </div>
    </Tooltip>
  );
};

export default Input;
