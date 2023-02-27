import React from "react";
import NavigationLink from "@atoms/NavigationLink";
import { tabs } from "@utils/tabs";
import usePathname from "@hooks/usePathname";

const BottomNavigation = () => {
  return (
    <div className="fixed bg-white left-0 right-0 bottom-0 border-t-[1px] border-[#A1A1A1] flex items-end gap-4">
      {tabs.map((tab) => (
        <NavigationLink
          className=" flex-1"
          key={tab.label}
          active={tab.href == usePathname()}
          label={tab.label}
          href={tab.href}
          icon={tab.icon}
        />
      ))}
    </div>
  );
};

export default BottomNavigation;
