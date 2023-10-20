import usePost from "../usePost";
import { useAuth } from "./useAuth";

interface VerifyResponse {
  status: number;
  isVerified: boolean;
}

const useVerify = () => {
  const { isLoading, post, error } = usePost<string, VerifyResponse>(
    "/api/verify/confirm-email",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const { setAuth } = useAuth();
  const verify = async (token: string) => {
    try {
      const result = await post(JSON.stringify({ token: token }));
      if (result && result.status >= 200 && result.status < 300) {
        setAuth((prev) => {
          return { ...prev, isVerified: result.data.isVerified };
        });
      }
    } catch (error) {
      //
    }
  };

  return { verify, isLoading, error };
};

export default useVerify;
