export const GigsTypeOption = [
  "Technical Expertise",
  "Service",
  "Education",
] as const;

export type PricingPackageType = {
  title: string;
  description: string;
  price: number;
};

export type FaqType = {
  question: string;
  answer: string;
};

export type OwnerType = {
  profileImage: string;
  name: string;
  username: string;
};

export type ServiceType = {
  _id?: string;
  owner?: OwnerType;
  title: string;
  description: string;
  category: (typeof GigsTypeOption)[number] | "";
  faq: FaqType[];
  pricePackage: PricingPackageType[];
  images: string[];
  isApproved?: string;
};

export const ServicesSearchTypes = ["", "title", "name", "username"] as const;

export type ServicesResponse = {
  count: number;
  services: ServiceType[];
};

export type ServicesFilterType = {
  textInput?: string;
  type?: (typeof ServicesSearchTypes)[number];
  gigStatus?: string;
  page?: number;
  limit: number;
};
