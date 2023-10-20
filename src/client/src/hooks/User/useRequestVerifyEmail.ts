import { useState } from "react";
import usePrivateApiClient from "../usePrivateApiClient";
import { useToast } from "@/components/ui/use-toast";

const useRequestVerifyEmail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const apiClient = usePrivateApiClient();
  const requestToken = async () => {
    try {
      setIsLoading(true);
      const res = await apiClient.get("/api/verify/resend");
      if (res && res.status >= 200 && res.status < 300) {
        toast({
          variant: "success",
          description: "A verification link has been sent to your email.",
        });
      }
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return { requestToken, isLoading };
};

export default useRequestVerifyEmail;
