import { ServicesFilterType, ServicesResponse } from "@/interface/Service";
import { useAuth } from "../Auth/useAuth";
import useData from "../useData";
import useDebounce from "../useDebounce";

const useServices = (filters: ServicesFilterType) => {
  filters.gigStatus = "Approved";
  const debounceValue = useDebounce<ServicesFilterType>(filters);
  const { Auth } = useAuth();
  const query = Object.entries(debounceValue || filters)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const { isLoading, data, error } = useData<ServicesResponse>(
    `/api/services?${query}`,
    {},
    [Auth.accessToken, JSON.stringify(debounceValue)]
  );
  return { data, isLoading, error };
};

export default useServices;
