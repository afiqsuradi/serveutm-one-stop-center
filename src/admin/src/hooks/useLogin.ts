import { useNavigate } from "react-router-dom";
import { useAuth } from "./useAuth";
import usePost from "./usePost";
import { AuthType } from "../context/authProvider";
import { useEffect } from "react";
import { toast } from "react-toastify";

export interface LoginFormData {
  username: string;
  password: string;
}

const useLogin = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { post, isLoading, error, setError } = usePost<LoginFormData, AuthType>(
    "/api/auth"
  );
  const login = async (data: LoginFormData) => {
    const { response, success } = await post(data);
    if (success) {
      if (response?.role === "admin") {
        setAuth(response);
        navigate("/");
      } else {
        setError("Forbidden Access.");
      }
    }
  };

  useEffect(() => {
    if (!(error.length === 0))
      toast.error(error, {
        position: "top-center",
        autoClose: 5000,
        progress: undefined,
        theme: "colored",
      });
    return () => {
      setError("");
    };
  }, [error]);

  return { isLoading, login };
};

export default useLogin;
