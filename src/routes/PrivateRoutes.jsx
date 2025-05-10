import { Route, Routes } from "react-router-dom";
import Header from "../components/common/Header";
import Profile from "../pages/Profile";
import Footer from "../components/common/Footer";

export default function PrivateRoutes() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Footer />
    </>
  );
}
