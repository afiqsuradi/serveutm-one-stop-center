import { LoginStruct } from "@/types/userDataRule";
import usePost from "../usePost";
import { AuthType } from "@/context/authProvider";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";

const useLogin = () => {
  const { isLoading, post, error } = usePost<string, AuthType>("/api/auth", {
    headers: { "Content-Type": "application/json" },
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const login = async (data: LoginStruct) => {
    try {
      const result = await post(JSON.stringify(data));
      if (result && result.status >= 200 && result.status < 300) {
        setAuth(result.data);
        navigate(ROUTES.HOMEPAGE);
      }
    } catch (error) {
      //
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
