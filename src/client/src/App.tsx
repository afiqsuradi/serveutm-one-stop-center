import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/Success";
import {
  ABOUT_US,
  CONTACT_US,
  HOMEPAGE,
  LOGIN,
  PASSWORD_RESET,
  PASSWORD_RESET_CONFIRM,
  REGISTER,
  REGISTER_SUCCESS,
  VERIFY,
} from "./constants/path";
import Verify from "./pages/Verify";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import Missing from "./pages/Missing";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordRequest from "./pages/ResetPasswordRequest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={REGISTER} element={<Register />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={PASSWORD_RESET} element={<ResetPasswordRequest />} />
        <Route path={PASSWORD_RESET_CONFIRM} element={<ResetPassword />} />
        <Route element={<PersistLogin />}>
          <Route path={REGISTER_SUCCESS} element={<RegisterSuccess />} />

          <Route path={HOMEPAGE} element={<Homepage />} />
          <Route path={ABOUT_US} element={<AboutUs />} />
          <Route path={CONTACT_US} element={<ContactUs />} />
          <Route element={<RequireAuth allowedRole={"user"} />}>
            <Route path={VERIFY} element={<Verify />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
