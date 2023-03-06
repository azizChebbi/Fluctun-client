import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

const QuestionSkeleton = () => {
  return (
    <Stack spacing={1} className=" my-16">
      <Skeleton variant="rectangular" height={50} />
      <Skeleton variant="rectangular" height={120} />
    </Stack>
  );
};

export default QuestionSkeleton;
