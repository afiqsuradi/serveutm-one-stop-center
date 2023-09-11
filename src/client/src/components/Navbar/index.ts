import Navbar from "./Navbar";
import ROUTES from "../../constants/path";

export default Navbar;

export interface NavLinksType {
  name: string;
  to: string;
  role: "user" | "service_provider" | "admin" | "all";
  currentLocation?: string;
}

export const navigation: NavLinksType[] = [
  { name: "Home", to: ROUTES.HOMEPAGE, role: "all" },
  { name: "Dashboard", to: ROUTES.DASHBOARD, role: "all" },
  { name: "About", to: ROUTES.ABOUT_US, role: "all" },
  { name: "Contact", to: ROUTES.CONTACT_US, role: "all" },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
