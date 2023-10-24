import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";
import NavLinks from "./NavLinks";
import { AuthType } from "@/context/authProvider";
import { Link } from "react-router-dom";
import ROUTES from "@/constant/routes";
const Sidebar = ({ role }: { role: AuthType["role"] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Hamburger = () => {
    return (
      <div
        className="hover:cursor-pointer w-6 h-6"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <MdOutlineClose className="w-full h-full" />
        ) : (
          <GiHamburgerMenu className="w-full h-full" />
        )}
      </div>
    );
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as Node;
    if (event.currentTarget === target) {
      setIsOpen(false);
    }
  };

  return (
    <>
      <Hamburger />
      <div
        onClick={handleClick}
        data-status={`${isOpen ? "open" : "closed"}`}
        className="translate-x-[-100%] data-[status=open]:translate-x-0 transition-all absolute top-0 left-0 w-full h-screen z-50 backdrop-blur-sm"
      >
        <div className="ml-0 h-full max-w-[80%] bg-background border-r p-6 grid grid-cols-2 justify-items-end">
          <div className="flex flex-col space-y-6 justify-self-start">
            <Link to={ROUTES.HOMEPAGE} className="text-xl mr-6">
              ServeUTM
            </Link>
            <NavLinks role={role} />
          </div>
          <Hamburger />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
