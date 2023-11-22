import useData from "../useData";
import { ServiceType } from "./useServices";

const useService = (id: string, deps?: any[]) => {
  const { isLoading, response, success } = useData<ServiceType>(
    `api/services/${id}`,
    {},
    deps
  );
  return { isLoading, response, success };
};

export default useService;
