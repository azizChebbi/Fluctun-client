import { useState } from "react";
import { useQuery } from "react-query";
import { level } from "@utils/options";
import { api } from "@api/index";
import usePayload from "./usePayload";

const useExistedLevels = () => {
  const payload = usePayload();
  if (payload.role == "student") return null;
  const [levels, setLevels] = useState<level[]>([]);
  useQuery("levels", () => api.get("/documents/levels"), {
    onSuccess: (data) => {
      setLevels(data.data);
    },
  });

  return levels;
};

export default useExistedLevels;
