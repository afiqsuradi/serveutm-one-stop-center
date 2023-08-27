import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/Success";
import { LOGIN, REGISTER, REGISTER_SUCCESS, VERIFY } from "./constants/path";
import Verify from "./pages/Verify";
import Layout from "./components/Layout";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={REGISTER} element={<Register />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER_SUCCESS} element={<RegisterSuccess />} />
        <Route path={VERIFY} element={<Verify />} />
      </Route>
    </Routes>
  );
}

export default App;
