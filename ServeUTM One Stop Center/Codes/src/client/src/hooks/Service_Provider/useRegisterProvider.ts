import usePost from "../usePost";
import { AxiosResponse } from "axios";
import { useState } from "react";
import { ProviderInfo } from "@/interface/Provider";

const useRegisterProvider = () => {
  const [success, setSuccess] = useState(false);
  const { isLoading, post, error } = usePost<string, AxiosResponse>(
    "/api/service-provider/register",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const register = async (data: ProviderInfo) => {
    try {
      const result = await post(JSON.stringify(data));
      if (result && result.status >= 200 && result.status < 300) {
        setSuccess(true);
      }
    } catch (error) {
      //
    }
  };

  return { register, success, isLoading, error };
};

export default useRegisterProvider;
