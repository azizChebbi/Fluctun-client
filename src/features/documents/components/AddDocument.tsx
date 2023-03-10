import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "react-query";
import addDocumentSvg from "@icons/addDocument.svg";
import AskSection from "@features/ask/components/AskSection";
import Input from "@atoms/Input";
import drop from "@icons/drop.svg";
import SelectOption from "@atoms/SelectOption";
import { level } from "@utils/options";
import useWhichLayout from "@hooks/useWhichLayout";
import { addDocumentShema } from "@utils/validations";
import Button from "@atoms/Button";
import ErrorMessage from "@atoms/ErrorMessage";
import { api } from "@api/index";
import usePayload from "@hooks/usePayload";
import { notifyError, notifySuccess } from "@utils/notify";

const generateLabelValueOptions = (options: level[]) => {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
};

interface IFormInputs {
  title: string;
  file: any;
  levels: { label: string; value: string }[];
}

const schema = addDocumentShema;

interface IProps {
  levels: level[];
}

const AddDocument: FC<IProps> = ({ levels }) => {
  const [open, setOpen] = React.useState(false);
  const layout = useWhichLayout();
  const payload = usePayload();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
    control,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const addDocumentMutation = useMutation((formData: any) => api.post("/documents/add-document", formData), {
    onSuccess: () => {
      notifySuccess("Document ajouté avec succès");
      // handleClose();
    },
    onError: () => {
      notifyError("Erreur lors de l'ajout du document");
    },
  });

  const onSubmit = (data: IFormInputs) => {
    if (data.file[0]) {
      console.log(data, data?.file[0]);
      const levels = data.levels.map((level) => level.value);
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("file", data.file[0]);
      formData.append("levels", levels.join(","));
      formData.append("teacherId", payload?.id);
      addDocumentMutation.mutate(formData);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        className=" flex items-center gap-3 rounded border border-[#C5C5C5] py-3 px-6 text-blue md:mt-8 md:py-6 md:px-10"
      >
        <img src={addDocumentSvg} />
        <p className=" text-blue md:text-xl">Ajouter un document</p>
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-4 md:w-1/2 md:p-12 "
        >
          <AskSection title="Titre de document" description="Soyez précis et le decrivez brievement">
            <Input registration={register("title")} placeholder="Titre" />
            <ErrorMessage>{errors?.title?.message}</ErrorMessage>
          </AskSection>
          <label
            htmlFor="inputFile"
            className="mb-6 flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl  border border-dashed border-blue p-12"
          >
            <img src={drop} alt="image" className=" w-15 h-15" />
            <p className=" mt-4 text-lg text-[#565656]">
              {(getValues().file && getValues().file[0]?.name) || "Déposer votre fichier ici"}
            </p>
            <input {...register("file")} id="inputFile" type={"file"} className=" hidden" />
            <ErrorMessage>{errors?.file?.message?.toString()}</ErrorMessage>
          </label>
          <AskSection
            title="Choisir le ou les niveau(x) concernant ce document :"
            description="Vous pouvez choisir un ou plusieurs niveaux selon vos besoins "
          >
            <Controller
              name="levels"
              control={control}
              render={({ field }: { field: any }) => (
                <SelectOption
                  {...field}
                  ref={null}
                  placeholder="Les niveaux"
                  options={generateLabelValueOptions(levels)}
                  controlStyle={{
                    padding: layout == "desktop" ? "6px" : "3px",
                    fontSize: layout == "desktop" ? "14px" : "12px",
                  }}
                  className={`${errors.levels ? " text-red-500" : ""}`}
                  isMulti
                />
              )}
            />
            <ErrorMessage>{errors?.levels?.message}</ErrorMessage>
          </AskSection>
          <div className="mt-6 flex items-center justify-between md:mt-12">
            <Button outlined className=" rounded py-3 px-7 text-sm md:text-base" onClick={handleClose} type="button">
              Annuler
            </Button>
            <Button type="submit" className=" rounded py-3 px-7 text-sm md:text-base">
              Ajouter
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddDocument;
