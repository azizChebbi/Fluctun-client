import React, { FC, useState } from "react";
import profileImg from "@images/profile.png";
import EditWrapper from "./EditWrapper";
import EditProfilePicture from "./EditProfilePicture";

interface IProps {
  photo: string | undefined;
}

const ProfilePicture: FC<IProps> = ({ photo }) => {
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      <div
        className="absolute left-6 top-full z-[50] w-max -translate-y-1/2 transform  cursor-pointer rounded-[50%] bg-white p-2"
        onClick={() => setEditMode(true)}
      >
        <div className=" w-max overflow-hidden rounded-[50%]">
          <img
            src={photo || profileImg}
            className=" h-28 w-28 object-cover md:h-40 md:w-40"
          />
        </div>
      </div>
      {editMode && (
        <EditWrapper
          titre="Changer votre photo de profil"
          setEditMode={setEditMode}
        >
          <EditProfilePicture photo={photo} setEditMode={setEditMode} />
        </EditWrapper>
      )}
    </>
  );
};

export default ProfilePicture;
