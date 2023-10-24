import { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import { ErrorData } from "../services/apiClient";
import usePrivateApiClient from "./usePrivateApiClient";

const useDelete = <I, T>(endpoint: string) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = usePrivateApiClient();

  const onDelete = async (data: I, config?: AxiosRequestConfig) => {
    setIsLoading(true);
    try {
      setError("");
      return await apiClient.delete<T>(endpoint, {
        ...config,
        data,
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
    } finally {
      setIsLoading(false);
    }
  };
  return { isLoading, setIsLoading, onDelete, error, setError };
};

export default useDelete;
