import { UserInfo } from "@/interface/User";
import useData from "../useData";
import { useAuth } from "../Auth/useAuth";

const useGetUser = (username: string) => {
  const { Auth } = useAuth();
  const { data, isLoading, error } = useData<UserInfo>(
    `api/user/${username}`,
    {},
    [Auth.accessToken, username]
  );
  return { data, isLoading, error };
};

export default useGetUser;
