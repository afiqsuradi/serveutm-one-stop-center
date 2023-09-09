import { useEffect, useState } from "react";
import apiClient, { ErrorData } from "../services/apiClient";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { RegisterFormStruct } from "../types/register";
import { AuthType } from "../context/authProvider";
import ROUTES from "../constants/path";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";

const useRegister = () => {
  const [error, setError] = useState("");
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const registerUser = async (data: RegisterFormStruct) => {
    setIsLoading(true);
    try {
      const result = await apiClient.post<AuthType>(
        "/api/user",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          params: {
            baseUrl: window.location.origin,
          },
          withCredentials: true,
        }
      );
      setAuth(result.data);
      navigate(ROUTES.REGISTER_SUCCESS);
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

  return { registerUser, isLoading };
};

export default useRegister;
