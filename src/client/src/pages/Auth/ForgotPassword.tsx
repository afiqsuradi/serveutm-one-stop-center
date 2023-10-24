import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FcLock } from "react-icons/fc";
import { AiFillWarning } from "react-icons/ai";
import { FaExclamation } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { emailRule } from "@/types/userDataRule";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRequestResetPassword } from "@/hooks/Auth/useResetPassword";
import { AiFillCheckCircle } from "react-icons/ai";
import Spinner from "@/components/ui/spinner";

const ForgotPassword = () => {
  const emailSchema = z.object({ email: emailRule });
  const emailResolver = zodResolver(emailSchema);
  type EmailStruct = z.infer<typeof emailSchema>;
  const form = useForm<EmailStruct>({
    resolver: emailResolver,
    defaultValues: { email: "" },
  });
  const { requestReset, isLoading, error, success } =
    useRequestResetPassword<EmailStruct>();

  const onSubmit = (data: EmailStruct) => {
    requestReset(data);
  };
  return (
    <div className="container">
      <Card className="sm:max-w-[500px] mx-auto my-14">
        <CardHeader className="text-center">
          <CardTitle>Forgot Password?</CardTitle>
          <CardDescription>You can reset password here.</CardDescription>
        </CardHeader>
        <CardContent>
          <FcLock className="text-[9rem] mx-auto" />
          {error ? (
            <Alert className="text-start" variant={"destructive"}>
              <FaExclamation />
              <AlertTitle>Request Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : success ? (
            <Alert variant={"success"}>
              <AiFillCheckCircle className="w-4 h-4" />
              <AlertTitle>Email Sent</AlertTitle>
              <AlertDescription>
                Please check your email for further instruction
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AiFillWarning className="w-4 h-4" />
              <AlertTitle>Heads up!</AlertTitle>
              <AlertDescription>
                If you did not give us a real email address when you created
                your account, we cannot send you an email.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Form {...form}>
            <form
              className="space-y-8 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Enter your email to reset your password.
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? <Spinner /> : "Reset Password"}
              </Button>
            </form>
          </Form>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ForgotPassword;
