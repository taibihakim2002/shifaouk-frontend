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
    <nav className="flex justify-between items-center relative w-full z-50">
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
            label=""
            dismissOnClick={false}
            renderTrigger={() => (
              <span className="cursor-pointer ">
                <IoNotificationsOutline size={20} color="gray" />
              </span>
            )}
          >
            <DropdownHeader>
              <span className="block text-sm">Bonnie Green</span>
              <span className="block truncate text-sm font-medium">
                bonnie@flowbite.com
              </span>
            </DropdownHeader>
            <DropdownItem>Dashboard</DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Earnings</DropdownItem>
            <DropdownDivider />
            <DropdownItem>Sign out</DropdownItem>
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
                  {`${user.fullName.first}  ${user.fullName.second}`}
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
                {`${user.fullName.first}  ${user.fullName.second}`}{" "}
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
