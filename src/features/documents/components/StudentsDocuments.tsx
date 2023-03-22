import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getSubjects, subject } from "@utils/options";
import { DocumentType } from "@utils/documentsType";
import useStudent from "@hooks/useStudent";
import useExistedSubjetcs from "@hooks/useExistedSubjetcs";
import { getTablesIntersection } from "@pages/Ask";
import CourseAccordian from "./CourseAccordian";
import Document from "./Document";
import { getStudentDocuments, Document as TypeDocument } from "../api";

const getDocumentType = (type: string): DocumentType => {
  const typeArray = type.split("/");
  return typeArray[typeArray.length - 1] as DocumentType;
};

const StudentDocuments = () => {
  const [subjects, setSubjects] = useState<subject[]>([]);
  const [documents, setDocuments] = useState<TypeDocument[]>([]);
  const student = useStudent();
  const existedSubjects = useExistedSubjetcs();

  useQuery("student-documents", getStudentDocuments, {
    onSuccess: (data) => {
      setDocuments(() => [...data.data]);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    const existedLevelSubjects = existedSubjects;
    const whichSubjectsAreTeached = getSubjects(student?.level);
    const intersectionSubjects = getTablesIntersection(existedLevelSubjects || [], whichSubjectsAreTeached);
    setSubjects([...(intersectionSubjects as subject[])]);
  }, [student, existedSubjects]);
  return (
    <div>
      <div className=" my-6 border-[#E2E2E2] md:border md:bg-white md:p-3 md:px-6">
        {subjects.map((subject) => (
          <div key={subject} className=" my-4">
            <CourseAccordian title={subject}>
              {documents
                .filter((document) => document.teacher?.subject == subject)
                .map((document) => (
                  <div key={document.id} className=" border-b border-[#E2E2E2] p-3 py-4 md:p-8">
                    <Document
                      id={document.id}
                      title={document.title}
                      url={document.url}
                      type={getDocumentType(document.type)}
                      createdAt={document.createdAt}
                      teacherName={document.teacher?.firstName + " " + document.teacher?.lastName}
                    />
                  </div>
                ))}
            </CourseAccordian>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentDocuments;
