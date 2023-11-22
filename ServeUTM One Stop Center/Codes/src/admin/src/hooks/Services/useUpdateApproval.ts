import { AxiosResponse } from "axios";
import usePut from "../usePut";

const useUpdateApproval = (target: string) => {
  const { isLoading, put } = usePut<string, AxiosResponse>(
    "/api/services/approval",
    {
      headers: { "Content-Type": "application/json" },
      params: {
        serviceId: target,
      },
    }
  );

  const updateApproval = async (data: string) => {
    return await put(JSON.stringify({ isApproved: data }));
  };

  return { isLoading, updateApproval };
};

export default useUpdateApproval;
