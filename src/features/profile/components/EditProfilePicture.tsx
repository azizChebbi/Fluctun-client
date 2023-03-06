import React, { Dispatch, FC, SetStateAction, useRef } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import SecurityUpdateGoodIcon from "@mui/icons-material/SecurityUpdateGood";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation } from "react-query";
import ClipLoader from "react-spinners/ClipLoader";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import { queryClient } from "@context/index";

interface IProps {
  photo?: string;
  setEditMode: Dispatch<SetStateAction<boolean>>;
}

const EditProfilePicture: FC<IProps> = ({ photo, setEditMode }) => {
  const updateMutation = useMutation(
    (formData: any) => api.post("/profile/update-image", formData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("student");
        setEditMode(false);
      },
      onError: () => {
        notifyError("Un erreur s'est produite");
      },
    }
  );

  const deleteMutation = useMutation(
    () => api.delete("/profile/delete-image"),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("student");
        setEditMode(false);
      },
      onError: () => {
        notifyError("Un erreur s'est produite");
      },
    }
  );

  const [img, setImg] = React.useState<any>(photo);
  const ipt = useRef<any>();
  const handleDelete = () => {
    deleteMutation.mutate();
  };
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("image", ipt.current.files[0]);
    updateMutation.mutate(formData);
  };
  const handleChange = () => {
    if (ipt.current.files[0].type.includes("image")) {
      setImg(URL.createObjectURL(ipt.current.files[0]));
    }
  };
  return (
    <div>
      <div className=" my-12">
        <div className=" m-auto w-max overflow-hidden rounded-[50%]">
          <img
            src={
              img ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmatBzkPfadV3gbygHddFgNYbNzBbINaWqFamNP3zOCJyY-EZzJJZW3SjSpeYSGfSlsgI&usqp=CAU"
            }
            className=" aspect-square w-44 object-cover md:w-60"
          />
        </div>
        <div className=" py-3 md:py-6">
          <label
            htmlFor="inputFile"
            className=" m-auto flex w-max cursor-pointer  items-center justify-center  gap-1 rounded bg-blue py-2 px-4 text-sm text-white md:py-3 md:px-6 md:text-base"
          >
            <UploadIcon sx={{ color: "white" }} />
            Changer le photo
            <input
              id="inputFile"
              type={"file"}
              className=" hidden"
              ref={ipt}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
      <div className=" flex items-center justify-between border-t border-[#E2E2E2] py-4 px-8 md:py-6 md:px-16 md:text-lg">
        {updateMutation.isLoading ? (
          <ClipLoader color="#142B33" size={28} />
        ) : (
          <button
            disabled={!ipt.current?.files[0]}
            onClick={handleUpload}
            className={`flex flex-col items-center justify-center gap-y-1 ${
              !ipt.current?.files[0] && "cursor-not-allowed opacity-50"
            }
        `}
          >
            <SecurityUpdateGoodIcon
              fontSize="large"
              sx={{ color: "#142B33" }}
            />
            <p className="text-sm font-medium text-blue">Mettre à jour</p>
          </button>
        )}
        {deleteMutation.isLoading ? (
          <ClipLoader color="#142B33" size={28} />
        ) : (
          <button
            onClick={handleDelete}
            className=" flex flex-col items-center justify-center gap-y-1"
          >
            <DeleteOutlineIcon fontSize="large" sx={{ color: "#142B33" }} />
            <p className="text-sm font-medium text-blue">Supprimer</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default EditProfilePicture;
