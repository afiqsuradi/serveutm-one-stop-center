import { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRefresh } from "../useRefresh";
import usePut from "../usePut";
import { ServiceProviderInfo } from "./useServiceProviderProfile";

const useUpdateServiceProvider = (target: string) => {
  const refresh = useRefresh();
  const { isLoading, put } = usePut<string, AxiosResponse>(
    "/api/service-provider",
    {
      headers: { "Content-Type": "application/json" },
      params: {
        user: target,
      },
    }
  );

  const updateServiceProvider = async (data: ServiceProviderInfo) => {
    const response = await put(JSON.stringify(data));
    if (response) {
      await refresh();
      toast.success("Data successfully updated", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return { isLoading, updateServiceProvider };
};

export default useUpdateServiceProvider;
