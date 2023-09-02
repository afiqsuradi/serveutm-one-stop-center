import ROUTES from "./constants/path";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/Success";
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
import UserSetting from "./pages/UserSetting";
import UserProfile from "./pages/UserProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route
          path={ROUTES.PASSWORD_RESET}
          element={<ResetPasswordRequest />}
        />
        <Route
          path={ROUTES.PASSWORD_RESET_CONFIRM}
          element={<ResetPassword />}
        />
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.REGISTER_SUCCESS} element={<RegisterSuccess />} />

          <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
          <Route element={<RequireAuth allowedRole={"user"} />}>
            <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
            <Route path={ROUTES.USER_SETTING} element={<UserSetting />} />
            <Route path={ROUTES.VERIFY} element={<Verify />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
