import Navbar from "./Navbar";
import ROUTES from "../../constants/path";

export default Navbar;

export interface NavLinksType {
  name: string;
  to: string;
  currentLocation?: string;
}

export const navigation: NavLinksType[] = [
  { name: "Dashboard", to: ROUTES.HOMEPAGE },
  { name: "About", to: ROUTES.ABOUT_US },
  { name: "Contact", to: ROUTES.CONTACT_US },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
