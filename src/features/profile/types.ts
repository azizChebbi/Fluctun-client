// import { level } from "@features/questions/types";
import { level, subject } from "@utils/options";

export type Student = {
  bio: string;
  code: string;
  dateOfBirth: Date;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  number: number;
  level: level;
  photo: string;
  address: string;
  createdAt: string;
  lastUpdatedAt: string;
};

export type Teacher = {
  id: string;
  email: string;
  cin: string;
  firstName: string;
  lastName: string;
  number: number;
  dateOfBirth: string;
  bio: string;
  subject: subject;
  photo: string;
  address: string;
  createdAt: string;
  lastUpdatedAt: string;
};
