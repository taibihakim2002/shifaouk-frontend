import { Outlet, Route, Routes } from "react-router-dom";

import Header from "../components/common/Header";
import AuthDialog from "../components/common/AuthDialog";

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
