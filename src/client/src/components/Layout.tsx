import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <header>
          <Navbar />
        </header>
        <main className="App flex-1">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
