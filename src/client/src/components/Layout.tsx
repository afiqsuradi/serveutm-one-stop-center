import Header from "@/partials/Navbar/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <div className="w-full border-b sticky top-0">
        <Header />
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
