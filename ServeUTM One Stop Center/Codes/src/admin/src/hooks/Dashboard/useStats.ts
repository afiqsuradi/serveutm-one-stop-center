import { ServiceType } from "../Services/useServices";
import useData from "../useData";

type monthlyData = {
  name: string;
  total: number;
};

export type StatsType = {
  statistic: {
    active_user: number;
    new_user: number;
    active_gigs: number;
    completed_order: number;
  };
  monthly_user: monthlyData[];
  monthly_service: monthlyData[];
  unapproved_services: ServiceType[];
};

const useStats = () => {
  const { isLoading, response, success } = useData<StatsType>(
    "/api/dashboard/admin/stats"
  );
  return { isLoading, response, success };
};

export default useStats;
