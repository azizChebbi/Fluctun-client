import question from "@icons/tabs/question.svg";
import home from "@icons/tabs/home.svg";
import ask from "@icons/tabs/ask.svg";
import document from "@icons/tabs/document.svg";

export type Tab = {
  href: string;
  label: string;
  icon: string;
};

export const tabs: Tab[] = [
  {
    href: "/",
    label: "home",
    icon: home,
  },
  {
    href: "/ask",
    label: "ask a question",
    icon: ask,
  },
  {
    href: "/questions",
    label: "questions",
    icon: question,
  },
  {
    href: "/courses",
    label: "courses",
    icon: document,
  },
];
