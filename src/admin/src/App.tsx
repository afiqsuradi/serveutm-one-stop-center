import { Route, Routes } from "react-router-dom";
import Layout from "./partials/Layout";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Layout />}></Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
