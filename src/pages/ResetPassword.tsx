import React from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const params = useParams();
  console.log(params);
  return <div>reset password</div>;
};

export default ResetPassword;
