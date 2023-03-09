import { api } from "@api/index";
import { level } from "@utils/options";

export type GetLevelsResponse = { data: level[] };

export const getExistingLevels = (): Promise<GetLevelsResponse> => {
  return api.get("/documents/levels");
};
