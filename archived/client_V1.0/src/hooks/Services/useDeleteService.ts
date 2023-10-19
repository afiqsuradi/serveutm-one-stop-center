import { useEffect, useState } from "react";
import { ErrorData } from "../../services/apiClient";
import useAxiosPrivate from "../useAxiosPrivate";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useRefresh } from "../useRefresh";
import { useAuth } from "../useAuth";

interface ProviderProfileNotification {
  title: string;
  status: "success" | "error" | "warning" | "info";
  description: string;
}
const useDeleteService = () => {
  const refresh = useRefresh();
  const { Auth } = useAuth();
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
  const deleteService = async (serviceId: string) => {
    try {
      setIsLoading(true);
      const response = await privateApiClient.delete(
        `api/services/${Auth.username}`,
        { data: { serviceId } }
      );
      if (response.status === 200) {
        setNotification({
          title: "Gigs Updated.",
          status: "success",
          description: "Successfully deleted a gig.",
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

  return { deleteService, isLoading, setIsLoading, setNotification };
};

export default useDeleteService;
