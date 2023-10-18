import { useEffect, useState } from "react";
import apiClient, { ErrorData } from "../services/apiClient";
import { AxiosError } from "axios";
import { PasswordResetFormStruct } from "../types/passwordReset";
import { useToast } from "@chakra-ui/react";

const useResetPassword = (token: string) => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const resetPassword = async (data: PasswordResetFormStruct) => {
    setIsLoading(true);
    try {
      const respond = await apiClient.post(
        "/api/forgot-password/reset",
        JSON.stringify({ ...data, token }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (respond.status === 202) {
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
      setIsLoading(false);
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

  return { success, isLoading, resetPassword };
};

export default useResetPassword;
