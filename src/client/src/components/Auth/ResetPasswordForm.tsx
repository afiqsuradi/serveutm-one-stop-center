import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { PassResetStruct, PassResetStructResolver } from "@/types/userDataRule";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Spinner from "../ui/spinner";
import { useResetPassword } from "@/hooks/Auth/useResetPassword";
import { useEffect, useState } from "react";
import ResetPasswordSuccessModal from "./ResetPasswordSuccessModal";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";

interface Props {
  token: string;
  isValid: boolean;
}

const ResetPasswordForm = ({ isValid, token }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const form = useForm<PassResetStruct>({
    resolver: PassResetStructResolver,
    defaultValues: { password: "", confirmPassword: "" },
  });
  const { reset, isLoading, error, success } = useResetPassword(token);

  const onSubmit = (data: PassResetStruct) => {
    reset(data);
  };

  const onCloseModal = (val: boolean) => {
    setIsOpen(val);
    navigate(ROUTES.LOGIN);
  };

  useEffect(() => {
    if (success) {
      setIsOpen(true);
    }
  }, [success]);

  return (
    <>
      <ResetPasswordSuccessModal isOpen={isOpen} setIsOpen={onCloseModal} />
      <Form {...form}>
        <form
          className="space-y-8 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="password"
                    disabled={!isValid}
                    required
                  />
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
                  <Input
                    {...field}
                    type="password"
                    disabled={!isValid}
                    required
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error ? (
            <Alert className="text-start" variant={"destructive"}>
              <FaExclamation />
              <AlertTitle>Reset Failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            ""
          )}
          <Button
            type="submit"
            className="w-full"
            disabled={isLoading || !isValid}
          >
            {isLoading ? <Spinner /> : "Reset Password"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default ResetPasswordForm;
