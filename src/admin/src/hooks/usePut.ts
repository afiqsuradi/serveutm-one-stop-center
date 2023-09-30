import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useAuthService from "./useAuthService";
import { ErrorData } from "../services/apiClient";
import { toast } from "react-toastify";

const usePut = <I, T>(endpoint: string, config?: AxiosRequestConfig) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useAuthService();

  const put = async (data: I) => {
    setIsLoading(true);
    try {
      console.log(config);
      return await apiClient.put<T>(endpoint, data, { ...config });
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
    if (!(error.length === 0))
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        progress: undefined,
        theme: "colored",
      });
    return () => {
      setError("");
    };
  }, [error]);

  return { isLoading, put, error, setError };
};

export default usePut;
