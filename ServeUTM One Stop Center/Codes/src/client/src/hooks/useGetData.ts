import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useState } from "react";
import { ErrorData } from "../services/apiClient";
import usePrivateApiClient from "./usePrivateApiClient";

type ApiResponse<T> = AxiosResponse<T>;

type ApiResponseResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
  fetchData: (url: string, config?: AxiosRequestConfig) => void;
};

const useGetData = <T>(): ApiResponseResult<T> => {
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiClient = usePrivateApiClient();

  const fetchData = useCallback(
    async (url: string, config?: AxiosRequestConfig) => {
      const controller = new AbortController();
      setIsLoading(true);
      setError(null);

      try {
        const response: ApiResponse<T> = await apiClient.get<T>(url, {
          signal: controller.signal,
          ...config,
        });
        setData(response.data);
        setSuccess(() => true);
      } catch (error) {
        const err = error as AxiosError<ErrorData>;
        if (!err.message.includes("canceled")) {
          if (err.response) {
            if (err.response.data && err.response.data.message) {
              setError(err.response.data.message);
            } else {
              setError(err.message);
            }
          } else {
            // If backend crash / not found
            setError(err.message);
          }
        }
      } finally {
        setIsLoading(false);
      }
      return () => controller.abort();
    },
    []
  );

  return {
    data,
    isLoading,
    success,
    error,
    fetchData,
  };
};

export default useGetData;
