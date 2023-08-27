import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/Success";
import { REGISTER, REGISTER_SUCCESS, VERIFY } from "./constants/path";
import Verify from "./pages/Verify";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={REGISTER} element={<Register />} />
        <Route path={REGISTER_SUCCESS} element={<RegisterSuccess />} />
        <Route path={VERIFY} element={<Verify />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
