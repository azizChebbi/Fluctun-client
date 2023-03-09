import { useState } from "react";
import { useQuery } from "react-query";
import { Teacher } from "@features/profile/types";
import { api } from "@api/index";
import usePayload from "./usePayload";

const useTeacher = () => {
  const { role, id } = usePayload();
  const [teacher, setTeacher] = useState<Teacher | null>();
  if (role == "student") return null;
  useQuery(["teacher", id], () => api.get("/profile/" + id), {
    onSuccess: (data) => {
      setTeacher(data.data);
    },
  });
  return teacher;
};

export default useTeacher;
