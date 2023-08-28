import { useAuth } from "./useAuth";
import apiClient from "../services/apiClient";
import { AuthType } from "../context/authProvider";

export const useRefresh = () => {
  const { Auth, setAuth } = useAuth();
  const refresh = async () => {
    const response = await apiClient.get<AuthType>("/api/refresh", {
      withCredentials: true,
    });
    if (!response) return "";
    setAuth((prevAuth: AuthType) => {
      return {
        ...prevAuth,
        username: response.data.username,
        isVerified: response.data.isVerified,
        role: response.data.role,
        accessToken: response.data.accessToken,
      };
    });
    return response.data.accessToken;
  };
  return refresh;
};
