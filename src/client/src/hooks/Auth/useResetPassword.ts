import usePost from "../usePost";
import { AuthType } from "@/context/authProvider";
import { useState } from "react";

// const useResetPassword = () => {
//   const { isLoading, post, error } = usePost<string, AuthType>("/api/auth", {
//     headers: { "Content-Type": "application/json" },
//   });
//   const { setAuth } = useAuth();
//   const navigate = useNavigate();
//   const login = async (data: LoginStruct) => {
//     try {
//       const result = await post(JSON.stringify(data));
//       if (result) {
//         setAuth(result.data);
//         navigate(ROUTES.HOMEPAGE);
//       }
//     } catch (error) {
//       //
//     }
//   };

//   return { login, isLoading, error };
// };

export const useRequestResetPassword = <T>() => {
  const [success, setSuccess] = useState(false);
  const { isLoading, post, error } = usePost<string, AuthType>(
    "/api/forgot-password",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const requestReset = async (data: T) => {
    try {
      setSuccess(false);
      const result = await post(JSON.stringify(data));
      if (result && result.status >= 200 && result.status < 300) {
        setSuccess(true);
      }
    } catch (error) {
      //
    }
  };

  return { requestReset, isLoading, error, success };
};
