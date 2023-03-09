import React, { FC } from "react";
import Modal from "@mui/material/Modal";
import addDocumentSvg from "@icons/addDocument.svg";
import AskSection from "@features/ask/components/AskSection";
import Input from "@atoms/Input";
import drop from "@icons/drop.svg";
import SelectOption from "@atoms/SelectOption";
import { level } from "@utils/options";
import useWhichLayout from "@hooks/useWhichLayout";

const generateLabelValueOptions = (options: level[]) => {
  return options.map((option) => {
    return {
      label: option,
      value: option,
    };
  });
};

interface IProps {
  levels: level[];
}

const AddDocument: FC<IProps> = ({ levels }) => {
  const layout = useWhichLayout();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
        <div className=" absolute top-1/2 left-1/2 w-11/12 -translate-x-1/2 -translate-y-1/2 transform rounded bg-white p-4 md:w-1/2 md:p-12 ">
          <AskSection title="Titre de document" description="Soyez précis et le decrivez brievement">
            <Input registration={null} placeholder="Titre" />
          </AskSection>
          <label
            htmlFor="inputFile"
            className="mb-6 flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-xl  border border-dashed border-blue p-12"
          >
            <img src={drop} alt="image" className=" w-15 h-15" />
            <p className=" mt-4 text-lg text-[#565656]">Déposer votre fichier ici</p>
            <input id="inputFile" type={"file"} className=" hidden" />
          </label>
          <AskSection
            title="Choisir le ou les niveau(x) concernant ce document :"
            description="Vous pouvez choisir un ou plusieurs niveaux selon vos besoins "
          >
            <SelectOption
              placeholder="Les niveaux"
              controlStyle={{
                padding: layout == "desktop" ? "6px" : "3px",
                fontSize: layout == "desktop" ? "14px" : "12px",
              }}
              options={generateLabelValueOptions(levels)}
              isMulti
            />
          </AskSection>
        </div>
      </Modal>
    </>
  );
};

export default AddDocument;
