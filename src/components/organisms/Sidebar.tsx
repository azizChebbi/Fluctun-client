import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tabs } from "@utils/tabs";
import usePathname from "@hooks/usePathname";
import useRole from "@hooks/useRole";

const Sidebar = () => {
  const { t } = useTranslation();

  const role = useRole();

  return (
    <aside className=" grid grid-rows-[1fr_150px] border-r border-[#AFAFAF]">
      <div>
        <div className=" mt-12 flex flex-col justify-around">
          {tabs.map((tab, index) => {
            if (tab.href == "/ask" && role == "teacher") return null;
            return (
              <Link
                to={tab.href}
                key={index}
                className={` gap-2 py-8 ${tab.href == usePathname() ? " border-l-4 border-blue bg-[#F8F8F8]" : ""}`}
              >
                <div className="ml-[20%] flex items-center">
                  <div className="w-12">
                    <img src={tab.icon} alt={tab.label} />
                  </div>
                  <span className=" text-right text-xl font-medium">{t(`tabs.${tab.label}`)}</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
