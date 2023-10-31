import ServiceProviderDashboard from "@/components/Service_Provider/ServiceProviderDashboard";
import UserDashboard from "@/components/User/UserDashboard";
import { useAuth } from "@/hooks/Auth/useAuth";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const { Auth } = useAuth();
  if (Auth.role === "user") return <UserDashboard />;
  return (
    <Tabs defaultValue="user" className=" flex flex-col w-full my-6">
      <div className="container">
        <TabsList>
          <TabsTrigger value="user">User Dashboard</TabsTrigger>
          <TabsTrigger value="seller">Seller Dashboard</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="user">
        <UserDashboard />
      </TabsContent>
      <TabsContent value="seller">
        <ServiceProviderDashboard />
      </TabsContent>
    </Tabs>
  );
};

export default Dashboard;
