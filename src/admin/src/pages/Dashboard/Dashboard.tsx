import ServiceChart from "../../components/Dashboard/ServiceChart";
import Statistic from "../../components/Dashboard/Statistic";
import UnverifiedService from "../../components/Dashboard/UnverifiedService";
import UserChart from "../../components/Dashboard/UserChart";
import useStats from "../../hooks/Dashboard/useStats";

const Dashboard = () => {
  const { response, isLoading } = useStats();
  return (
    <div className="md:w-[90%] mx-auto py-6 space-y-6">
      {isLoading ? (
        <span className="loading loading-spinner loading-lg"></span>
      ) : (
        ""
      )}
      {response && <Statistic data={response.statistic} />}
      <div className="grid grid-cols-[3fr_2fr] grid-rows-2 gap-6">
        {response && <UserChart data={response.monthly_user} />}
        {response && <ServiceChart data={response.monthly_service} />}
        <UnverifiedService data={response?.unapproved_services} />
      </div>
    </div>
  );
};

export default Dashboard;
