import { Grid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import ROUTES from "../../constants/path";

const VerifySuccess = () => {
  return (
    <Grid display={"grid"} minH="full" placeItems="center">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
          Successfully Verified
        </h1>
        <p className="mt-6 text-base leading-7 text-white">
          Thanks for verifying your email. You may now use our site's feature to
          the fullest.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to={ROUTES.HOMEPAGE}
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back home
          </Link>
        </div>
      </div>
    </Grid>
  );
};

export default VerifySuccess;
