import React, { Dispatch, FC, SetStateAction, useState } from "react";
import CakeIcon from "@mui/icons-material/Cake";
// import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import DatePicker from "react-datepicker";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useMutation } from "react-query";
import Input from "@atoms/Input";
import useRole from "@hooks/useRole";
import Button from "@atoms/Button";
import ErrorMessage from "@atoms/ErrorMessage";
import { api } from "@api/index";
import { notifyError, notifySuccess } from "@utils/notify";
import { queryClient } from "@context/index";

interface IProps {
  setEditMode: Dispatch<SetStateAction<boolean>>;
  bio?: string;
  birthDate?: Date | null;
  address?: string;
  phone?: number;
}

const EditProfileForm: FC<IProps> = (props) => {
  const [bio, setBio] = React.useState<string>(props.bio || "");
  const [birthDate, setBirthDate] = React.useState<Date | null>(
    props.birthDate || null
  );
  const [address, setAddress] = React.useState(props.address || "");
  const [phone, setPhone] = React.useState(props.phone?.toString() || "");
  const [error, setError] = useState("");

  const role = useRole();

  const updateProfileMutation = useMutation(
    (data: any) => api.put("/profile/" + role, data),
    {
      onSuccess: () => {
        notifySuccess("Profile mis à jour avec succès");
        queryClient.invalidateQueries("student");
        queryClient.invalidateQueries("teacher");
        props.setEditMode(false);
      },
      onError: () => {
        notifyError(
          "Une erreur est survenue lors de la mise à jour du profile. Veuillez réessayer ultérieurement."
        );
      },
    }
  );

  function containsOnlyNumbers(str: string) {
    return /^\d+$/.test(str);
  }
  const isValidate = () => {
    if (phone.length == 0) {
      return true;
    } else {
      // check if phone contain only digits and the start digit is not zero using regex
      if (!containsOnlyNumbers(phone)) {
        setError("Téléphone doit contenir que des chiffres");
        return false;
      }
      if (phone.length < 8 || phone.length > 8) {
        setError("Téléphone doit contenir 8 chiffres");
        return false;
      }
      if (phone[0] == "0") {
        setError("Le premier chiffre ne doit pas étre égale à 0");
        return false;
      }
      setError("");
      return true;
    }
  };

  const handleUpdate = () => {
    if (isValidate()) {
      const data =
        role == "student"
          ? {
              bio,
              dateOfBirth: birthDate,
              address,
              number: phone.length == 0 ? null : parseInt(phone, 10),
            }
          : {
              bio,
              dateOfBirth: birthDate,
              address,
            };
      updateProfileMutation.mutate(data);
    }
  };
  return (
    <div>
      <form className=" p-6 pb-12">
        <div className=" my-3">
          <p className=" mb-1 ml-1 font-medium text-blue md:mb-2 md:text-lg ">
            Description - Bio:
          </p>
          <textarea
            placeholder=" Décrire votre description"
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="ipt "
          />
        </div>
        {/* // ================================== */}
        {/* // ============ DATE DE NAISSANCE ==== */}
        <div className=" my-6">
          <p className=" mb-1 ml-1 font-medium text-blue md:mb-2 md:text-lg ">
            Date de naissance:
          </p>
          <div className=" flex items-center rounded border border-[#E2E2E2]">
            <DatePicker
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              selectsStart
              startDate={birthDate}
              placeholderText="Date de naissance"
              className={` ${
                birthDate ? " text-blue" : " text-[#B4B4B4]"
              } w-full  border-0  border border-r  border-[#E2E2E2] p-3 text-base md:text-xl`}
            />
            <CakeIcon sx={{ margin: "5px 15px", color: "#AEAEAE" }} />
          </div>
        </div>
        {/* // ================================== */}
        {/* // ============ ADDRESS ============= */}
        <div className=" my-6">
          <p className=" mb-1 ml-1 font-medium text-blue md:mb-2 md:text-lg ">
            Adresse:
          </p>
          <div className=" flex items-center rounded border border-[#E2E2E2]">
            <Input
              placeholder="Adresse"
              className=" rounded-none border-0 border-r"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <LocationOnIcon sx={{ margin: "5px 15px", color: "#AEAEAE" }} />
          </div>
        </div>

        {/* // ================================== */}
        {/* // ============ Téléphone ======== */}
        {role == "student" && (
          <div className=" my-6">
            <p className=" mb-1 ml-1 font-medium text-blue md:mb-2 md:text-lg ">
              Téléphone:
            </p>
            <div className=" flex items-center rounded border border-[#E2E2E2]">
              <Input
                placeholder="Téléphone"
                className=" rounded-none border-0 border-r"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <PhoneIcon sx={{ margin: "5px 15px", color: "#AEAEAE" }} />
            </div>
            <ErrorMessage>{error}</ErrorMessage>
          </div>
        )}
      </form>
      <div className=" border-t border-[#E2E2E2] py-3 pr-6 text-right">
        <Button
          isLoading={updateProfileMutation.isLoading}
          className=" rounded py-3 px-6 md:text-lg"
          onClick={handleUpdate}
        >
          Mise à jour
        </Button>
      </div>
    </div>
  );
};

export default EditProfileForm;
