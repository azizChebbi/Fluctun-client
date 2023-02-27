import React, { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { api } from "@api/index";
import "react-quill/dist/quill.snow.css";

const formats = [
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
];

interface IProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}

const QuillEditor: FC<IProps> = ({ value, setValue }) => {
  // ================================================
  // state
  // ================================================
  const [modules] = useState(() => ({
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        // [{ color: ["#F00"] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  }));
  const reactQuillRef = useRef<ReactQuill>(null);

  // ============================================================
  // handlers
  // ============================================================
  function imageHandler() {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.onchange = async () => {
      if (input.files?.length) {
        const file: File = input.files[0];
        console.log(file);
        const formData = new FormData();
        formData.append("image", file);
        await api.post("/questions/upload-image", formData);
        const quill = reactQuillRef.current?.getEditor();
        const range = quill?.getSelection(true);
        console.log("range", range);
        quill?.insertEmbed(
          range?.index || 0,
          "image",
          "https://www.shutterstock.com/image-photo/mountains-under-mist-morning-amazing-260nw-1725825019.jpg"
        );
      }
    };
  }

  return (
    <>
      <ReactQuill
        ref={reactQuillRef}
        theme="snow"
        value={value}
        modules={modules}
        formats={formats}
        onChange={setValue}
      />
    </>
  );
};

export default QuillEditor;
