import { useAuth } from "@/hooks/Auth/useAuth";
import Header from "@/partials/Navbar/Header";
import VerifyHeader from "@/partials/VerifyHeader";
import { Outlet } from "react-router";

const Layout = () => {
  const { Auth } = useAuth();
  return (
    <>
      <div className="w-full bg-background z-[10]  sticky top-0">
        <div className="border-b ">
          <Header />
        </div>
        {Auth.accessToken.length > 0 && !Auth.isVerified ? (
          <VerifyHeader />
        ) : (
          ""
        )}
      </div>
      <Outlet />
    </>
  );
};

export default Layout;
