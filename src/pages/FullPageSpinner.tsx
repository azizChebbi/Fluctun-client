import React from "react";
import ClimbingBoxLoaderfrom from "react-spinners/ClimbingBoxLoader";

const FullPageSpinner = () => {
  return (
    <div className=" absolute top-0 right-0 z-30 flex h-screen h-screen w-screen w-full items-center justify-center">
      <ClimbingBoxLoaderfrom color={"#142B33"} size={30} />
    </div>
  );
};

export default FullPageSpinner;
