import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Tab } from "@utils/tabs";

type IProps = { active?: boolean; className?: string };

const NavigationLink: FC<IProps & Tab> = ({
  label,
  href,
  icon,
  className,
  active,
}) => {
  const { t } = useTranslation();
  return (
    <Link
      to={href}
      className={` flex flex-col justify-center border-blue items-center gap-2 py-5 ${
        active ? "bg-[#F8F8F8] border-t-2" : ""
      } ${className}`}
    >
      <img src={icon} />
      <p className=" text-sm font-medium">{t(`tabs.${label}`)}</p>
    </Link>
  );
};

export default NavigationLink;
