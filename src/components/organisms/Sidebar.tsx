import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { tabs } from "@utils/tabs";
import usePathname from "@hooks/usePathname";
import { useAuth } from "@context/auth";
import useRole from "@hooks/useRole";

const Sidebar = () => {
  const { logout } = useAuth();
  const { t } = useTranslation();

  const role = useRole();

  return (
    <aside className=" border-r border-[#AFAFAF] grid grid-rows-[1fr_150px]">
      <div>
        <div className=" flex flex-col justify-around mt-12">
          {tabs.map((tab, index) => {
            if (tab.href == "/ask" && role == "teacher") return null;
            return (
              <Link
                to={tab.href}
                key={index}
                className={` gap-2 py-10 mb-2${
                  tab.href == usePathname()
                    ? " border-l-4 border-blue bg-[#F8F8F8]"
                    : ""
                }`}
              >
                <div className="flex items-center ml-[20%]">
                  <div className="w-12">
                    <img src={tab.icon} alt={tab.label} />
                  </div>
                  <span className=" text-xl font-medium text-right">
                    {t(`tabs.${tab.label}`)}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="flex items-center ml-[20%] ">
        <Link to="/" className=" gap-2 w-full" onClick={logout}>
          <div className={" flex items-center gap-4 "}>
            <div className={" w-8 "}>
              <svg
                width="18"
                height="16"
                viewBox="0 0 18 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.5 3.55556L5.769 4.80889L3.447 7.11111H12.6V8.88889H3.447L5.769 11.1822L4.5 12.4444L0 8L4.5 3.55556ZM16.2 1.77778H9V0H16.2C17.19 0 18 0.8 18 1.77778V14.2222C18 15.2 17.19 16 16.2 16H9V14.2222H16.2V1.77778Z"
                  fill="#142B33"
                />
              </svg>
            </div>
            <span className=" text-xl ">Quitter</span>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
