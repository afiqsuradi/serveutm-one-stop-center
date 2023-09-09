import { Button, Grid } from "@chakra-ui/react";

const VerifyFailed = () => {
  return (
    <Grid display={"grid"} minH="full" placeItems="center">
      <div className="text-center">
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-red-500 sm:text-5xl">
          Verification Failed
        </h1>
        <p className="mt-6 text-base leading-7 text-white">
          Your token may be expired, please click the button below to request a
          new one.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Button
            variant="base"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Request New Token
          </Button>
        </div>
      </div>
    </Grid>
  );
};

export default VerifyFailed;
