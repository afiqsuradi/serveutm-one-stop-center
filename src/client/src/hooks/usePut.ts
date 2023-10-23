import { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { ErrorData } from "../services/apiClient";
import usePrivateApiClient from "./usePrivateApiClient";

const usePut = <I, T>(endpoint: string, config?: AxiosRequestConfig) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = usePrivateApiClient();

  const put = async (data: I) => {
    setIsLoading(true);
    try {
      setError("");
      return await apiClient.put<T>(endpoint, data, {
        ...config,
      });
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
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, put, error, setError, setIsLoading };
};

export default usePut;
