import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/Success";
import {
  HOMEPAGE,
  LOGIN,
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={REGISTER} element={<Register />} />
        <Route path={LOGIN} element={<Login />} />
        <Route element={<PersistLogin />}>
          <Route path={REGISTER_SUCCESS} element={<RegisterSuccess />} />

          <Route path={HOMEPAGE} element={<Homepage />} />

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
