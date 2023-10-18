import apiClient from "@/services/apiClient";
import { useAuth } from "./useAuth";
import { defaultAuthValue } from "@/context/authProvider";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    try {
      await apiClient.get("/logout", {
        withCredentials: true,
      });
      setAuth(defaultAuthValue);
    } catch (err) {
      //
    }
  };
  return logout;
};

export default useLogout;
