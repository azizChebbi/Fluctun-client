import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import useTeacher from "@hooks/useTeacher";
import { getLevels, level } from "@utils/options";
import { getTablesIntersection } from "@utils/filter";
import CourseAccordian from "./CourseAccordian";
import AddDocument from "./AddDocument";
import { getExistingLevels } from "../api";

const TeacherDocuments = () => {
  const [levels, setLevels] = useState<level[]>([]);
  const teacher = useTeacher();
  const levelsQuery = useQuery("levels", getExistingLevels);
  useEffect(() => {
    const existedStudentsLevels = levelsQuery?.data?.data;
    const whichLevelsTeachThisSubject = getLevels(teacher?.subject);
    const intersectionLevels = getTablesIntersection(existedStudentsLevels || [], whichLevelsTeachThisSubject);
    setLevels([...(intersectionLevels as level[])]);
  }, [teacher, levelsQuery.isSuccess]);
  return (
    <div>
      <AddDocument levels={levels} />
      <div className=" my-6 border-[#E2E2E2] md:border md:bg-white md:p-3 md:px-6">
        {levels.map((level) => (
          <div key={level} className=" my-4">
            <CourseAccordian title={level}></CourseAccordian>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDocuments;
