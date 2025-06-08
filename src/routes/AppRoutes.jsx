import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import PATHS from "./routePaths";
import NotFound from "../pages/NotFound";
import DashboardLayout from "../layouts/DashboardLayout";
import DoctorHome from "../pages/dashboard/doctor/DoctorHome";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import PatientHome from "../pages/dashboard/patient/PatientHome";
import AdminDoctors from "../pages/dashboard/admin/doctors/AdminDoctors";
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
import DoctorHistory from "../pages/dashboard/doctor/DoctorHistory";
import useAuthStore from "../store/authStore";
import AddDoctor from "../pages/dashboard/admin/doctors/AddDoctor";
import AdminPatients from "../pages/dashboard/admin/patients/AdminPatients";
import AdminAppointments from "../pages/dashboard/admin/appointments/AdminAppointments";
import AdminWallet from "../pages/dashboard/admin/wallet/AdminWallet";
import AdminSettings from "../pages/dashboard/admin/AdminSettings";
import JoiningRequests from "../pages/dashboard/admin/doctors/JoiningRequests";
import JoiningRequest from "../pages/dashboard/admin/doctors/JoiningRequest";
import ProfileDoctor from "../pages/ProfileDoctor";
import DoctorBook from "../pages/DoctorBook";
import AdminDoctorProfile from "../pages/dashboard/admin/doctors/AdminDoctorProfile";
import AdminPatientProfile from "../pages/dashboard/admin/patients/AdminPatientProfile";
import AdminChargeRequest from "../pages/dashboard/admin/wallet/AdminChargeRequest";
import AdminEditPatientProfile from "../pages/dashboard/admin/patients/AdminEditPatientProfile";
import AdminEditDoctorProfile from "../pages/dashboard/admin/doctors/AdminEditDoctorProfile";
import DoctorPatients from "../pages/dashboard/doctor/patients/DoctorPatients";
import DoctorPatientProfile from "../pages/dashboard/doctor/patients/DoctorPatientProfile";
import DoctorAppointments from "../pages/dashboard/doctor/consultations/DoctorAppointments";
import DoctorConsultationReport from "../pages/dashboard/doctor/consultations/DoctorConsultationReport";

export default function AppRoutes() {
  const user = useAuthStore((state) => state.user);
  return (
    <Routes>
      <Route path="/new-doctor" element={<NewDoctor />} />
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:id" element={<ProfileDoctor />} />
        <Route path="/doctors/:id/book" element={<DoctorBook />} />
      </Route>
      <Route element={<PrivateRoutes />}>
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Route>
      <Route path={PATHS.DASHBOARD} element={<DashboardLayout />}>
        {/* Must Change || it is not best practises to add conditions inside routes element */}
        {user?.role === "admin" && (
          <>
            <Route index element={<AdminHome />} />
            <Route path="doctors" element={<AdminDoctors />} />
            <Route path="doctors/add-doctor" element={<AddDoctor />} />
            <Route path="doctors/:id" element={<AdminDoctorProfile />} />
            <Route
              path="doctors/edit/:id"
              element={<AdminEditDoctorProfile />}
            />
            <Route path="doctors/requests" element={<JoiningRequests />} />
            <Route
              path="doctors/requests/:requestId"
              element={<JoiningRequest />}
            />
            <Route path="patients" element={<AdminPatients />} />
            <Route path="patients/:id" element={<AdminPatientProfile />} />
            <Route
              path="patients/edit/:id"
              element={<AdminEditPatientProfile />}
            />
            <Route path="appointments" element={<AdminAppointments />} />
            <Route path="wallet" element={<AdminWallet />} />
            <Route path="wallet/charge/:id" element={<AdminChargeRequest />} />
            <Route path="settings" element={<AdminSettings />} />
          </>
        )}
        {user?.role === "patient" && (
          <>
            <Route index element={<PatientHome />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="history" element={<PatientHistory />} />
            <Route path="wallet" element={<PatientWallet />} />
            <Route path="favorite" element={<PatientFavorite />} />
          </>
        )}
        {user?.role === "doctor" && (
          <>
            <Route index element={<DoctorHome />} />
            <Route path="profile" element={<DoctorProfile />} />
            <Route path="wallet" element={<DoctorWallet />} />
            <Route path="appointments" element={<DoctorAppointments />} />
            <Route
              path="appointments/:id/report"
              element={<DoctorConsultationReport />}
            />
            <Route path="history" element={<DoctorHistory />} />
            <Route path="patients" element={<DoctorPatients />} />
            <Route path="patients/:id" element={<DoctorPatientProfile />} />
          </>
        )}
      </Route>

      <Route path={PATHS.NOTFOUND} element={<NotFound />} />
    </Routes>
  );
}
