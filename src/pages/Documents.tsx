import React from "react";
import useRole from "@hooks/useRole";
import TeacherDocuments from "@features/documents/components/TeacherDocuments";
import StudentsDocuments from "@features/documents/components/StudentsDocuments";

const Courses = () => {
  const role = useRole();
  return (
    <div className=" my-32 h-full overflow-scroll md:my-0 md:mx-8">
      {role == "student" ? <StudentsDocuments /> : <TeacherDocuments />}
    </div>
  );
};

export default Courses;
