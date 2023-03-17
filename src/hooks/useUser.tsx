import { useState } from "react";
import { useQuery } from "react-query";
import { Student, Teacher } from "@features/profile/types";
import { api } from "@api/index";
import usePayload from "./usePayload";

const useUser = () => {
  const { role, id } = usePayload();
  const [user, setUser] = useState<Teacher | Student | null>();
  useQuery(role, () => api.get("/profile/" + id), {
    onSuccess: (data) => {
      setUser(data.data);
    },
  });
  return user;
};

export default useUser;
