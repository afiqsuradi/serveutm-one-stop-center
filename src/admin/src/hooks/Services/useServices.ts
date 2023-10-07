import useData from "../useData";
import { useAuth } from "../useAuth";
import { User } from "../Users/useUsers";

export const GigsTypeOption = [
  "Technical Expertise",
  "Service",
  "Education",
] as const;

export const ServicesSearchTypes = ["title", "category", "status"] as const;

export type PricingPackageType = {
  title: string;
  description: string;
  price: number;
};

export type FaqType = {
  question: string;
  answer: string;
};

export type ServiceType = {
  title: string;
  description: string;
  category: (typeof GigsTypeOption)[number] | "";
  faq: FaqType[];
  pricePackage: PricingPackageType[];
  images: string[];
  isApproved?: boolean;
  owner: User;
};

export type ServicesFilterType = {
  textInput?: string;
  type?: (typeof ServicesSearchTypes)[number];
  gigStatus?: boolean;
  page?: number;
  limit: number;
};

export type Services = {
  count: number;
  services: ServiceType[];
};

const useServices = (filters: ServicesFilterType) => {
  const { Auth } = useAuth();
  const query = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const { isLoading, response, setError } = useData<Services>(
    `/api/services?${query}`,
    {},
    [filters, Auth.accessToken]
  );
  return { data: response, isLoading, setError };
};

export default useServices;
