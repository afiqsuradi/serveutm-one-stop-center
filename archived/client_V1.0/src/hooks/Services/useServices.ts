import { useAuth } from "../useAuth";
import useData from "../useData";
import { ServiceType } from "./useService";

export const ServicesSearchTypes = ["", "title", "name", "username"] as const;

export type Services = {
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

const useServices = (filters: ServicesFilterType) => {
  const { Auth } = useAuth();
  const query = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const { isLoading, response, setError } = useData<Services>(
    `/api/services?${query}`,
    {},
    [Auth.accessToken, filters]
  );
  return { data: response, isLoading, setError };
};

export default useServices;
