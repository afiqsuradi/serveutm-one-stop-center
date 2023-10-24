import { Route, Routes } from "react-router";
import ROUTES from "./constant/routes";
import Login from "./pages/Auth/Login";
import Layout from "./components/Layout";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PersistLogin from "./components/Auth/PersistLogin";
import RequireAuth from "./components/Auth/RequireAuth";
import UserProfile from "./pages/User/UserProfile";
import Verify from "./pages/Auth/Verify";
import GigDetail from "./pages/Gigs/GigDetail";
import RegisterProvider from "./pages/Service_Provider/RegisterProvider";
import RequireVerified from "./components/Auth/RequireVerified";
import UserSetting from "./pages/User/UserSetting";
import AddGig from "./pages/Gigs/AddGig";
import { ServiceProvider } from "./context/gigProvider";
import EditGig from "./pages/Gigs/EditGig";
import ServicesList from "./pages/ServicesList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.PASSWORD_RESET} element={<ForgotPassword />} />
        <Route
          path={ROUTES.PASSWORD_RESET_CONFIRM}
          element={<ResetPassword />}
        />
        <Route element={<PersistLogin />}>
          <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
          <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
          <Route path={ROUTES.VERIFY} element={<Verify />} />
          <Route path={ROUTES.USER_PROFILE} element={<UserProfile />} />
          <Route path={ROUTES.VIEW_SERVICE_SPECIFIC} element={<GigDetail />} />
          <Route path={ROUTES.VIEW_SERVICES} element={<ServicesList />} />
          <Route
            element={<RequireAuth allowedRole={["user", "service_provider"]} />}
          >
            <Route path={ROUTES.USER_SETTING} element={<UserSetting />} />

            <Route element={<RequireAuth allowedRole={["service_provider"]} />}>
              <Route
                path={ROUTES.ADD_SERVICE}
                element={
                  <ServiceProvider>
                    <AddGig />
                  </ServiceProvider>
                }
              />
              <Route
                path={ROUTES.EDIT_SERVICE}
                element={
                  <ServiceProvider>
                    <EditGig />
                  </ServiceProvider>
                }
              />
            </Route>
            <Route element={<RequireAuth allowedRole={["user"]} />}>
              <Route
                element={<RequireVerified fallback={ROUTES.USER_PROFILE} />}
              >
                <Route
                  element={<RegisterProvider />}
                  path={ROUTES.PROVIDER_REGISTER}
                />
              </Route>
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
