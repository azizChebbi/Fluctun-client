import React, { FC } from "react";
import Select from "react-select";

export interface Option {
  label: string;
  value: string;
}

interface IProps {
  options: Option[];
  className?: string;
  placeholder?: string;
  isMulti?: boolean;
  controlStyle?: any;
  onChange?: (e: any) => void;
}

const SelectOption: FC<IProps> = ({
  options,
  className,
  onChange,
  controlStyle,
  ...props
}) => {
  const customStyles = {
    option: (defaultStyles: any, state: any) => ({
      ...defaultStyles,
      color: state.isSelected ? "#000" : "#667085",
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      boxShadow: "none",
      ...controlStyle,
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#000" }),
  };
  return (
    <Select
      components={{
        IndicatorSeparator: () => null,
      }}
      menuPlacement="auto"
      options={options}
      styles={customStyles}
      {...props}
      onChange={onChange}
      className={` ${className}`}
    />
  );
};

export default SelectOption;
