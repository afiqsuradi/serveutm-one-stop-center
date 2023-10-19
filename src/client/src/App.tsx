import { Route, Routes } from "react-router";
import ROUTES from "./constant/routes";
import Login from "./pages/Auth/Login";
import Layout from "./components/Layout";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

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
        <Route path={ROUTES.ABOUT_US} element={<AboutUs />} />
        <Route path={ROUTES.CONTACT_US} element={<ContactUs />} />
      </Route>
    </Routes>
  );
}

export default App;
