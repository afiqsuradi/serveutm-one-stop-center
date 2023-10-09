import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { useRefresh } from "../useRefresh";
import usePut from "../usePut";
import { ServiceType } from "./useServices";
import { useAuth } from "../useAuth";
import { useEffect, useState } from "react";
import { ErrorData } from "../../services/apiClient";
import useAuthService from "../useAuthService";

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

const useUpdateService = (target: string) => {
  const apiClient = useAuthService();
  const { Auth } = useAuth();
  const [error, setError] = useState("");
  const refresh = useRefresh();
  const { isLoading, put } = usePut<FormData, AxiosResponse>("api/services/", {
    headers: { "Content-Type": "multipart/form-data" },
    params: {
      requestor: Auth.username,
      serviceId: target,
    },
  });

  const updateService = async (data: ServiceType) => {
    try {
      const formData = new FormData();
      const files = await blobUrlsToFiles(apiClient, data.images);
      formData.append("json", JSON.stringify(data));
      files.forEach((file) => {
        formData.append("images", file);
      });
      const response = await put(formData);
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
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      if (error) {
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          progress: undefined,
          theme: "colored",
        });
      }
    }
    setError("");
  }, [error]);

  return { isLoading, updateService };
};

export default useUpdateService;
