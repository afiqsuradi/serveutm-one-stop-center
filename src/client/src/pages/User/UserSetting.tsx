import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/Auth/useAuth";
import AccountSetting from "./AccountSetting";

const UserSetting = () => {
  const { Auth } = useAuth();
  return (
    <div className="container">
      <Tabs defaultValue="account" className="w-full py-12">
        <TabsList
          className={`grid w-full ${
            Auth.role === "service_provider" ? "grid-cols-2" : "grid-cols-1"
          }`}
        >
          <TabsTrigger value="account">Account Setting</TabsTrigger>
          {Auth.role === "service_provider" ? (
            <TabsTrigger value="profile">Profile Setting</TabsTrigger>
          ) : (
            ""
          )}
        </TabsList>
        <TabsContent value="account">
          <AccountSetting />
        </TabsContent>
        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Current password</Label>
                <Input id="current" type="password" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new">New password</Label>
                <Input id="new" type="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserSetting;
