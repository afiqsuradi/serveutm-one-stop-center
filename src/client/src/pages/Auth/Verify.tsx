import { Button } from "@/components/ui/button";
import ROUTES from "@/constant/routes";
import { useAuth } from "@/hooks/Auth/useAuth";
import useVerify from "@/hooks/Auth/useVerify";
import useRequestVerifyEmail from "@/hooks/User/useRequestVerifyEmail";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Verify = () => {
  const { Auth } = useAuth();
  const token = new URLSearchParams(location.search).get("token") || "";
  const { verify, isLoading, error } = useVerify();
  const { requestToken, isLoading: requestLoading } = useRequestVerifyEmail();

  const onRequest = () => {
    if (requestLoading) return;
    requestToken();
  };

  useEffect(() => {
    if (!isLoading) {
      verify(token);
    }
  }, []);
  if (isLoading) return;
  if (Auth.isVerified) {
    return (
      <div className="container p-12 flex justify-center items-center flex-col text-center my-12 border">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-primary sm:text-5xl">
          Successfully Verified
        </h1>
        <p className="mt-6 text-base leading-7 text-background-foreground">
          Thanks for verifying your email. You may now use our site's feature to
          the fullest.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={ROUTES.HOMEPAGE}
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/75"
          >
            Go back home
          </Link>
        </div>
      </div>
    );
  }
  if (!isLoading && error) {
    return (
      <div className="container p-12 flex justify-center items-center flex-col text-center my-12 border">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-destructive sm:text-5xl">
          Verification Failed
        </h1>
        <p className="mt-6 text-base leading-7 text-background-foreground">
          Your token may be expired, please click the button below to request a
          new one.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/75"
            onClick={onRequest}
          >
            Request New Token
          </Button>
        </div>
      </div>
    );
  }
};

export default Verify;
