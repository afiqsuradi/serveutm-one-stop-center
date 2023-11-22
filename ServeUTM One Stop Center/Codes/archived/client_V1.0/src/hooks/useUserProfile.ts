import { useAuth } from "./useAuth";
import { UserProfile } from "../interface/ProviderInfo";
import useData from "./useData";

const useUserProfile = (username: string, role?: string) => {
  const { Auth } = useAuth();
  const { isLoading, response, setError } = useData<UserProfile>(
    `api/service-provider/${username}`,
    {},
    [Auth.accessToken, username, role]
  );
  return { isLoading, response, setError };
};

export default useUserProfile;
