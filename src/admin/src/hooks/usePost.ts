import { AxiosError, AxiosRequestConfig } from "axios";
import { useState } from "react";
import useAuthService from "./useAuthService";
import { ErrorData } from "../services/apiClient";

const usePost = <I, T>(endpoint: string, config?: AxiosRequestConfig) => {
  const [response, setResponse] = useState<T>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useAuthService();

  const post = async (data: I) => {
    setIsLoading(true);
    try {
      const res = await apiClient.post<T>(endpoint, JSON.stringify(data), {
        ...config,
      });
      if (res.status >= 200 && res.status <= 299) {
        setSuccess(true);
        setResponse(res.data);
      }
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
    return { response, success };
  };
  return { isLoading, post, error, setError };
};

export default usePost;
