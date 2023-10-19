import { AxiosError, AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useAuth } from "../useAuth";
import { useRefresh } from "../useRefresh";
import { ServiceType } from "./useService";
import { ErrorData } from "../../services/apiClient";
import { useToast } from "@chakra-ui/react";

async function blobUrlsToFiles(requestor: AxiosInstance, urls: string[]) {
  return Promise.all(
    urls.map(async (url) => {
      if (url.includes("blob")) {
        return await blobUrlToFile(url);
      } else {
        return await imageUrlToFile(requestor, url);
      }
    })
  );
}

async function imageUrlToFile(requestor: AxiosInstance, url: string) {
  // Fetch blob
  const res = await requestor.get<Blob>(url, {
    responseType: "blob",
  });
  const blob = res.data;

  // Construct File object
  const file = new File([blob], "image.jpg");

  return file;
}

async function blobUrlToFile(blobUrlString: string) {
  // Parse blob URL string
  const blobUrl = new URL(blobUrlString);

  // Fetch blob
  const res = await fetch(blobUrl);
  const blob = await res.blob();

  // Construct File object
  const file = new File([blob], "image.jpg");

  return file;
}

const useEditService = (target: string) => {
  const privateApiClient = useAxiosPrivate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const { Auth } = useAuth();
  const [error, setError] = useState("");
  const refresh = useRefresh();

  const updateService = async (data: ServiceType) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      const files = await blobUrlsToFiles(privateApiClient, data.images);
      formData.append("json", JSON.stringify(data));
      files.forEach((file) => {
        formData.append("images", file);
      });
      const response = await privateApiClient.put("api/services/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        params: {
          requestor: Auth.username,
          serviceId: target,
        },
      });
      if (response) {
        await refresh();
        toast({
          title: "Gigs Updated.",
          status: "success",
          description: "Successfully updated a gig.",
          position: "top",
          isClosable: true,
        });
      }
    } catch (error) {
      if (error) {
        if ((error as AxiosError<ErrorData>).response) {
          setError(
            (error as AxiosError<ErrorData>).response?.data.message as string
          );
        } else {
          // If backend crash / not found
          setError((error as AxiosError<ErrorData>).message);
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      if (error) {
        toast({
          title: `${error}`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    }
    setError("");
  }, [error]);

  return { isLoading, updateService };
};

export default useEditService;
