import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useAuthService from "./useAuthService";
import { ErrorData } from "../services/apiClient";

const useData = <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
  dependency?: any[]
) => {
  const [response, setResponse] = useState<T>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useAuthService();
  useEffect(
    () => {
      setIsLoading(true);
      const controller = new AbortController();
      apiClient
        .get<T>(endpoint, {
          signal: controller.signal,
          ...config,
        })
        .then((response) => {
          setResponse(response.data);
          setSuccess(true);
        })
        .catch((error: Error) => {
          if ((error as AxiosError<ErrorData>).response) {
            setError(
              (error as AxiosError<ErrorData>).response?.data.message as string
            );
          } else {
            // If backend crash / not found
            setError((error as AxiosError<ErrorData>).message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
      return () => controller.abort();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-unsafe-assignment
    dependency ? [...dependency] : []
  );
  return { isLoading, response, success, error, setError };
};

export default useData;
