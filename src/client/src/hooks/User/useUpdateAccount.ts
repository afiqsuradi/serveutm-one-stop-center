import { accountSettingsStruct } from "@/types/userDataRule";
import { useRefresh } from "../Auth/useRefresh";
import usePut from "../usePut";
import { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

const useUpdateAccount = () => {
  const { toast } = useToast();
  const refresh = useRefresh();
  const { isLoading, put, error } = usePut<string, AxiosResponse>("/api/user", {
    headers: { "Content-Type": "application/json" },
  });
  const update = async (data: accountSettingsStruct) => {
    try {
      const result = await put(JSON.stringify(data));
      if (result && result.status >= 200 && result.status < 300) {
        toast({
          variant: "success",
          description: "Successfully updated account information.",
        });
        await refresh();
      }
    } catch (error) {
      //
    }
  };

  return { update, isLoading, error };
};

export default useUpdateAccount;
