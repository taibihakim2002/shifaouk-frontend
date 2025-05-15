import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PATHS from "./routePaths";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import DoctorHome from "../pages/dashboard/doctor/DoctorHome";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import PatientHome from "../pages/dashboard/patient/PatientHome";
import store from "../data/store";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import NewDoctor from "../pages/NewDoctor";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/new-doctor" element={<NewDoctor />} />
      <Route path="/*" element={<PublicRoutes />} />
      <Route path="/*" element={<PrivateRoutes />} />
      <Route path={PATHS.DASHBOARD} element={<DashboardLayout />}>
        {/* Must Change || it is not best practises to add conditions inside routes element */}
        {store.userRole === "admin" && (
          <>
            <Route index element={<AdminHome />} />
          </>
        )}
        {store.userRole === "patient" && (
          <>
            <Route index element={<PatientHome />} />
          </>
        )}
        {store.userRole === "doctor" && (
          <>
            <Route index element={<DoctorHome />} />
          </>
        )}
      </Route>

      <Route path={PATHS.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
}
