import { useAuth } from "./useAuth";
import apiClient from "../../services/apiClient";
import { AuthType } from "../../context/authProvider";

export const useRefresh = () => {
  const { setAuth } = useAuth();
  const refresh = async () => {
    const response = await apiClient.get<AuthType>("/api/refresh", {
      withCredentials: true,
    });
    if (!response) return "";
    setAuth((prevAuth: AuthType) => {
      return {
        ...prevAuth,
        profileImage: response.data.profileImage,
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
