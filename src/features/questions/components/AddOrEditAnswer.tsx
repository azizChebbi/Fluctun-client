import React, { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import Button from "@atoms/Button";
import AskSection from "@features/ask/components/AskSection";
import QuillEditor from "@organisms/QuillEditor";

interface IProps {
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  handleValidate: () => void;
  isLoading: boolean;
}

const AddOrDeleteAnswer: FC<IProps> = ({
  answer,
  setAnswer,
  handleValidate,
  isLoading,
}) => {
  const { t } = useTranslation();
  return (
    <div className=" mt-12">
      <AskSection
        title={t("ask:form.description.title")}
        description={t("ask:form.description.description")}
      >
        <div className=" mt-4">
          <QuillEditor
            value={answer}
            setValue={setAnswer}
            placeholder="Ecrivez votre réponse ici..."
          />
          <div className=" text-right">
            <Button
              className=" mt-6 rounded px-6 py-3 text-sm md:px-10 md:text-lg"
              type="submit"
              onClick={handleValidate}
              isLoading={isLoading}
              disabled={answer.replace(/<(.|\n)*?>/g, "").trim().length < 150}
            >
              Valider
            </Button>
          </div>
        </div>
      </AskSection>
    </div>
  );
};

export default AddOrDeleteAnswer;
