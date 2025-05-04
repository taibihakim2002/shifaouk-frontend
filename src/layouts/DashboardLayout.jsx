import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  return (
    <div>
      <div className="">Dashboard layout</div>
      <div className="w-32 bg-gray-200">
        <Outlet />
      </div>
    </div>
  );
}
