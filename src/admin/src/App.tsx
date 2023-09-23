import { Route, Routes } from "react-router-dom";
import Layout from "./partials/Layout";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import routes from "./constants/routes";
import Profile from "./pages/Profile";
import ProfileSetting from "./pages/Settings/ProfileSetting";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}>
            <Route path={routes.PROFILE} element={<Profile />} />
            <Route path={routes.PROFILE_SETTING} element={<ProfileSetting />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
