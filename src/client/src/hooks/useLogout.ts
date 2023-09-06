import { defaultAuthValue } from "../context/authProvider";
import apiClient from "../services/apiClient";
import { useAuth } from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth(defaultAuthValue);
    try {
      const result = await apiClient.get("/logout", {
        withCredentials: true,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
