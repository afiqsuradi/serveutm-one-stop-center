import { useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import useAxiosPrivate from "./useAxiosPrivate";

interface VerifyResponse {
  status: number;
  isVerified: boolean;
}

const useVerify = (token: string) => {
  const privateApiClient = useAxiosPrivate();
  const { Auth, setAuth } = useAuth();
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    privateApiClient
      .post<VerifyResponse>(
        "/api/verify/confirm-email",
        JSON.stringify({ token: token }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          signal: signal,
        }
      )
      .then((res) => {
        if (res.status === 202) {
          setAuth({ ...Auth, isVerified: res.data.isVerified });
          setSuccess(true);
        } else {
          setSuccess(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      controller.abort();
    };
  }, [token]);
  return { success };
};

export default useVerify;
