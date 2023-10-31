import { useAuth } from "../Auth/useAuth";
import useData from "../useData";

interface StatsResponse {
  expenditures: number;
  completed: number;
  active: number;
  canceled: number;
}

const useGetUserStats = () => {
  const { Auth } = useAuth();
  const { data, isLoading, error } = useData<StatsResponse>(
    "/api/dashboard/user/stats",
    {},
    [Auth.accessToken]
  );
  return { data, isLoading, error };
};

export default useGetUserStats;
