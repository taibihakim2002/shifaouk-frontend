import { Outlet, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/common/Header";
import AuthDialog from "../components/common/AuthDialog";
import Doctors from "../pages/Doctors";
import Profile from "../pages/Profile";
import Footer from "../components/common/Footer";

export default function PublicRoutes() {
  return (
    <>
      <Header />
      <AuthDialog />
      <Outlet />
      <Footer />
    </>
  );
}
