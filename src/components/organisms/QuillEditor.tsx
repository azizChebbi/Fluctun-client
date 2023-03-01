import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import ReactQuill from "react-quill";
import ClipLoader from "react-spinners/ClipLoader";
import { useMutation } from "react-query";
import { api } from "@api/index";
import "react-quill/dist/quill.snow.css";
import { notifyError } from "@utils/notify";

const formats = [
  "code",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "background",
  "align",
  "code-block",
  "script",
  "link",
  "font",
];

interface IProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const QuillEditor: FC<IProps> = ({ value, setValue }) => {
  const reactQuillRef = useRef<ReactQuill>(null);

  // ================================================
  // state
  // ================================================
  const [modules] = useState(() => ({
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [
          {
            color: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
            ],
          },
          {
            background: [
              "#000000",
              "#e60000",
              "#ff9900",
              "#ffff00",
              "#008a00",
              "#0066cc",
              "#9933ff",
              "#ffffff",
              "#facccc",
              "#ffebcc",
              "#ffffcc",
              "#cce8cc",
              "#cce0f5",
              "#ebd6ff",
              "#bbbbbb",
              "#f06666",
              "#ffc266",
              "#ffff66",
              "#66b966",
              "#66a3e0",
              "#c285ff",
              "#888888",
              "#a10000",
              "#b26b00",
              "#b2b200",
              "#006100",
              "#0047b2",
              "#6b24b2",
              "#444444",
              "#5c0000",
              "#663d00",
              "#666600",
              "#003700",
              "#002966",
              "#3d1466",
            ],
          },
        ],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image"],
      ],
      handlers: {
        image: imageHandler,
        color: function (value: string) {
          console.log(value);
          reactQuillRef?.current?.getEditor().format("color", value);
        },
        background: function (value: string) {
          console.log(value);
          reactQuillRef?.current?.getEditor().format("background", value);
        },
        align: function (value: string) {
          console.log(value);
          reactQuillRef?.current?.getEditor().format("align", value);
        },
        "code-block": function (value: string) {
          console.log(value);
          reactQuillRef?.current?.getEditor().format("code-block", value);
        },
        script: function (value: string) {
          console.log(value);
          reactQuillRef?.current?.getEditor().format("script", value);
        },
        font: function (value: string) {
          console.log(value);
          reactQuillRef?.current?.getEditor().format("font", value);
        },
      },
    },
  }));

  // ============================================================
  // mutations
  // ============================================================
  const uploadImageMutation = useMutation(
    (formData: FormData) => api.post("/questions/upload-image", formData),
    {
      onSuccess: () => {
        console.log(uploadImageMutation.data);
      },
      onError: () => {
        notifyError(
          "Un erreur est survenue lors de l'upload de l'image, veuillez réessayer"
        );
      },
    }
  );

  // ============================================================
  // handlers
  // ============================================================
  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    const quill = reactQuillRef.current?.getEditor();
    const range = quill?.getSelection(true);
    input.onchange = async () => {
      // if (input.files?.length) {
      //   const file: File = input.files[0];
      //   console.log(file);
      //   const formData = new FormData();
      //   formData.append("image", file);
      //   try {
      //     const { data } = await uploadImageMutation.mutateAsync(formData);
      //     const quill = reactQuillRef.current?.getEditor();
      //     const range = quill?.getSelection(true);
      //     console.log("range", range);
      //     quill?.insertEmbed(
      //       range?.index || 0,
      //       "image",
      //       data?.Location || "https://via.placeholder.com/150"
      //     );
      //   } catch (error) {
      //     notifyError("Un erreur est survenue lors de l'upload de l'image");
      //   }
      // }
      quill?.insertEmbed(
        range?.index || 0,
        "image",
        "https://via.placeholder.com/150"
      );
    };
  }

  return (
    <div className=" relative">
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={setValue}
        placeholder="Ecrivez votre question ici..."
      />
      {uploadImageMutation.isLoading && (
        <div className=" flex items-center justify-center bg-[rgba(0,0,0,0.3)] absolute top-0 left-0 right-0 bottom-0">
          <ClipLoader color="white" size="40px" />
        </div>
      )}
    </div>
  );
};

export default QuillEditor;
