import { RegisterStruct } from "@/types/userDataRule";
import usePost from "../usePost";
import { AuthType } from "@/context/authProvider";
import { useAuth } from "./useAuth";
import { useNavigate } from "react-router-dom";
import ROUTES from "@/constant/routes";

const useRegister = () => {
  const { isLoading, post, error } = usePost<string, AuthType>("/api/user", {
    headers: { "Content-Type": "application/json" },
  });
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const register = async (data: RegisterStruct) => {
    try {
      const result = await post(JSON.stringify(data));
      if (result) {
        setAuth(result.data);
        navigate(ROUTES.HOMEPAGE);
      }
    } catch (error) {
      //
    }
  };

  return { register, isLoading, error };
};

export default useRegister;
