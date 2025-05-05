import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Header from "../components/common/Header";
import AuthDialog from "../components/common/AuthDialog";

export default function PublicRoutes() {
  return (
    <>
      <Header />
      <AuthDialog />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}
