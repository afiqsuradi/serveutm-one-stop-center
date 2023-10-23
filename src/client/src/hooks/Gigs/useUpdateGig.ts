import { AxiosResponse } from "axios";
import { ServiceType } from "@/interface/Service";
import usePrivateApiClient from "../usePrivateApiClient";
import { blobUrlsToFiles } from "./utils/converter";
import usePut from "../usePut";
import { useToast } from "@/components/ui/use-toast";
import { useRefresh } from "../Auth/useRefresh";
interface Props {
  id: string;
  username: string;
}

const useUpdateGig = ({ id, username }: Props) => {
  const refresh = useRefresh();
  const { toast } = useToast();
  const apiClient = usePrivateApiClient();
  const { isLoading, put, error, setIsLoading } = usePut<
    FormData,
    AxiosResponse
  >("api/services/", {
    headers: { "Content-Type": "multipart/form-data" },
    params: { requestor: username, serviceId: id },
  });
  const update = async (data: ServiceType) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("json", JSON.stringify(data));
      const files = await blobUrlsToFiles(apiClient, data.images);
      files.forEach((file) => {
        formData.append("images", file);
      });
      const result = await put(formData);
      if (result && result.status >= 200 && result.status < 300) {
        toast({
          variant: "success",
          description: "Successfully updated a gig",
        });
        await refresh();
      }
    } catch (error) {
      //
    }
  };

  return { update, isLoading, error };
};

export default useUpdateGig;
