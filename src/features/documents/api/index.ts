import { api } from "@api/index";
import { level, subject } from "@utils/options";

export type Document = {
  id: string;
  title: string;
  url: string;
  size: number;
  type: "";
  levels: level[];
  createdAt: string;
  lastUpdatedAt: string;
  teacher?: {
    teacherId: string;
    firstName: string;
    lastName: string;
    subject: subject;
  };
};

export type GetLevelsResponse = { data: level[] };
export type GetSubjectsResponse = { data: subject[] };

export const getExistingLevels = (): Promise<GetLevelsResponse> => {
  return api.get("/documents/levels");
};

export const getExistingSubjects = (): Promise<GetSubjectsResponse> => {
  return api.get("/documents/subjects");
};

export const getTeacherDocuments = (): Promise<{ data: Document[] }> => {
  return api.get("/documents/teacher-documents");
};

export const getStudentDocuments = (): Promise<{ data: Document[] }> => {
  return api.get("/documents/student-documents");
};
