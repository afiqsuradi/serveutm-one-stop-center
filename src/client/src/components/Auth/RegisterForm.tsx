import { RegisterStruct, RegisterStructResolver } from "@/types/userDataRule";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import ROUTES from "@/constant/routes";
import useRegister from "@/hooks/Auth/useRegister";
import Spinner from "../ui/spinner";
import { FaExclamation } from "react-icons/fa";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

const RegisterForm = () => {
  const form = useForm<RegisterStruct>({
    resolver: RegisterStructResolver,
    defaultValues: { username: "", password: "" },
  });
  const { register, isLoading, error } = useRegister();

  const onSubmit = (data: RegisterStruct) => {
    register(data);
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6 text-start"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {error ? (
          <Alert className="text-start" variant={"destructive"}>
            <FaExclamation />
            <AlertTitle>User Registration Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input {...field} type="text" required />
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
                <Input {...field} type="text" required />
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
                <Input {...field} type="email" required />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Register"}
        </Button>
        <p className="text-center">
          Already have an account?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="underline hover:text-foreground/60 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default RegisterForm;
