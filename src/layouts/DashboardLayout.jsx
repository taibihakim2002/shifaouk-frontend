import { Outlet } from "react-router-dom";
import DashHeader from "../components/dashboard/layouts/DashHeader";
import DashSide from "../components/dashboard/layouts/DashSide";

export default function DashboardLayout() {
  return (
    <div className="w-full min-h-screen">
      <div className="p-0 lg:ps-[280px] fixed top-0 h-[80px] bg-white border-b w-full">
        <div className="px-8 h-full flex justify-center items-center ">
          <DashHeader />
        </div>
      </div>
      <div className="hidden lg:block fixed h-full w-[280px] start-0 top-0 bg-primary shadow-md">
        <DashSide />
      </div>
      <div className="pt-[80px] lg:ps-[280px]">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
