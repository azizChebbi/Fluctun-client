import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@atoms/Button";

const Back = () => {
  const navigate = useNavigate();
  return (
    <Button outlined className=" flex items-center gap-2 border-none" onClick={() => navigate(-1)}>
      <ArrowBackIcon sx={{ color: "#142B33" }} />
      Back
    </Button>
  );
};

export default Back;
