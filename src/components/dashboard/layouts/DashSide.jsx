import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import { useLocation } from "react-router-dom";
import flowbit from "../../../config/flowbit";
import {
  sidebarAdminItems,
  sidebarDoctorItems,
  sidebarPatientItems,
} from "../../../data/sidebarItems";
import useAuthStore from "../../../store/authStore";
import Logo from "../../common/Logo";

export default function DashSide() {
  const location = useLocation();
  const user = useAuthStore((state) => state.user);
  return (
    <Sidebar
      theme={flowbit.dashSide}
      aria-label="Default sidebar example"
      className="w-full h-full z-50"
    >
      <div className="flex gap-4 items-center  justify-center mb-14">
        <Logo />
      </div>
      <SidebarItems>
        <SidebarItemGroup>
          {user?.role == "admin" &&
            sidebarAdminItems.map((ele, index) => (
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
          {user?.role == "doctor" &&
            sidebarDoctorItems.map((ele, index) => (
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
          {user?.role == "patient" &&
            sidebarPatientItems.map((ele, index) => (
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
