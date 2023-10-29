import { PricingPackageType } from "./Service";
import { GigsTypeOption } from "@/interface/Service";

export type OrderType = {
  _id: string;
  requirement: string;
  placed: string;
  total: number;
  quantity: number;
  paymentStatus: string;
  fullfillmentStatus: string;
  package: PricingPackageType;
  user: {
    name: string;
    username: string;
    profileImage: string;
  };
  service: {
    title: string;
    description: string;
    category: (typeof GigsTypeOption)[number];
    images: string[];
  };
};
