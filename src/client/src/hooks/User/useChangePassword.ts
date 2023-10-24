import { PassChangeStruct } from "@/types/userDataRule";
import usePut from "../usePut";
import { AxiosResponse } from "axios";
import { useToast } from "@/components/ui/use-toast";

const useChangePassword = () => {
  const { toast } = useToast();
  const { isLoading, put, error } = usePut<string, AxiosResponse>(
    "/api/user/password",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const update = async (data: PassChangeStruct) => {
    try {
      const result = await put(JSON.stringify(data));
      if (result && result.status >= 200 && result.status < 300) {
        toast({
          variant: "success",
          description: "Successfully changed password.",
        });
      }
    } catch (error) {
      //
    }
  };

  return { update, isLoading, error };
};

export default useChangePassword;
