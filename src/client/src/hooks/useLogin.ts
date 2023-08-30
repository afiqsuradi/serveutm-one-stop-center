import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import { HOMEPAGE } from "../constants/path";
import { AxiosError } from "axios";
import { AuthType } from "../context/authProvider";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface ErrorData {
  message: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    try {
      const result = await apiClient.post<AuthType>(
        "/api/auth",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setAuth(result.data);
      navigate(HOMEPAGE);
    } catch (error) {
      if ((error as AxiosError<ErrorData>).response) {
        setError(
          (error as AxiosError<ErrorData>).response?.data.message as string
        );
      }
      // If backend crash / not found
      setError((error as AxiosError<ErrorData>).message);
    } finally {
      setIsLoading(false);
    }
  };
  return { login, error, isLoading };
};

export default useLogin;
