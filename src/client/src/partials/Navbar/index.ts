import ROUTES from "@/constant/routes";

export interface NavLinksType {
  name: string;
  to: string;
  role: ("user" | "service_provider" | "admin" | "all")[];
  currentLocation?: string;
}

export const menus: NavLinksType[] = [
  {
    name: "Dashboard",
    to: ROUTES.DASHBOARD,
    role: ["user", "service_provider"],
  },
  { name: "Services", to: ROUTES.VIEW_SERVICES, role: ["all"] },
  { name: "About", to: ROUTES.ABOUT_US, role: ["all"] },
  { name: "Contact", to: ROUTES.CONTACT_US, role: ["all"] },
];
