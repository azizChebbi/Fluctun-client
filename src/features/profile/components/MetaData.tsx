import React, { FC } from "react";

interface IProps {
  children?: React.ReactNode;
  Icon?: any;
}

const MetaData: FC<IProps> = ({ children, Icon }) => {
  return (
    <div className=" my-4 flex items-center gap-3">
      <Icon
        sx={{
          color: "#142B33",
        }}
      />
      <p className=" text-blue md:text-lg">{children}</p>
    </div>
  );
};

export default MetaData;
