import React, { FC } from "react";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "@mui/material/Modal";
import { useMutation } from "react-query";
import { DocumentType } from "@utils/documentsType";
import Button from "@atoms/Button";
import { api } from "@api/index";
import { notifyError } from "@utils/notify";
import { queryClient } from "@context/index";
import useWhichLayout from "@hooks/useWhichLayout";
import useRole from "@hooks/useRole";

const getShortDateFormat = (date: string) => {
  const dateObject = new Date(date);
  const day = dateObject.getDate();
  const month = dateObject.toLocaleString("default", { month: "short" });
  return `${day} ${month}`;
};

const getFullDateFormat = (date: string) => {
  const dateObject = new Date(date);
  const day = dateObject.toLocaleString("default", { weekday: "short" });
  const dayNumber = dateObject.getDate();
  const month = dateObject.toLocaleString("default", { month: "long" });
  const year = dateObject.getFullYear();
  return `${day}, ${dayNumber} ${month} ${year}`;
};

interface IProps {
  id: string;
  title: string;
  url: string;
  type: DocumentType;
  size?: number;
  createdAt: string;
  teacherName?: string;
}

const Document: FC<IProps> = ({ id, title, url, type, size, teacherName, createdAt }) => {
  const [open, setOpen] = React.useState(false);
  const role = useRole();
  const layout = useWhichLayout();

  const deleteDocumentMutation = useMutation(() => api.delete("/documents?id=" + id), {
    onSuccess: () => {
      queryClient.invalidateQueries("teacher-documents");
      handleClose();
    },
    onError: () => {
      notifyError("Une erreur est survenue lors de la suppression du document");
    },
  });
  const handleDelete = () => {
    deleteDocumentMutation.mutate();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <div className={"flex w-full items-center justify-between gap-1 px-1"}>
        <div className=" flex items-center gap-2">
          <a
            download
            className=" text-sm text-[#4182C4] underline underline-offset-1 md:text-lg md:underline-offset-2"
            target="_blank"
          >
            {title}
          </a>
        </div>
        <div className=" flex items-center gap-3 md:gap-5">
          {role == "student" && <p className=" w-max text-xs text-blue md:text-lg">{teacherName}</p>}

          <p className=" text-xs text-[#A9A9A9] md:text-lg">
            {layout == "desktop" ? getFullDateFormat(createdAt) : getShortDateFormat(createdAt)}
          </p>
          <button onClick={handleOpen}>
            {role == "teacher" && (
              <DeleteOutlineOutlinedIcon
                fontSize={layout == "desktop" ? "large" : "medium"}
                sx={{ color: "#D6D6D6" }}
              />
            )}
          </button>
        </div>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-6 md:w-1/3 md:p-12 ">
          <div>
            <p className=" md:max-w-3/4 m-auto text-center md:text-lg">Etes vous sur de supprimer ce document ?</p>
            <div className=" mt-4 flex items-center justify-center gap-4">
              <Button
                color="#EF4445"
                className=" px-6 py-2"
                onClick={handleDelete}
                isLoading={deleteDocumentMutation.isLoading}
              >
                Supprimer
              </Button>
              <Button className=" px-6 py-2" onClick={handleClose}>
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Document;
