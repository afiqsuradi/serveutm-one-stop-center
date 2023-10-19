import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import useAxiosPrivate from "./useAxiosPrivate";

interface ResendTokenNotification {
  title: string;
  message: string;
  status: "error" | "success";
}

interface responseType {
  message: string;
}

const useResendVerifyEmail = () => {
  const privateApiClient = useAxiosPrivate();
  const toast = useToast();
  const [notification, setNotification] = useState<ResendTokenNotification>({
    title: "",
    message: "",
    status: "error",
  });
  const requestToken = async () => {
    try {
      const res = await privateApiClient.get("/api/verify/resend", {
        withCredentials: true,
      });
      if (res.status === 200)
        return setNotification({
          title: "Successfully",
          message: "A new token has been sent to your email",
          status: "success",
        });
    } catch (error) {
      setNotification({
        title: "Failed to resend token",
        message:
          (error as AxiosError<responseType>).response?.data.message ||
          (error as AxiosError).message,
        status: "error",
      });
    }
  };

  useEffect(() => {
    if (notification.message) {
      toast({
        title: notification.title,
        description: notification.message,
        status: notification.status,
        isClosable: true,
      });
      setNotification({ title: "", message: "", status: "error" });
    }
  }, [notification]);
  return { requestToken, setNotification };
};

export default useResendVerifyEmail;
