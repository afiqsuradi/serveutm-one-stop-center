import ServiceProviderDashboard from "@/components/Service_Provider/ServiceProviderDashboard";
import { useAuth } from "@/hooks/Auth/useAuth";

const Dashboard = () => {
  const { Auth } = useAuth();
  if (Auth.role === "service_provider") return <ServiceProviderDashboard />;
  return <div>Dashboard</div>;
};

export default Dashboard;
