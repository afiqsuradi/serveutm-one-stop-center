import { AxiosError } from "axios";
import apiClient from "../services/apiClient";
import { useEffect, useState } from "react";

const useValidResetToken = (token: string) => {
  const [valid, setValid] = useState<boolean | null>(true);
  useEffect(() => {
    const controller = new AbortController();
    const validateToken = async () => {
      try {
        const respond = await apiClient.post(
          "/api/forgot-password/reset-status",
          JSON.stringify({ token }),
          {
            headers: { "Content-Type": "application/json" },
            signal: controller.signal,
            withCredentials: true,
          }
        );

        if (respond.status === 200) {
          setValid(true);
        }
      } catch (error) {
        if (
          !(
            (error as AxiosError).config &&
            (error as AxiosError).config?.signal?.aborted
          )
        ) {
          setValid(false);
        }
      }
    };
    validateToken().catch((error) => {
      console.error(error);
    });
    return () => {
      controller.abort();
    };
  }, [token]);
  return { valid };
};

export default useValidResetToken;
