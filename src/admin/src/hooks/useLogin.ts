import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import usePost from "./usePost";
import { AuthType } from "../context/authProvider";

export interface LoginFormData {
  username: string;
  password: string;
}

const useLogin = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { post, isLoading, setError } = usePost<string, AuthType>("/api/auth", {
    headers: { "Content-Type": "application/json" },
  });
  const login = async (data: LoginFormData) => {
    const response = await post(JSON.stringify(data));
    if (response) {
      if (response?.data.role === "admin") {
        setAuth(response?.data);
        navigate("/");
      } else {
        setError("Forbidden Access.");
      }
    }
  };

  return { isLoading, login };
};

export default useLogin;
