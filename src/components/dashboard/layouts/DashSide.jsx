import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import { useLocation } from "react-router-dom";
import flowbit from "../../../config/flowbit";
import { sidebarItems } from "../../../data/sidebarItems";

export default function DashSide() {
  const location = useLocation();

  return (
    <Sidebar
      theme={flowbit.dashSide}
      aria-label="Default sidebar example"
      className="w-full h-full z-50"
    >
      <div className="flex gap-4 items-center  justify-center mb-14">
        <img className="w-12" src="/logo.png" alt="Logo" />
        <h1 className="text-lg font-[600] text-primaryColor">شفائك</h1>
      </div>
      <SidebarItems>
        <SidebarItemGroup>
          {sidebarItems.map((ele, index) => (
            <SidebarItem
              key={index}
              href={ele.href}
              icon={ele.icon}
              label={ele.label || ""}
              labelColor={ele.labelColor || ""}
              active={
                location.pathname.split("/")[2] === ele.href.split("/")[2]
              }
            >
              {ele.title}
            </SidebarItem>
          ))}
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
