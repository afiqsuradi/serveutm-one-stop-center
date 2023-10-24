import { useEffect, useState } from "react";
import { UserProfile } from "../../interface/ProviderInfo";
import { ErrorData } from "../../services/apiClient";
import useAxiosPrivate from "../useAxiosPrivate";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRefresh } from "../useRefresh";
interface ProviderProfileNotification {
  title: string;
  status: "success" | "error" | "warning" | "info";
  description: string;
}
const useUpdateProvider = () => {
  const refresh = useRefresh();
  const [isLoading, setIsLoading] = useState(false);
  const privateApiClient = useAxiosPrivate();
  const toast = useToast();
  const [notification, setNotification] = useState<ProviderProfileNotification>(
    {
      title: "",
      status: "error",
      description: "",
    }
  );
  const update = async (ProviderInfo: UserProfile) => {
    try {
      setIsLoading(true);
      const response = await privateApiClient.put(
        "/api/service-provider",
        JSON.stringify(ProviderInfo),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setNotification({
          title: "Profile Updated.",
          status: "success",
          description: "Your profile has been successfully updated.",
        });
        setIsLoading(false);
        await refresh();
      }
    } catch (error) {
      if ((error as AxiosError<ErrorData>).response) {
        setNotification({
          title: "Something went wrong",
          status: "error",
          description: (error as AxiosError<ErrorData>).response?.data
            .message as string,
        });
      } else {
        setNotification({
          title: "Network Error",
          status: "error",
          description: "Couldn't connect to the server",
        });
      }
    }
  };
  useEffect(() => {
    if (notification?.title && notification.description) {
      toast({
        title: notification.title,
        description: notification.description,
        status: notification.status,
        isClosable: true,
      });
      setNotification({ title: "", status: "warning", description: "" });
    }
  }, [notification]);

  return { update, isLoading, setIsLoading, setNotification };
};

export default useUpdateProvider;
