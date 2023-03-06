export type subject = "Mathématique" | "Anglais" | "Science" | "Physique";
export type level = "1ére année" | "2éme année" | "3éme année" | "4éme année";

export type URLParams = {
  type?: "answered" | "unanswered";
  subjects?: subject[];
  levels?: level[];
  dateOrder?: "asc" | "desc";
  startDate?: string;
  endDate?: string;
};

export type Question = {
  id: string;
  title: string;
  description: string;
  answered: boolean;
  subject: subject;
};

// ==============================
// =========== API ==============
// ==============================

export type AddCommentBody = {
  questionId: string | null;
  text: string;
  answerId: string | null;
  studentId: string | null;
  teacherId: string | null;
};

export type Comment = {
  id: string;
  text: string;
  createdAt: string;
  lastUpdatedAt: string;
  teacher: { firstName: string; lastName: string; photo: string } | null;
  student: { firstName: string; lastName: string; photo: string } | null;
};

export type Answer = {
  id: string;
  description: string;
  createdAt: string;
  lastUpdatedAt: string;
  comments: Comment[];
  teacher: {
    id: string;
    firstName: string;
    lastName: string;
    photo: string;
  };
};

export type GetQuestionResponse = {
  id: string;
  studentId: string;
  question: string;
  description: string;
  subject: subject;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
  answers: Answer[];
};
