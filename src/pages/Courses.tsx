import React from "react";
import CourseAccordian from "@features/courses/components/CourseAccordian";
import useStudent from "@hooks/useStudent";
import { getSubjects } from "@utils/options";

const Courses = () => {
  const student = useStudent();
  const subjects = getSubjects(student?.level);
  return (
    <div className=" my-32">
      <div className=" rounded border border-[#E2E2E2] bg-white p-4">
        {subjects.map((subject) => (
          <div key={subject} className=" my-4">
            <CourseAccordian title={subject}></CourseAccordian>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
