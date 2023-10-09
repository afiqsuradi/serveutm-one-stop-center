import { useEffect, useState } from "react";
import useAxiosPrivate from "../useAxiosPrivate";
import { useToast } from "@chakra-ui/react";
import { AxiosError } from "axios";
import { ErrorData } from "../../services/apiClient";
import { ServiceType } from "./useService";

async function blobUrlsToFiles(blobUrls: string[]) {
  return Promise.all(
    blobUrls.map(async (blobUrl) => {
      return await blobUrlToFile(blobUrl);
    })
  );
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

// files is now an array of File objects

const useAddGigs = () => {
  const [loading, setLoading] = useState(false);
  const privateApiClient = useAxiosPrivate();
  const [error, setError] = useState("");
  const toast = useToast();

  const publish = async (data: ServiceType) => {
    try {
      const formData = new FormData();
      const files = await blobUrlsToFiles(data.images);
      formData.append("json", JSON.stringify(data));
      files.forEach((file) => {
        formData.append("images", file);
      });
      return await privateApiClient.post("api/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
    } catch (error) {
      if ((error as AxiosError<ErrorData>).response) {
        setError(
          (error as AxiosError<ErrorData>).response?.data.message as string
        );
      } else {
        // If backend crash / not found
        setError((error as AxiosError<ErrorData>).message);
      }
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

  return { publish, isLoading: loading, setLoading };
};

export default useAddGigs;
