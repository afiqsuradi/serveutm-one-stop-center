import { Route, Routes } from "react-router";
import ROUTES from "./constant/routes";
import Login from "./pages/Auth/Login";
import Layout from "./components/Layout";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
        <Route path={ROUTES.REGISTER} element={<Register />} />
      </Route>
    </Routes>
  );
}

export default App;
