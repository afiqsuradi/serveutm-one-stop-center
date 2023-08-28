import React, { useState } from "react";
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
      setIsLoading(false);
      setAuth(result.data);
      navigate(HOMEPAGE);
    } catch (error) {
      setError((error as AxiosError).message);
    }
  };
  return { login, error, isLoading };
};

export default useLogin;
