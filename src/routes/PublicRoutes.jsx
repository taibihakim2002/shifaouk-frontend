import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/common/Header";
import AuthDialog from "../components/common/AuthDialog";
import Doctors from "../pages/Doctors";
import Profile from "../pages/Profile";

export default function PublicRoutes() {
  return (
    <>
      <Header />
      <AuthDialog />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
      </Routes>
    </>
  );
}
