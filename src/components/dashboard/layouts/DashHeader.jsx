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

export default function DashHeader() {
  const [isOpen, setIsOpen] = useState(false);
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
            dismissOnClick={false}
            renderTrigger={() => (
              <span className="cursor-pointer ">
                <img
                  src="/doctor1.jpg"
                  alt="Profile"
                  className="w-10 h-10 object-cover rounded-full"
                />
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
      </div>
    </nav>
  );
}
