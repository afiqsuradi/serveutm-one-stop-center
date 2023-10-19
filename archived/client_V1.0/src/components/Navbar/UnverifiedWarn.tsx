import { Alert, AlertIcon, Tooltip, Text, Box } from "@chakra-ui/react";
import useResendVerifyEmail from "../../hooks/useResendVerifyEmail";
import { AxiosError } from "axios";

const UnverifiedWarn = () => {
  const { requestToken, setNotification } = useResendVerifyEmail();
  return (
    <Alert
      status="warning"
      variant="left-accent"
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Box display={"flex"}>
        <AlertIcon />
        <Tooltip label="Some features may not be accessible!" bg="orange.300">
          Seems your account is not verified, verify now
        </Tooltip>
      </Box>
      <Text>
        Didn't get an email?{" "}
        <a
          className="cursor-pointer underline hover:text-orange-100"
          onClick={() => {
            requestToken().catch((error) => {
              setNotification({
                title: "Failed to resend token",
                message:
                  (
                    error as AxiosError<{
                      message: string;
                    }>
                  ).response?.data.message || (error as AxiosError).message,
                status: "error",
              });
            });
          }}
        >
          Request new
        </a>
        .
      </Text>
    </Alert>
  );
};

export default UnverifiedWarn;
