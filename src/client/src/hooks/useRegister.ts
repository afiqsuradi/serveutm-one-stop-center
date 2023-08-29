import { useState } from "react";
import apiClient from "../services/apiClient";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import { RegisterFormStruct } from "../types/register";
import { AuthType } from "../context/authProvider";
import { REGISTER_SUCCESS } from "../constants/path";
import { AxiosError } from "axios";
import { ErrorData } from "./useLogin";

const useRegister = () => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const registerUser = async (data: RegisterFormStruct) => {
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
      navigate(REGISTER_SUCCESS);
    } catch (error) {
      setError(
        (error as AxiosError<ErrorData>).response?.data.message as string
      );
    } finally {
      setIsLoading(false);
    }
  };
  return { registerUser, isLoading, error };
};

export default useRegister;
