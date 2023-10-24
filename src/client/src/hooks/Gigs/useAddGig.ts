import usePost from "../usePost";
import { AxiosResponse } from "axios";
import { ServiceType } from "@/interface/Service";
import usePrivateApiClient from "../usePrivateApiClient";
import { blobUrlsToFiles } from "./utils/converter";
import { useState } from "react";

const useAddGig = () => {
  const [success, setSuccess] = useState(false);
  const apiClient = usePrivateApiClient();
  const { isLoading, post, error, setIsLoading } = usePost<
    FormData,
    AxiosResponse
  >("api/services", {
    headers: { "Content-Type": "multipart/form-data" },
  });
  const publish = async (data: ServiceType) => {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("json", JSON.stringify(data));
      const files = await blobUrlsToFiles(apiClient, data.images);
      files.forEach((file) => {
        formData.append("images", file);
      });
      const result = await post(formData);

      console.info(4);
      if (result && result.status >= 200 && result.status < 300) {
        setSuccess(true);
      }
    } catch (error) {
      //
    }
  };

  return { publish, isLoading, error, success };
};

export default useAddGig;
