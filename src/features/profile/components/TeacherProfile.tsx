import React from "react";
import CakeIcon from "@mui/icons-material/Cake";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import editSvg from "@icons/edit.svg";
import DateFomratted from "@atoms/DateFomratted";
import profilePicture from "@images/profile.svg";
import useTeacher from "@hooks/useTeacher";
import MetaData from "./MetaData";
import ProfileQuestions from "./ProfileQuestions";
import ProfilePicture from "./ProfilePicture";
import HeadLine from "./HeadLine";
import Bio from "./Bio";
import EditWrapper from "./EditWrapper";
import EditProfileForm from "./EditProfileForm";

const TeacherProfile = () => {
  const [editMode, setEditMode] = React.useState(false);
  const teacher = useTeacher();
  return (
    <>
      <div className=" my-8 mx-2 md:m-auto md:w-[80%]">
        <div className=" relative h-28 w-full rounded border border-[#E2E2E2] bg-[#C3E6FF] md:h-48">
          <ProfilePicture photo={teacher?.photo || profilePicture} />
        </div>
        <div className=" relative rounded md:flex md:border md:border-t-0 md:border-[#E2E2E2] md:bg-white md:px-8">
          <div className=" z-20 -mt-4 rounded border border-[#E2E2E2] bg-white px-6 py-8 pt-0 md:mt-0 md:flex-1 md:border-l-0 md:border-t-0 md:border-b-0 md:pr-12">
            <div className=" relative py-8">
              <div className=" text-right">
                <button onClick={() => setEditMode(true)}>
                  <img src={editSvg} className=" md:w-10" />
                </button>
              </div>
            </div>
            <HeadLine
              name={teacher?.firstName + " " + teacher?.lastName}
              id={teacher?.cin}
              subject={teacher?.subject}
            />
            <div className=" text-blue">
              <Bio>{teacher?.bio}</Bio>
              <MetaData Icon={EmailIcon}>{teacher?.email}</MetaData>
              {teacher?.dateOfBirth && (
                <MetaData Icon={CakeIcon}>
                  <DateFomratted date={teacher?.dateOfBirth} />
                </MetaData>
              )}
              {teacher?.address && <MetaData Icon={LocationOnIcon}>{teacher.address}</MetaData>}
              {teacher?.number && <MetaData Icon={PhoneIcon}>{teacher?.number}</MetaData>}
            </div>
          </div>
          <div className=" bordr-[#E2E2E2] mt-4 rounded border bg-white px-6 py-8 md:w-[40%] md:border-none md:py-12">
            <ProfileQuestions />
          </div>
        </div>
      </div>
      {editMode && (
        <EditWrapper titre="Editer le profil" setEditMode={setEditMode}>
          <EditProfileForm
            setEditMode={setEditMode}
            bio={teacher?.bio}
            address={teacher?.address}
            phone={teacher?.number}
            birthDate={teacher?.dateOfBirth ? new window.Date(teacher.dateOfBirth) : null}
          />
        </EditWrapper>
      )}
    </>
  );
};

export default TeacherProfile;
