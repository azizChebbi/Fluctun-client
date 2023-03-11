import pdf from "@icons/documents/pdf.svg";
import docx from "@icons/documents/docx.svg";

export type DocumentType = "pdf" | "docx" | "other";

export const documentsType: { [key in DocumentType]: any } = {
  pdf,
  docx,
  other: pdf,
};
