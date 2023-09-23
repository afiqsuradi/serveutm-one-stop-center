import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import useAuthService from "./useAuthService";
import { ErrorData } from "../services/apiClient";
import { toast } from "react-toastify";

const usePost = <I, T>(endpoint: string, config?: AxiosRequestConfig) => {
  const [response, setResponse] = useState<T>();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useAuthService();

  const post = async (data: I) => {
    let success = false;
    setIsLoading(true);
    try {
      const res = await apiClient.post<T>(endpoint, data, {
        ...config,
      });
      if (res.status >= 200 && res.status <= 299) {
        success = true;
        setResponse(res.data);
      }
    } catch (error) {
      success = false;
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
