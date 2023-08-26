import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import RegisterSuccess from "./components/Register/Success";

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
