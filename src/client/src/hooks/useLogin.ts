import { useState } from "react";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";
import ROUTES from "../constants/path";
import { AxiosError } from "axios";
import { AuthType } from "../context/authProvider";
import { useToast } from "@chakra-ui/react";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface ErrorData {
  message: string;
}

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setAuth } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const login = async (data: LoginFormData) => {
    setIsLoading(true);
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
      navigate(ROUTES.HOMEPAGE);
    } catch (resError) {
      if ((resError as AxiosError<ErrorData>).response) {
        setError(
          (resError as AxiosError<ErrorData>).response?.data.message as string
        );
      } else {
        // If backend crash / not found
        setError((resError as AxiosError<ErrorData>).message);
      }
      toast({
        title: `${error}`,
        status: "error",
        position: "top",
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return { login, isLoading };
};

export default useLogin;
