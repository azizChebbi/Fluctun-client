import React from "react";
import ClimbingBoxLoaderfrom from "react-spinners/ClimbingBoxLoader";

const FullPageSpinner = () => {
  return (
    <div className=" flex items-center justify-center w-full h-screen">
      <ClimbingBoxLoaderfrom color={"#142B33"} size={30} />
    </div>
  );
};

export default FullPageSpinner;
