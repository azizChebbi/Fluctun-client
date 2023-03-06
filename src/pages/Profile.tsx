import React from "react";
import { Link } from "react-router-dom";
import logoutSvg from "@icons/logout.svg";
import useRole from "@hooks/useRole";
import StudentProfile from "@features/profile/components/StudentProfile";
import TeacherProfile from "@features/profile/components/TeacherProfile";
import useMediaQuery from "@hooks/useMediaQuery";
import DesktopNavbar from "@organisms/DesktopNavbar";
import MobileNavbar from "@organisms/MobileNavbar";
import { useAuth } from "@context/auth";

const Profile = () => {
  const role = useRole();
  const matches = useMediaQuery("(min-width: 768px)");
  const { logout } = useAuth();

  return (
    <div className=" grid h-screen grid-cols-[1fr] overflow-hidden md:grid-rows-[100px_1fr]">
      {matches ? <DesktopNavbar /> : <MobileNavbar />}
      <div className=" overflow-scroll pt-24 md:pb-24 ">
        {role == "student" ? <StudentProfile /> : <TeacherProfile />}
        <div className=" my-6 pr-6 text-right md:m-auto md:mt-6 md:w-[80%] md:pr-0">
          <Link
            to="/logout"
            className="flex flex-row-reverse  items-center gap-2  text-lg text-[#A1A1A1] md:text-xl"
            onClick={logout}
          >
            Quitter
            <img src={logoutSvg} className=" w-6" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
