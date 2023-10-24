import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ROUTES from "@/constant/routes";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { LoginStruct, LoginStructResolver } from "@/types/userDataRule";
import { FaExclamation } from "react-icons/fa";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import useLogin from "@/hooks/Auth/useLogin";
import Spinner from "../ui/spinner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
const LoginForm = () => {
  const [showPass, setShowPass] = useState(false);
  const form = useForm<LoginStruct>({
    resolver: LoginStructResolver,
    defaultValues: { username: "", password: "" },
  });
  const { login, isLoading, error } = useLogin();

  const togglePass = () => setShowPass(!showPass);

  const onSubmit = (data: LoginStruct) => {
    login(data);
  };
  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {error ? (
          <Alert className="text-start" variant={"destructive"}>
            <FaExclamation />
            <AlertTitle>Login Failed</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        ) : (
          ""
        )}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Username" {...field} className="text-md" />
              </FormControl>
              <FormMessage className="text-start" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    placeholder="Password"
                    type={showPass ? "text" : "password"}
                    className="text-md"
                  />
                  <div
                    className="absolute top-[50%] translate-y-[-50%] right-3 text-2xl hover:cursor-pointer"
                    onClick={togglePass}
                  >
                    {showPass ? <BsEyeSlash /> : <BsEye />}
                  </div>
                </div>
              </FormControl>
              <FormMessage className="text-start" />
            </FormItem>
          )}
        />

        <div className="flex justify-end">
          <p className="w-max underline hover:cursor-pointer hover:text-foreground/60">
            <Link to={ROUTES.PASSWORD_RESET}>Forgot Password</Link>
          </p>
        </div>
        <Button className="w-full" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Sign In"}
        </Button>
        <p className="ml-auto">
          Not a member?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="underline hover:text-foreground/60 transition-colors"
          >
            Register now
          </Link>
        </p>
      </form>
    </Form>
  );
};

export default LoginForm;
