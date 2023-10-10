import { AxiosError, AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { ErrorData } from "../services/apiClient";
import useAxiosPrivate from "./useAxiosPrivate";
import { useToast } from "@chakra-ui/react";

const useData = <T>(
  endpoint: string,
  config?: AxiosRequestConfig,
  dependency?: any[],
  showErr?: boolean
) => {
  const toast = useToast();
  const showError = showErr === undefined ? true : showErr;
  const [response, setResponse] = useState<T>();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiClient = useAxiosPrivate();
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
          if (response.status === 200) {
            setSuccess(true);
          }
        })
        .catch((error: Error) => {
          if (!(error as AxiosError).message.includes("canceled")) {
            if ((error as AxiosError<ErrorData>).response) {
              setError(
                (error as AxiosError<ErrorData>).response?.data
                  .message as string
              );
            } else {
              // If backend crash / not found
              setError((error as AxiosError<ErrorData>).message);
            }
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

  useEffect(() => {
    if (showError) {
      if (error.length > 0) {
        if (error) {
          toast({
            title: `${error}`,
            status: "error",
            position: "top",
            isClosable: true,
          });
        }
      }
    }
    return () => {
      setError("");
    };
  }, [error]);
  return { isLoading, response, success, setError };
};

export default useData;
