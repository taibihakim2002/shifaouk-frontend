import { Button, Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
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
const menu = [
  {
    title: "الرئيسية",
    link: "#",
    icon: Home,
  },
  {
    title: "الاطباء",
    link: "#",
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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="w-full flex items-center h-[80px]">
      <div className="container flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <img className="w-12" src="/logo.png" alt="Logo" />
          <h1 className="text-lg font-[600] text-primaryColor">شفائك</h1>
        </div>
        <div className="flex items-center justify-between">
          <ul className="hidden md:flex gap-10 text-sm 2xl:text-[17px]">
            {menu.map((ele) => (
              <li className="hover:text-primary-500 flex gap-2 items-center">
                <a href={ele.link}>{ele.title}</a>
              </li>
            ))}
          </ul>
        </div>
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
                        <a href={ele.link}>{ele.title}</a>
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
    </div>
  );
}
