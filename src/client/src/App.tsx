import { Route, Routes } from "react-router";
import ROUTES from "./constant/routes";
import Login from "./pages/Login";
import Layout from "./components/Layout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={ROUTES.LOGIN} element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
