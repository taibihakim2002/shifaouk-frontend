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
import Doctors from "../pages/Doctors";
import Profile from "../pages/Profile";
import PatientProfile from "../pages/dashboard/patient/PatientProfile";
import PatientAppointments from "../pages/dashboard/patient/PatientAppointments";
import PatientHistory from "../pages/dashboard/patient/PatientHistory";
import PatientWallet from "../pages/dashboard/patient/PatientWallet";
import PatientFavorite from "../pages/dashboard/patient/PatientFavorite";
import DoctorProfile from "../pages/dashboard/doctor/DoctorProfile";
import DoctorWallet from "../pages/dashboard/doctor/DoctorWallet";
import DoctorAppointments from "../pages/dashboard/doctor/DoctorAppointments";
import DoctorHistory from "../pages/dashboard/doctor/DoctorHistory";
import DoctorPatients from "../pages/dashboard/doctor/DoctorPatients";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/new-doctor" element={<NewDoctor />} />
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
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
            <Route path="profile" element={<PatientProfile />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="history" element={<PatientHistory />} />
            <Route path="wallet" element={<PatientWallet />} />
            <Route path="favorite" element={<PatientFavorite />} />
          </>
        )}
        {store.userRole === "doctor" && (
          <>
            <Route index element={<DoctorHome />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="wallet" element={<DoctorWallet />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route path="history" element={<DoctorHistory />} />
            <Route path="patients" element={<DoctorPatients />} />
          </>
        )}
      </Route>

      <Route path={PATHS.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
}
