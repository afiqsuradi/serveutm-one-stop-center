import Navbar from "./Navbar";
import { ABOUT_US, CONTACT_US, HOMEPAGE } from "../../constants/path";

export default Navbar;

export interface NavLinksType {
  name: string;
  to: string;
  currentLocation?: string;
}

export const navigation: NavLinksType[] = [
  { name: "Dashboard", to: HOMEPAGE },
  { name: "About Us", to: ABOUT_US },
  { name: "Contact Us", to: CONTACT_US },
];

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
