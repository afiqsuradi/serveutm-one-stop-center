import { useAuth } from "../Auth/useAuth";
import useData from "../useData";
import { OrderType } from "@/interface/Orders";

interface StatsResponse {
  total_revenue: number;
  sales: number;
  active: number;
  canceled: number;
  recent: OrderType[];
}

const useGetProviderStats = () => {
  const { Auth } = useAuth();
  const { data, isLoading, error } = useData<StatsResponse>(
    "/api/dashboard/service-provider/stats",
    {},
    [Auth.accessToken]
  );
  return { data, isLoading, error };
};

export default useGetProviderStats;
