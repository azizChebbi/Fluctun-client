import React, { Dispatch, FC, SetStateAction } from "react";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  children?: React.ReactNode;
  setEditMode: Dispatch<SetStateAction<boolean>>;
  titre: string;
}

const EditWrapper: FC<IProps> = ({ children, setEditMode, titre }) => {
  return (
    <div className=" fixed top-0 left-0 z-[1000] flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.6)]">
      <div className=" grid max-h-[80%] w-11/12 grid-rows-[50px_1fr] rounded border-[#E2E2E2] bg-[#FCFCFC] md:w-1/2">
        <div className=" flex items-center justify-between border-b border-[#E2E2E2] px-6">
          <p className=" md:text-lg">{titre}</p>
          <button onClick={() => setEditMode(false)}>
            <CloseIcon sx={{ color: "#142B33" }} />
          </button>
        </div>
        <div className=" overflow-scroll">{children}</div>
      </div>
    </div>
  );
};

export default EditWrapper;
