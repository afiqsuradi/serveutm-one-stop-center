import { LoginStruct } from "@/types/userDataRule";
import usePost from "../usePost";
import { AuthType } from "@/context/authProvider";
import { useAuth } from "./useAuth";

const useLogin = () => {
  const { isLoading, post, error } = usePost<string, AuthType>("/api/auth", {
    headers: { "Content-Type": "application/json" },
  });
  const { setAuth } = useAuth();
  const login = async (data: LoginStruct) => {
    try {
      const result = await post(JSON.stringify(data));
      if (result) {
        setAuth(result.data);
      }
    } catch (error) {
      //
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
