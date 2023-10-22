import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { useAuth } from "@/hooks/Auth/useAuth";
import useGetUser from "@/hooks/User/useGetUser";
import useUpdateAccount from "@/hooks/User/useUpdateAccount";
import {
  accountSettingsStruct,
  accountSettingsStructResolver,
} from "@/types/userDataRule";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const AccountSettingForm = () => {
  const [error, setError] = useState("");
  const { Auth } = useAuth();
  const { data, error: fetchErr } = useGetUser(Auth.username);
  const form = useForm<accountSettingsStruct>({
    resolver: accountSettingsStructResolver,
  });
  const { update, isLoading, error: updateErr } = useUpdateAccount();

  const onUpdate = (data: accountSettingsStruct) => {
    update(data);
  };

  useEffect(() => {
    form.setValue("name", data?.name || "");
    form.setValue("email", data?.email || "");
    form.setValue("username", data?.username || "");
  }, [data]);

  useEffect(() => {
    if (fetchErr && fetchErr.length > 0) {
      setError(fetchErr);
    }
    if (updateErr && updateErr.length > 0) {
      setError(updateErr);
    }
    setError("");
  }, [fetchErr, updateErr]);

  if (!data) return;
  return (
    <div className="space-y-6">
      {error.length > 0 ? (
        <Alert className="text-start" variant={"destructive"}>
          <FaExclamation />
          <AlertTitle>Update Failed</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        ""
      )}
      <Card className="w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onUpdate)}>
            <CardHeader>
              <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={data.name} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={data.username} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} defaultValue={data.email} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" className="w-[10rem]" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Update"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default AccountSettingForm;
