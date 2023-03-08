import { useState } from "react";
import { useQuery } from "react-query";
import { subject } from "@utils/options";
import { api } from "@api/index";
import usePayload from "./usePayload";

const useExistedSubjetcs = () => {
  const payload = usePayload();
  if (payload.role == "teacher") return null;
  const [subjects, setSubjects] = useState<subject[]>([]);
  useQuery("subjects", () => api.get("/documents/subjects"), {
    onSuccess: (data) => {
      setSubjects(data.data);
    },
  });

  return subjects;
};

export default useExistedSubjetcs;
