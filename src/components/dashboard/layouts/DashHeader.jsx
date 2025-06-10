import {
  Avatar,
  Drawer,
  DrawerItems,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import { useState } from "react";
import { IoMenu, IoNotificationsOutline } from "react-icons/io5";
import DashSide from "./DashSide";
import useAuthStore from "../../../store/authStore";
import useToastStore from "../../../store/toastStore";
import useApiRequest from "../../../hooks/useApiRequest";
import globalApi from "../../../utils/globalApi";
import { Link, useNavigate } from "react-router-dom";
import parseImgUrl from "../../../utils/parseImgUrl";
import { Bell } from "lucide-react";
import flowbit from "../../../config/flowbit";
const notifications = [
  {
    id: 1,
    text: "لديك طلب استشارة جديد من أحمد علي.",
    time: "قبل دقيقتين",
    img: "/placeholder-avatars/avatar1.jpg",
    link: "/dashboard/appointments/requests",
  },
  {
    id: 2,
    text: "تم تحديث ملف المريض خالد حسن.",
    time: "قبل ساعة",
    img: "/placeholder-avatars/avatar2.jpg",
    link: "/dashboard/patients/patient-id",
  },
  {
    id: 3,
    text: "تذكير: لديك 3 مواعيد اليوم.",
    time: "اليوم",
    img: null,
    icon: <Bell className="w-5 h-5 text-primaryColor-500" />,
    link: "/dashboard/appointments",
  },
];
export default function DashHeader() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const { request } = useApiRequest();
  const showToast = useToastStore((state) => state.showToast);
  const handleLogout = async () => {
    const { success: responseSuccess } = await request(globalApi.logout);

    if (responseSuccess) {
      showToast("success", "تم تسجيل الخروج بنجاح");
      clearUser();
      navigate("/");
    } else {
      showToast("error", "فشل تسجيل الخروج");
    }
  };
  return (
    <nav className=" flex justify-between items-center relative w-full">
      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        position="right"
        className="p-0"
      >
        <DrawerItems className="h-full z-50">
          <DashSide />
        </DrawerItems>
      </Drawer>

      <button
        className="text-darkBlue lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <IoMenu size={22} />
      </button>
      <div className="hidden lg:block">
        <h2 className="font-bold text-lg text-secondaryColor">لوحة التحكم</h2>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <Dropdown
            arrowIcon={false}
            inline
            theme={flowbit.dropdown}
            label={
              <button
                aria-label="View notifications"
                className="relative p-2 text-gray-500 rounded-full hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primaryColor-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
              >
                <IoNotificationsOutline size={22} />
                {notifications.length > 0 && ( // Example unread badge
                  <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full ring-1 ring-white bg-red-500 dark:ring-gray-800" />
                )}
              </button>
            }
          >
            <DropdownHeader className="!py-2 !px-3 border-b dark:border-gray-600">
              <span className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
                الإشعارات ({notifications.length})
              </span>
            </DropdownHeader>
            <div className="max-h-80 overflow-y-auto custom-scrollbar">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <DropdownItem
                    key={notif.id}
                    as={Link}
                    to={notif.link || "#"}
                    className="dark:hover:!bg-gray-600 !p-0"
                  >
                    <div className="flex items-start gap-2.5 px-3 py-2.5 w-full">
                      {notif.img ? (
                        <Avatar
                          rounded
                          size="sm"
                          img={notif.img}
                          alt="Notification sender"
                        />
                      ) : notif.icon ? (
                        <div className="p-1.5 bg-gray-100 dark:bg-gray-600 rounded-full">
                          {notif.icon}
                        </div>
                      ) : (
                        <Avatar rounded size="sm" placeholder />
                      )}
                      <div className="w-full">
                        <p className="text-xs text-gray-700 dark:text-gray-200 leading-snug line-clamp-2">
                          {notif.text}
                        </p>
                        <p className="text-[10px] text-primaryColor-600 dark:text-primaryColor-400 mt-0.5">
                          {notif.time}
                        </p>
                      </div>
                    </div>
                  </DropdownItem>
                ))
              ) : (
                <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                  لا توجد إشعارات جديدة.
                </div>
              )}
            </div>
            {notifications.length > 0 && (
              <DropdownDivider className="my-1 dark:border-gray-600" />
            )}
            <DropdownItem
              as={Link}
              to="/dashboard/notifications"
              className="w-full text-center !py-2.5 text-xs font-medium text-primaryColor-600 hover:!bg-primaryColor-50 dark:text-primaryColor-400 dark:hover:!bg-primaryColor-700/30"
            >
              عرض كل الإشعارات
            </DropdownItem>
          </Dropdown>
        </div>
        <div>
          <Dropdown
            label=""
            className="w-44"
            dismissOnClick={false}
            renderTrigger={() => (
              <span className="cursor-pointer flex items-center gap-3">
                <p className="text-sm text-gray-400 font-bold">
                  {`${user?.fullName?.first}  ${user?.fullName?.second}`}
                </p>
                <img
                  src={parseImgUrl(user.profileImage)}
                  alt="Profile"
                  className="w-10 h-10 object-cover rounded-full"
                />
              </span>
            )}
          >
            <DropdownHeader>
              <span className="block text-sm font-bold">
                {`${user?.fullName?.first}  ${user?.fullName?.second}`}{" "}
              </span>
              <span className="block truncate text-sm font-medium text-gray-400">
                {user.email}
              </span>
            </DropdownHeader>
            <DropdownItem>
              <Link to="/dashboard">لوحة التحكم</Link>
            </DropdownItem>
            <DropdownItem>الاعدادات</DropdownItem>
            <DropdownItem>المحفظة</DropdownItem>
            <DropdownDivider />
            <DropdownItem onClick={handleLogout}>تسجيل الخروج</DropdownItem>
          </Dropdown>
        </div>
      </div>
    </nav>
  );
}

// import React, { useState, useEffect } from "react";
// import {
//   Avatar,
//   Button,
//   Drawer,
//   DrawerHeader, // Direct import as per user's preference
//   DrawerItems, // Direct import
//   Dropdown,
//   DropdownDivider, // Direct import
//   DropdownHeader, // Direct import
//   DropdownItem, // Direct import
// } from "flowbite-react";
// import flowbit from "../../../config/flowbit"; // Your custom Flowbite theme
// import {
//   AlignJustify, // For mobile menu trigger, as in original user's Header.jsx
//   LogIn,
//   LogOut,
//   Settings,
//   UserCircle,
//   CreditCard,
//   LayoutDashboard,
//   Bell, // Using Bell from lucide-react for notifications
// } from "lucide-react";
// import { IoMenu, IoNotificationsOutline } from "react-icons/io5"; // Kept for reference, but using Lucide for consistency
// import DashSide from "./DashSide"; // The sidebar component for the drawer
// import useAuthStore from "../../../store/authStore";
// import useToastStore from "../../../store/toastStore";
// import useApiRequest from "../../../hooks/useApiRequest";
// import globalApi from "../../../utils/globalApi";
// import { Link, useNavigate } from "react-router-dom";
// import parseImgUrl from "../../../utils/parseImgUrl";
// import Logo from "../../common/Logo"; // Assuming Logo component exists

// export default function DashHeader() {
//   const navigate = useNavigate();
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for mobile drawer
//   const user = useAuthStore((state) => state.user);
//   const clearUser = useAuthStore((state) => state.clearUser);
//   const { request, loading: logoutLoading } = useApiRequest();
//   const { showToast } = useToastStore();

//   const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

//   // Handle header style on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsHeaderScrolled(window.scrollY > 10);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = async () => {
//     const { success: responseSuccess } = await request(globalApi.logout);

//     if (responseSuccess) {
//       showToast("success", "تم تسجيل الخروج بنجاح");
//       clearUser();
//       navigate("/"); // Navigate to home or login page after logout
//     } else {
//       showToast("error", "فشل تسجيل الخروج. يرجى المحاولة مرة أخرى.");
//     }
//   };

//   // Example notifications data
//   const notifications = [
//     {
//       id: 1,
//       text: "لديك طلب استشارة جديد من أحمد علي.",
//       time: "قبل دقيقتين",
//       img: "/placeholder-avatars/avatar1.jpg",
//       link: "/dashboard/appointments/requests",
//     },
//     {
//       id: 2,
//       text: "تم تحديث ملف المريض خالد حسن.",
//       time: "قبل ساعة",
//       img: "/placeholder-avatars/avatar2.jpg",
//       link: "/dashboard/patients/patient-id",
//     },
//     {
//       id: 3,
//       text: "تذكير: لديك 3 مواعيد اليوم.",
//       time: "اليوم",
//       img: null,
//       icon: <Bell className="w-5 h-5 text-primaryColor-500" />,
//       link: "/dashboard/appointments",
//     },
//   ];

//   return (
//     <nav
//       className={`flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8 sticky top-0 z-50 transition-all duration-300 ease-in-out ${
//         isHeaderScrolled
//           ? "bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-lg border-b dark:border-gray-700"
//           : "bg-transparent"
//       }`}
//     >
//       {/* Left Section: Mobile Menu Trigger & Desktop Title/Logo */}
//       <div className="flex items-center">
//         <button
//           aria-label="Open sidebar"
//           className="p-2 mr-3 text-gray-600 rounded-lg cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
//           onClick={() => setIsDrawerOpen(true)}
//         >
//           <AlignJustify size={22} />
//         </button>
//         <div className="hidden lg:block">
//           {/* You can have a Logo here if DashSide is not always visible on desktop */}
//           {/* <Logo size="small"/> Or simply the title */}
//           <h2 className="font-semibold text-xl text-gray-700 dark:text-gray-200">
//             لوحة التحكم
//           </h2>
//         </div>
//       </div>

//       {/* Right Section: Notifications & User Profile */}
//       <div className="flex items-center gap-3 sm:gap-4">
//         {/* Notifications Dropdown */}
//         <div>
//           <Dropdown
//             arrowIcon={false}
//             inline
//             theme={flowbit.dropdown}
//             label={
//               <button
//                 aria-label="View notifications"
//                 className="relative p-2 text-gray-500 rounded-full hover:text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-primaryColor-500 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-offset-gray-800"
//               >
//                 <IoNotificationsOutline size={22} />
//                 {notifications.length > 0 && ( // Example unread badge
//                   <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full ring-1 ring-white bg-red-500 dark:ring-gray-800" />
//                 )}
//               </button>
//             }
//           >
//             <DropdownHeader className="!py-2 !px-3 border-b dark:border-gray-600">
//               <span className="block text-sm font-semibold text-gray-700 dark:text-gray-200">
//                 الإشعارات ({notifications.length})
//               </span>
//             </DropdownHeader>
//             <div className="max-h-80 overflow-y-auto custom-scrollbar">
//               {notifications.length > 0 ? (
//                 notifications.map((notif) => (
//                   <DropdownItem
//                     key={notif.id}
//                     as={Link}
//                     to={notif.link || "#"}
//                     className="dark:hover:!bg-gray-600 !p-0"
//                   >
//                     <div className="flex items-start gap-2.5 px-3 py-2.5 w-full">
//                       {notif.img ? (
//                         <Avatar
//                           rounded
//                           size="sm"
//                           img={notif.img}
//                           alt="Notification sender"
//                         />
//                       ) : notif.icon ? (
//                         <div className="p-1.5 bg-gray-100 dark:bg-gray-600 rounded-full">
//                           {notif.icon}
//                         </div>
//                       ) : (
//                         <Avatar rounded size="sm" placeholder />
//                       )}
//                       <div className="w-full">
//                         <p className="text-xs text-gray-700 dark:text-gray-200 leading-snug line-clamp-2">
//                           {notif.text}
//                         </p>
//                         <p className="text-[10px] text-primaryColor-600 dark:text-primaryColor-400 mt-0.5">
//                           {notif.time}
//                         </p>
//                       </div>
//                     </div>
//                   </DropdownItem>
//                 ))
//               ) : (
//                 <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
//                   لا توجد إشعارات جديدة.
//                 </div>
//               )}
//             </div>
//             {notifications.length > 0 && (
//               <DropdownDivider className="my-1 dark:border-gray-600" />
//             )}
//             <DropdownItem
//               as={Link}
//               to="/dashboard/notifications"
//               className="w-full text-center !py-2.5 text-xs font-medium text-primaryColor-600 hover:!bg-primaryColor-50 dark:text-primaryColor-400 dark:hover:!bg-primaryColor-700/30"
//             >
//               عرض كل الإشعارات
//             </DropdownItem>
//           </Dropdown>
//         </div>

//         {/* User Profile Dropdown */}
//         {user && (
//           <div>
//             <Dropdown
//               arrowIcon={false}
//               inline
//               theme={flowbit.dropdown}
//               placement="bottom-end"
//               label={
//                 <button
//                   aria-label="User menu"
//                   className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
//                 >
//                   <Avatar
//                     img={
//                       user.profileImage
//                         ? parseImgUrl(user.profileImage)
//                         : `https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             user.fullName.first
//                           )}+${encodeURIComponent(
//                             user.fullName.second
//                           )}&background=048CFF&color=fff&font-size=0.45&bold=true`
//                     }
//                     alt="User Profile"
//                     rounded
//                     size="sm"
//                     bordered
//                     color="light" // Or your primary color if defined in theme
//                     className="dark:!ring-gray-500"
//                   />
//                   <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
//                     {user.fullName.first}
//                   </span>
//                 </button>
//               }
//             >
//               <DropdownHeader className="!p-3">
//                 <span className="block text-sm font-semibold text-gray-800 dark:text-gray-100">
//                   {user.fullName.first} {user.fullName.second}
//                 </span>
//                 <span className="block truncate text-xs text-gray-500 dark:text-gray-400">
//                   {user.email}
//                 </span>
//               </DropdownHeader>
//               <DropdownItem
//                 icon={LayoutDashboard}
//                 as={Link}
//                 to="/dashboard"
//                 className="dark:hover:!bg-gray-600 text-sm"
//               >
//                 لوحة التحكم
//               </DropdownItem>
//               <DropdownItem
//                 icon={UserCircle}
//                 as={Link}
//                 to="/dashboard/profile"
//                 className="dark:hover:!bg-gray-600 text-sm"
//               >
//                 الملف الشخصي
//               </DropdownItem>
//               <DropdownItem
//                 icon={CreditCard}
//                 as={Link}
//                 to="/dashboard/wallet"
//                 className="dark:hover:!bg-gray-600 text-sm"
//               >
//                 المحفظة
//               </DropdownItem>
//               <DropdownItem
//                 icon={Settings}
//                 as={Link}
//                 to="/dashboard/settings"
//                 className="dark:hover:!bg-gray-600 text-sm"
//               >
//                 الإعدادات
//               </DropdownItem>
//               <DropdownDivider className="my-1 dark:border-gray-600" />
//               <DropdownItem
//                 icon={LogOut}
//                 onClick={handleLogout}
//                 disabled={logoutLoading}
//                 className="!text-red-600 hover:!bg-red-100 dark:!text-red-400 dark:hover:!text-white dark:hover:!bg-red-700/40 text-sm"
//               >
//                 {logoutLoading ? "جاري الخروج..." : "تسجيل الخروج"}
//               </DropdownItem>
//             </Dropdown>
//           </div>
//         )}
//         {!user && ( // Show login/register if no user, only on mobile if desktop has them (or always if you prefer)
//           <div className="hidden sm:flex items-center gap-2">
//             <Link to="/login">
//               <Button
//                 theme={flowbit.button}
//                 color="light"
//                 outline
//                 className="!px-4 !py-2 text-xs font-medium dark:!border-gray-600 dark:!text-gray-300 dark:hover:!bg-gray-700"
//               >
//                 <LogIn size={14} className="ml-1.5" />
//                 دخول
//               </Button>
//             </Link>
//             <Link to="/register">
//               <Button
//                 theme={flowbit.button}
//                 color="primary"
//                 className="!px-4 !py-2 text-xs font-medium shadow-sm hover:shadow-md"
//               >
//                 <UserPlus size={14} className="ml-1.5" />
//                 تسجيل جديد
//               </Button>
//             </Link>
//           </div>
//         )}
//       </div>

//       {/* Mobile Drawer (containing DashSide) */}
//       <Drawer
//         open={isDrawerOpen}
//         onClose={() => setIsDrawerOpen(false)}
//         position="right" // Slides from the right for RTL
//         theme={flowbit.drawer}
//         className="w-72 sm:w-80 dark:bg-slate-800" // Custom width for drawer
//       >
//         {/* DrawerHeader is handled by DashSide's Logo section now */}
//         <DrawerItems className="p-0 h-full">
//           <DashSide />{" "}
//           {/* DashSide component already has its own structure including Logo */}
//         </DrawerItems>
//       </Drawer>
//     </nav>
//   );
// }
