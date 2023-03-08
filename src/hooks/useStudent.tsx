import { useState } from "react";
import { useQuery } from "react-query";
import { Student } from "@features/profile/types";
import { api } from "@api/index";
import usePayload from "./usePayload";

const useStudent = () => {
  const { role, id } = usePayload();
  const [student, setStudent] = useState<Student | null>();
  if (role == "teacher") return null;
  useQuery(["student", id], () => api.get("/profile/" + id), {
    onSuccess: (data) => {
      setStudent(data.data);
    },
  });
  return student;
};

export default useStudent;
