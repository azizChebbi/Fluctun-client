import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getLevels, level } from "@utils/options";
import { getTablesIntersection } from "@utils/filter";
import { DocumentType } from "@utils/documentsType";
import useTeacher from "@hooks/useTeacher";
import useExistedLevels from "@hooks/useExistedLevels";
import CourseAccordian from "./CourseAccordian";
import AddDocument from "./AddDocument";
import Document from "./Document";
import { getTeacherDocuments, Document as TypeDocument } from "../api";

const getDocumentType = (type: string): DocumentType => {
  const typeArray = type.split("/");
  return typeArray[typeArray.length - 1] as DocumentType;
};

const TeacherDocuments = () => {
  const [levels, setLevels] = useState<level[]>([]);
  const [documents, setDocuments] = useState<TypeDocument[]>([]);
  const teacher = useTeacher();
  const existedLevels = useExistedLevels();

  useQuery("teacher-documents", getTeacherDocuments, {
    onSuccess: (data) => {
      setDocuments(() => [...data.data]);
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
  useEffect(() => {
    const existedStudentsLevels = existedLevels;
    const whichLevelsTeachThisSubject = getLevels(teacher?.subject);
    const intersectionLevels = getTablesIntersection(existedStudentsLevels || [], whichLevelsTeachThisSubject);
    setLevels([...(intersectionLevels as level[])]);
  }, [teacher, existedLevels]);
  return (
    <div>
      <AddDocument levels={levels} />
      <div className=" my-6 border-[#E2E2E2] md:border md:bg-white md:p-3 md:px-6">
        {levels.map((level) => (
          <div key={level} className=" my-4">
            <CourseAccordian title={level}>
              {documents
                .filter((document) => document.levels.includes(level))
                .map((document) => (
                  <div key={document.id} className=" border-b border-[#E2E2E2] p-3 py-4 md:p-8">
                    <Document
                      id={document.id}
                      title={document.title}
                      url={document.url}
                      type={getDocumentType(document.type)}
                      createdAt={document.createdAt}
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

export default TeacherDocuments;
