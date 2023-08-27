import { useAuth } from "./useAuth";
import apiClient from "../services/apiClient";

interface verifyResponse {
  accessToken: string;
}

export const useRefresh = () => {
  const { Auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await apiClient.get<verifyResponse>("/api/refresh", {
      withCredentials: true,
    });
    if (!response) return "";
    setAuth({ ...Auth, accessToken: response.data.accessToken });
    return response.data.accessToken;
  };
  return refresh;
};
