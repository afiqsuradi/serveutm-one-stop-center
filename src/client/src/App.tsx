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
import RegisterProvider from "./pages/RegisterProvider";
import RequireVerify from "./components/Verify/RequireVerify";
import Dashboard from "./pages/Dashboard/Dashboard";
import AddGig from "./pages/Seller/AddGig";
import ViewServiceDetail from "./pages/Services/ViewServiceDetail";
import EditService from "./pages/Services/EditService";
import ServicesList from "./pages/Services/ServicesList";

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
        {/* LOGIN CHECK / REFRESH */}
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.REGISTER_SUCCESS} element={<RegisterSuccess />} />
          <Route path={ROUTES.HOMEPAGE} element={<Homepage />} />
          <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
          <Route path={ROUTES.VIEW_SERVICES} element={<ServicesList />} />
          <Route
            path={ROUTES.VIEW_SERVICE_SPECIFIC}
            element={<ViewServiceDetail />}
          />
          {/* General link for all users */}
          <Route
            element={<RequireAuth allowedRole={["user", "service_provider"]} />}
          >
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
            <Route path={ROUTES.USER_SETTING} element={<UserSetting />} />
            <Route path={ROUTES.VERIFY} element={<Verify />} />
          </Route>

          {/* Striclty for verified users */}
          <Route element={<RequireVerify />}>
            {/* Strictly For users */}
            <Route element={<RequireAuth allowedRole={["user"]} />}>
              <Route
                path={ROUTES.PROVIDER_REGISTER}
                element={<RegisterProvider />}
              />
            </Route>
            {/* Strictly for service provider */}
            <Route element={<RequireAuth allowedRole={["service_provider"]} />}>
              <Route path={ROUTES.PROVIDER_ADD} element={<AddGig />} />
              <Route path={ROUTES.EDIT_SERVICE} element={<EditService />} />
            </Route>
          </Route>
        </Route>

        <Route path={ROUTES.NOTFOUND} element={<Missing />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
