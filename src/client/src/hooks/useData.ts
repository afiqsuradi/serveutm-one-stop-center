import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { useCallback, useEffect, useState } from "react";
import { ErrorData } from "../services/apiClient";
import usePrivateApiClient from "./usePrivateApiClient";

type ApiResponse<T> = AxiosResponse<T>;

type ApiResponseResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: string | null;
};

const useData = <T>(
  url: string,
  config?: AxiosRequestConfig,
  dependencies?: string[]
): ApiResponseResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apiClient = usePrivateApiClient();

  const fetchData = useCallback(async () => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const response: ApiResponse<T> = await apiClient.get<T>(url, {
        signal: controller.signal,
        ...config,
      });
      setData(response.data);
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
  }, [url]);

  useEffect(
    () => {
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    dependencies ? [...dependencies] : []
  );

  return {
    data,
    isLoading,
    error,
  };
};
export default useData;
