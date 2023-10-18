import ROUTES from "@/constant/routes";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/Auth/useAuth";
import NavLinks from "./NavLinks";
import { ModeToggle } from "@/components/mode-toggle";
import Sidebar from "./Sidebar";

const Header = () => {
  const { Auth } = useAuth();
  return (
    <header className="container h-14 flex items-center">
      <div className="flex items-center">
        <Link
          to={ROUTES.HOMEPAGE}
          className="hidden md:inline-block text-xl mr-6"
        >
          ServeUTM
        </Link>
        <nav className="flex items-center md:hidden">
          <Sidebar role={Auth.role} />
        </nav>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <NavLinks role={Auth.role} />
        </nav>
      </div>
      <div className="flex flex-1 justify-end space-x-6 items-center">
        <ModeToggle />
        {Auth.role || (
          <>
            <Link to={ROUTES.LOGIN}>Sign In</Link>
            <Link to={ROUTES.LOGIN}>Join Us</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
