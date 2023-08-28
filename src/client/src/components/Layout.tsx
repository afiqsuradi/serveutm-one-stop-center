import { Outlet } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { useAuth } from "../hooks/useAuth";
import Navbar from "./Navbar";

const Layout = () => {
  const { Auth } = useAuth();
  const logout = useLogout();
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="App">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
