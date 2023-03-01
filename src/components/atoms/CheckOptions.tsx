import React, { Dispatch, FC, SetStateAction } from "react";
import Checkbox from "@mui/material/Checkbox";

interface IProps {
  state: any;
  setState: Dispatch<SetStateAction<any>>;
  isMultiple?: boolean;
}

const CheckOptions: FC<IProps> = ({ state, setState, isMultiple }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: any) => {
      const newState = prev;
      if (!isMultiple) {
        Object.keys(newState).forEach((key) => (newState[key] = false));
      }
      return {
        ...newState,
        [event.target.name]: event.target.checked,
      };
    });
  };

  return (
    <div>
      {Object.entries(state).map(([key, value]) => {
        return (
          <div className="flex items-center gap-2" key={key}>
            <Checkbox
              checked={value as boolean}
              onChange={handleChange}
              name={key}
              sx={{
                color: "#AFAFAF",
                "&.Mui-checked": {
                  color: "#F68E79",
                },
                "& .MuiSvgIcon-root": { fontSize: 20 },
              }}
            />
            <p className=" text-[#868686] text-lg">{key}</p>
          </div>
        );
      })}
    </div>
  );
};

export default CheckOptions;
