import { Route, Routes } from "react-router-dom";
import Layout from "./partials/Layout";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import routes from "./constants/routes";
import Profile from "./pages/Dashboard/Profile";
import ProfileSetting from "./pages/Settings/ProfileSetting";
import Users from "./pages/Dashboard/Users/Users";
import EditUser from "./pages/Dashboard/Users/EditUser";
import Inquiries from "./pages/Dashboard/Inquiries/Inquiries";
import Services from "./pages/Dashboard/Services/Services";
import EditService from "./pages/Dashboard/Services/EditService";
import Dashboard from "./pages/Dashboard/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path={routes.PROFILE} element={<Profile />} />
            <Route path={routes.PROFILE_SETTING} element={<ProfileSetting />} />
            <Route path={routes.USERS} element={<Users />} />
            <Route path={routes.SERVICES} element={<Services />} />
            <Route path={routes.EDIT_USER} element={<EditUser />} />
            <Route path={routes.EDIT_SERVICE} element={<EditService />} />
            <Route path={routes.INQUIRY} element={<Inquiries />} />
            <Route path={routes.DASHBOARD} element={<Dashboard />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
