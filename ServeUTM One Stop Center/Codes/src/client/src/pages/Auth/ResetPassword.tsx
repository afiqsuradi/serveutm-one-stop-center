import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { FaExclamation } from "react-icons/fa";
import { useValidResetToken } from "@/hooks/Auth/useResetPassword";
import { useEffect } from "react";
import ResetPasswordForm from "@/components/Auth/ResetPasswordForm";
import key from "@/assets/key.svg";

const ResetPassword = () => {
  const token = new URLSearchParams(location.search).get("token") || "";
  const { checkValidity, error, isValid } = useValidResetToken();

  useEffect(() => {
    checkValidity(token);
  }, [token]);

  return (
    <div className="container">
      <Card className="sm:max-w-[500px] mx-auto my-14">
        <CardHeader className="text-center">
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>You can reset password here.</CardDescription>
        </CardHeader>
        <CardContent>
          <img src={key} className="w-[9rem] mx-auto mb-6" />
          {error && !isValid ? (
            <Alert className="text-start" variant={"destructive"}>
              <FaExclamation />
              <AlertTitle>Access Denied!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : (
            ""
          )}
        </CardContent>
        <CardFooter>
          <ResetPasswordForm token={token} isValid={isValid} />
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPassword;
