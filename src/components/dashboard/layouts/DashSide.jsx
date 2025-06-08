// import {
//   Sidebar,
//   SidebarItem,
//   SidebarItemGroup,
//   SidebarItems,
// } from "flowbite-react";

// import { useLocation } from "react-router-dom";
// import flowbit from "../../../config/flowbit";
// import {
//   sidebarAdminItems,
//   sidebarDoctorItems,
//   sidebarPatientItems,
// } from "../../../data/sidebarItems";
// import useAuthStore from "../../../store/authStore";
// import Logo from "../../common/Logo";

// export default function DashSide() {
//   const location = useLocation();
//   const user = useAuthStore((state) => state.user);
//   return (
//     <Sidebar
//       theme={flowbit.dashSide}
//       aria-label="Default sidebar example"
//       className="w-full h-full z-50"
//     >
//       <div className="flex gap-4 items-center  justify-center mb-14">
//         <Logo />
//       </div>
//       <SidebarItems>
//         <SidebarItemGroup>
//           {user?.role == "admin" &&
//             sidebarAdminItems.map((ele, index) => (
//               <SidebarItem
//                 key={index}
//                 href={ele.href}
//                 icon={ele.icon}
//                 label={ele.label || ""}
//                 labelColor={ele.labelColor || ""}
//                 active={
//                   location.pathname.split("/")[2] === ele.href.split("/")[2]
//                 }
//               >
//                 {ele.title}
//               </SidebarItem>
//             ))}
//           {user?.role == "doctor" &&
//             sidebarDoctorItems.map((ele, index) => (
//               <SidebarItem
//                 key={index}
//                 href={ele.href}
//                 icon={ele.icon}
//                 label={ele.label || ""}
//                 labelColor={ele.labelColor || ""}
//                 active={
//                   location.pathname.split("/")[2] === ele.href.split("/")[2]
//                 }
//               >
//                 {ele.title}
//               </SidebarItem>
//             ))}
//           {user?.role == "patient" &&
//             sidebarPatientItems.map((ele, index) => (
//               <SidebarItem
//                 key={index}
//                 href={ele.href}
//                 icon={ele.icon}
//                 label={ele.label || ""}
//                 labelColor={ele.labelColor || ""}
//                 active={
//                   location.pathname.split("/")[2] === ele.href.split("/")[2]
//                 }
//               >
//                 {ele.title}
//               </SidebarItem>
//             ))}
//         </SidebarItemGroup>
//       </SidebarItems>
//     </Sidebar>
//   );
// }

import React, { useState } from "react"; // Removed useEffect as it's not used in this version
import {
  Sidebar,
  SidebarItem, // Direct import as per user's preference
  SidebarItemGroup, // Direct import
  SidebarItems, // Direct import
  // Flowbite's Sidebar.CTA, Sidebar.Logo etc. are accessed via Sidebar.ComponentName
  // but user requested direct imports like SidebarItem.
  // If a Collapse or Logo component from Flowbite's Sidebar is needed and it's a sub-component,
  // it would typically be Sidebar.Collapse or Sidebar.Logo.
  // For now, sticking to the provided import style.
} from "flowbite-react";
import { useLocation, Link } from "react-router-dom";
import flowbit from "../../../config/flowbit"; // Your custom Flowbite theme
import {
  sidebarAdminItems,
  sidebarDoctorItems,
  sidebarPatientItems,
} from "../../../data/sidebarItems"; // Your sidebar items data
import useAuthStore from "../../../store/authStore";
import Logo from "../../common/Logo"; // Your Logo component
import { LogOut, Settings, HelpCircle } from "lucide-react"; // Example icons for footer

// Helper component for NavLink-like behavior for active state styling
const CustomSidebarItem = ({
  href,
  icon: Icon,
  children,
  label,
  labelColor,
}) => {
  const location = useLocation();
  // Robust active check: handles exact match, base path match, and dashboard home
  const isActive =
    location.pathname === href ||
    (href !== "/dashboard" &&
      location.pathname.startsWith(href) &&
      location.pathname.split("/")[2] === href.split("/")[2]) ||
    (location.pathname === "/dashboard" && href === "/dashboard");

  return (
    <SidebarItem
      as={Link} // Use Link for navigation
      to={href} // Renamed from href to to for Link component
      icon={Icon}
      label={label}
      labelColor={labelColor}
      className={`
        group 
        text-sm font-medium 
        rounded-lg 
        focus:outline-none focus:ring-2 focus:ring-primaryColor-300 dark:focus:ring-primaryColor-600
        ${
          isActive
            ? "bg-gray-400 text-white dark:bg-primaryColor-700/30 dark:text-primaryColor-300"
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
        }
      `}
    >
      <span className="truncate">{children}</span>
    </SidebarItem>
  );
};

export default function DashSide() {
  const user = useAuthStore((state) => state.user);
  // const [isOpen, setIsOpen] = useState(true); // If sidebar was collapsible, not in current design

  // Determine which items to display based on user role
  let currentSidebarItems = [];
  if (user?.role === "admin") {
    currentSidebarItems = sidebarAdminItems;
  } else if (user?.role === "doctor") {
    currentSidebarItems = sidebarDoctorItems;
  } else if (user?.role === "patient") {
    currentSidebarItems = sidebarPatientItems;
  }

  return (
    <Sidebar
      theme={flowbit.dashSide} // Apply your custom theme
      aria-label="لوحة التحكم الرئيسية"
      className="w-full h-screen z-50 transition-transform sm:translate-x-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg" // Modern styling
      // collapsed={!isOpen} // If you want a toggleable sidebar
    >
      <div className="h-full flex flex-col justify-between pb-4">
        <div>
          <div className="py-6 px-4 flex justify-center items-center  border-gray-200 dark:border-gray-700 mb-4">
            <Logo /> {/* Your Logo component */}
          </div>
          <SidebarItems className="px-3">
            {" "}
            {/* Added padding to SidebarItems container */}
            <SidebarItemGroup className="space-y-1.5">
              {" "}
              {/* Consistent spacing */}
              {currentSidebarItems.map((item) => (
                <CustomSidebarItem
                  key={item.title} // Use a unique key, title is okay if unique
                  href={item.href}
                  icon={item.icon}
                  label={item.label || ""}
                  labelColor={item.labelColor || "gray"} // Default labelColor
                >
                  {item.title}
                </CustomSidebarItem>
              ))}
            </SidebarItemGroup>
          </SidebarItems>
        </div>

        {/* Sidebar Footer - Example with Settings and Logout */}
        <div className="mt-auto px-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <SidebarItemGroup className="space-y-1.5">
            <CustomSidebarItem href="/dashboard/settings" icon={Settings}>
              الإعدادات
            </CustomSidebarItem>
            <CustomSidebarItem href="/dashboard/help" icon={HelpCircle}>
              مركز المساعدة
            </CustomSidebarItem>
            {/* You can add a logout button here if it's part of the sidebar's role,
                    otherwise, it's usually in a user dropdown in the main header.
                    For now, let's assume logout is handled elsewhere.
                <SidebarItem
                    href="#" // Or handle logout via onClick
                    icon={LogOut}
                    onClick={() => alert("Logout action")} // Replace with actual logout logic
                     className="group text-sm font-medium rounded-lg text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-700/30 hover:text-red-700"
                >
                    تسجيل الخروج
                </SidebarItem>
                */}
          </SidebarItemGroup>
        </div>
      </div>
    </Sidebar>
  );
}
