import apiClient from "../services/apiClient";
import { useEffect, useState } from "react";

const useValidResetToken = (token: string) => {
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .post("/api/forgot-password/reset-status", JSON.stringify({ token }), {
        signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((res) => {
        if (!(res.status === 200)) {
          setSuccess(false);
        }
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return { success, isLoading };
};

export default useValidResetToken;
