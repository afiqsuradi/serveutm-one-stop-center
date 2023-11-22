import ROUTES from "@/constant/routes";
import { AuthType } from "@/context/authProvider";
import { Link } from "react-router-dom";

interface NavLinksType {
  name: string;
  to: string;
  role: ("user" | "service_provider" | "admin" | "all")[];
  currentLocation?: string;
}

const menus: NavLinksType[] = [
  {
    name: "Dashboard",
    to: ROUTES.DASHBOARD,
    role: ["user", "service_provider"],
  },
  { name: "Services", to: ROUTES.VIEW_SERVICES, role: ["all"] },
  { name: "About", to: ROUTES.ABOUT_US, role: ["all"] },
  { name: "Contact", to: ROUTES.CONTACT_US, role: ["all"] },
];

const NavLinks = ({ role }: { role: AuthType["role"] }) => {
  return (
    <>
      {menus.map((menu, idx) => {
        if (menu.role.includes("all") || (role && menu.role.includes(role))) {
          return (
            <Link
              key={idx}
              to={menu.to}
              className="transition-colors hover:text-foreground/90 text-foreground/60"
            >
              {menu.name}
            </Link>
          );
        }
        return;
      })}
    </>
  );
};

export default NavLinks;
