import { Route, Routes } from "react-router";
import ROUTES from "./constant/routes";
import Login from "./pages/Auth/Login";
import Layout from "./components/Layout";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
        <Route path={ROUTES.PASSWORD_RESET} element={<ForgotPassword />} />
      </Route>
    </Routes>
  );
}

export default App;
