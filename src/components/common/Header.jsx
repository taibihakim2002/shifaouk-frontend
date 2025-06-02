import {
  Drawer,
  DrawerHeader,
  DrawerItems,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
} from "flowbite-react";
import flowbit from "../../config/flowbit";
import {
  AlignJustify,
  BriefcaseMedical,
  Contact,
  Home,
  ServerIcon,
  WholeWord,
} from "lucide-react";
import { useState } from "react";
import LoginBtn from "./LoginBtn";
import RegisterBtn from "./RegisterBtn";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import useAuthStore from "../../store/authStore";
import useApiRequest from "../../hooks/useApiRequest";
import globalApi from "../../utils/globalApi";
import useToastStore from "../../store/toastStore";
import parseImgUrl from "../../utils/parseImgUrl";
const menu = [
  {
    title: "الرئيسية",
    link: "/",
    icon: Home,
  },
  {
    title: "الاطباء",
    link: "/doctors",
    icon: BriefcaseMedical,
  },
  {
    title: "الخدمات",
    link: "#",
    icon: ServerIcon,
  },
  {
    title: "من نحن",
    link: "#",
    icon: WholeWord,
  },
  {
    title: "اتصل بنا",
    link: "#",
    icon: Contact,
  },
];

export default function Header() {
  const user = useAuthStore((state) => state.user);
  const clearUser = useAuthStore((state) => state.clearUser);
  const [isOpen, setIsOpen] = useState(false);
  const { request } = useApiRequest();

  const showToast = useToastStore((state) => state.showToast);
  const handleLogout = async () => {
    const { success: responseSuccess } = await request(globalApi.logout);

    if (responseSuccess) {
      showToast("success", "تم تسجيل الخروج بنجاح");
      clearUser();
    } else {
      showToast("error", "فشل تسجيل الخروج");
    }
  };
  return (
    <div className="w-full flex items-center h-[80px]">
      <div className="container flex justify-between items-center pb-3 border-b border-b-gray-100">
        <Logo />
        <div className="hidden md:flex items-center justify-between">
          <ul className="flex md:gap-5 lg:gap-10  text-sm md:text-md 2xl:text-[20px]">
            {menu.map((ele, index) => (
              <li
                key={index}
                className="hover:text-primary-500 flex gap-2 items-center"
              >
                <Link to={ele.link}>{ele.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        {!user ? (
          <>
            <div className="hidden md:flex gap-2">
              <LoginBtn />
              <RegisterBtn />
            </div>
            <div className="md:hidden">
              <button onClick={() => setIsOpen(true)}>
                <AlignJustify />
              </button>
              <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                position="right"
                theme={flowbit.drawer}
              >
                <DrawerHeader title="القائمة" />
                <DrawerItems>
                  <div className="flex flex-col p-10">
                    <ul className="flex flex-col gap-10 text-sm">
                      {menu.map((ele) => {
                        const Icon = ele.icon;
                        return (
                          <li className="hover:text-primary-500 flex gap-2 items-center">
                            <Icon className="w-3 h-3" />
                            <Link to={ele.link}>{ele.title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <LoginBtn />
                    <RegisterBtn />
                  </div>
                </DrawerItems>
              </Drawer>
            </div>
          </>
        ) : (
          <div className="flex gap-3 justify-center items-center">
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
            <div className="md:hidden">
              <button onClick={() => setIsOpen(true)}>
                <AlignJustify />
              </button>
              <Drawer
                open={isOpen}
                onClose={() => setIsOpen(false)}
                position="right"
                theme={flowbit.drawer}
              >
                <DrawerHeader title="القائمة" />
                <DrawerItems>
                  <div className="flex flex-col p-10">
                    <ul className="flex flex-col gap-10 text-sm">
                      {menu.map((ele, index) => {
                        const Icon = ele.icon;
                        return (
                          <li
                            key={index}
                            className="hover:text-primary-500 flex gap-2 items-center"
                          >
                            <Icon className="w-3 h-3" />
                            <Link to={ele.link}>{ele.title}</Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <LoginBtn />
                    <RegisterBtn />
                  </div>
                </DrawerItems>
              </Drawer>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
