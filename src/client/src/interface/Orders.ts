import { PricingPackageType } from "./Service";
import { GigsTypeOption } from "@/interface/Service";

export type OrderType = {
  _id: string;
  requirements: string;
  placed: string;
  total: number;
  quantity: number;
  paymentStatus: string;
  fullfillmentStatus: string;
  package: PricingPackageType;
  serviceOwner: {
    name: string;
    username: string;
    profileImage: string;
  };
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
