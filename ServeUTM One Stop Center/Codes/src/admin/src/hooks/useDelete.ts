import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useAuthService from "./useAuthService";
import { ErrorData } from "../services/apiClient";
import { toast } from "react-toastify";

const useDelete = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useAuthService();

  const deleteReq = async <T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ) => {
    setIsLoading(true);
    try {
      return await apiClient.delete<T>(endpoint, {
        ...config,
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      if (!(error.length === 0))
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          progress: undefined,
          theme: "colored",
        });
    }
    return () => {
      setError("");
    };
  }, [error]);

  return { isLoading, deleteReq, error, setError };
};

export default useDelete;
