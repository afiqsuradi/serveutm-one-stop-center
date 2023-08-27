import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterSuccess from "./pages/Success";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/signup/success" element={<RegisterSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
