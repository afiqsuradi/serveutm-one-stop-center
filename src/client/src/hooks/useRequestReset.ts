import { useEffect, useState } from "react";
import apiClient, { ErrorData } from "../services/apiClient";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";

export interface passwordResetRequestFormData {
  email: string;
}

const useRequestReset = () => {
  const toast = useToast();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const requestPasswordReset = async (data: passwordResetRequestFormData) => {
    try {
      const response = await apiClient.post(
        "/api/forgot-password",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 201) {
        setError("");
        setSuccess(true);
      }
    } catch (resError) {
      if ((resError as AxiosError<ErrorData>).response) {
        setError(
          (resError as AxiosError<ErrorData>).response?.data.message as string
        );
      } else {
        // If backend crash / not found
        setError((resError as AxiosError<ErrorData>).message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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
    setError("");
  }, [error]);
  return { success, isLoading, requestPasswordReset };
};

export default useRequestReset;
