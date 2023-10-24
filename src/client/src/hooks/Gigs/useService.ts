import useData from "../useData";
import { useAuth } from "../Auth/useAuth";
import { ServiceType } from "@/interface/Service";

const useService = (id: string) => {
  const { Auth } = useAuth();
  const { data, isLoading, error } = useData<ServiceType>(
    `api/services/${id}`,
    {},
    [Auth.accessToken, id]
  );
  return { data, isLoading, error };
};

export default useService;
