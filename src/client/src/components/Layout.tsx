import Header from "@/partials/Navbar/Header";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <>
      <div className="w-full border-b sticky top-0 bg-background z-[99999]">
        <Header />
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
