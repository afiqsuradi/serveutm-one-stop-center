import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useAuthService from "./useAuthService";
import { ErrorData } from "../services/apiClient";
import { toast } from "react-toastify";

const usePost = <I, T>(endpoint: string, config?: AxiosRequestConfig) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useAuthService();

  const post = async (data: I) => {
    setIsLoading(true);
    try {
      return await apiClient.post<T>(endpoint, data, {
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

  return { isLoading, post, error, setError };
};

export default usePost;
