import { AxiosError } from "axios";
import apiClient from "../services/apiClient";
import { useEffect, useState } from "react";
import ROUTES from "../constants/path";
import { useNavigate } from "react-router-dom";

const useValidResetToken = (token: string) => {
  const navigate = useNavigate();
  const [valid, setValid] = useState<boolean | null>(true);
  useEffect(() => {
    const controller = new AbortController();

    apiClient
      .post("/api/forgot-password/reset-status", JSON.stringify({ token }), {
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        withCredentials: true,
      })
      .then((respond) => {
        if (respond.status === 200) {
          setValid(true);
        }
      })
      .catch((error) => {
        if ((error as AxiosError).response?.status === 400) {
          navigate(ROUTES.HOMEPAGE);
        }
        if (
          !(
            (error as AxiosError).config &&
            (error as AxiosError).config?.signal?.aborted
          )
        ) {
          setValid(false);
        }
      });

    return () => {
      controller.abort();
    };
  }, [token]);
  return { valid };
};

export default useValidResetToken;
