import { useState } from "react";
import apiClient from "../services/apiClient";
import { AxiosError } from "axios";
import { ErrorData } from "./useLogin";
import { PasswordResetFormStruct } from "../types/passwordReset";

const useResetPassword = (token: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const resetPassword = async (data: PasswordResetFormStruct) => {
    try {
      const respond = await apiClient.post(
        "/api/forgot-password/reset",
        JSON.stringify({ ...data, token }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (respond.status === 200) {
        setSuccess(true);
        setIsLoading(false);
      }
    } catch (error) {
      setSuccess(false);
      setError((error as AxiosError<ErrorData>).message);
    }
  };
  return { success, error, isLoading, resetPassword };
};

export default useResetPassword;
