import { ProviderInfo } from "@/interface/Provider";
import { useAuth } from "../Auth/useAuth";
import useData from "../useData";

const useGetProvider = (username: string) => {
  const { Auth } = useAuth();
  const { data, isLoading, error } = useData<ProviderInfo>(
    `api/service-provider/${username}`,
    {},
    [Auth.accessToken, username]
  );
  return { data, isLoading, error };
};

export default useGetProvider;
