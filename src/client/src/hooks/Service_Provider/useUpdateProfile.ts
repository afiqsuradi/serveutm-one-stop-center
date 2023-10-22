import { useRefresh } from "../Auth/useRefresh";
import usePut from "../usePut";
import { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ProviderInfo } from "@/interface/Provider";

const useUpdateProfile = () => {
  const { toast } = useToast();
  const refresh = useRefresh();
  const { isLoading, post, error } = usePut<string, AxiosResponse>(
    "/api/service-provider",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const update = async (data: ProviderInfo) => {
    try {
      const result = await post(JSON.stringify(data));
      if (result && result.status >= 200 && result.status < 300) {
        toast({
          variant: "success",
          description: "Successfully updated account profile.",
        });
        await refresh();
      }
    } catch (error) {
      //
    }
  };

  return { update, isLoading, error };
};

export default useUpdateProfile;
