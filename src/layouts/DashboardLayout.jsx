import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import DashHeader from "../components/dashboard/layouts/DashHeader";
import DashSide from "../components/dashboard/layouts/DashSide";

import useAuthModalStore from "../store/authModalStore";
import useAuthStore from "../store/authStore";

export default function DashboardLayout() {
  const user = useAuthStore((state) => state.user);
  const openModal = useAuthModalStore((state) => state.openModal);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/");
      openModal("login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="w-full min-h-screen">
      <div className="p-0 lg:ps-[280px] fixed top-0 h-[80px] bg-white w-full">
        <div className="px-8 h-full flex justify-center items-center shadow-sm">
          <DashHeader />
        </div>
      </div>
      <div className="hidden lg:block fixed h-full w-[280px] start-0 top-0 bg-primary shadow-md">
        <DashSide />
      </div>
      <div className="pt-[80px] lg:ps-[280px]">
        <div className="px-7 md:px-16 py-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
