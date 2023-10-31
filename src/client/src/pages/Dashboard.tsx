import ServiceProviderDashboard from "@/components/Service_Provider/ServiceProviderDashboard";
import UserDashboard from "@/components/User/UserDashboard";
import { useAuth } from "@/hooks/Auth/useAuth";

const Dashboard = () => {
  const { Auth } = useAuth();
  if (Auth.role === "service_provider") return <ServiceProviderDashboard />;
  if (Auth.role === "user") return <UserDashboard />;
  return <div>Dashboard</div>;
};

export default Dashboard;
