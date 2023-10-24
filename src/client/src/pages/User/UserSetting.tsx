import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/Auth/useAuth";
import AccountSetting from "./AccountSetting";
import ProfileSetting from "./ProfileSetting";

const UserSetting = () => {
  const { Auth } = useAuth();
  return (
    <div className="container flex flex-col">
      <Tabs defaultValue="account" className="w-full mx-auto py-12">
        <TabsList
          className={`grid w-full ${
            Auth.role === "service_provider" ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <TabsTrigger value="account">Account Settings</TabsTrigger>
          {Auth.role === "service_provider" ? (
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
          ) : (
            ""
          )}
        </TabsList>
        <TabsContent value="account">
          <AccountSetting />
        </TabsContent>
        <TabsContent value="profile">
          <ProfileSetting />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSetting;
