import usePost from "../usePost";
import { AuthType } from "@/context/authProvider";
import { PassResetStruct } from "@/types/userDataRule";
import { useState } from "react";

export const useValidResetToken = () => {
  const [isValid, setIsValid] = useState(false);
  const { isLoading, post, error } = usePost(
    "/api/forgot-password/reset-status",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const checkValidity = async (token: string) => {
    try {
      const result = await post(JSON.stringify({ token }));
      if (result && result.status >= 200 && result.status < 300) {
        setIsValid(true);
      }
    } catch (error) {
      //
    }
  };

  return { checkValidity, isLoading, error, isValid };
};

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

export const useResetPassword = (token: string) => {
  const [success, setSuccess] = useState(false);
  const { isLoading, post, error } = usePost<string, AuthType>(
    "/api/forgot-password/reset",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const reset = async (data: PassResetStruct) => {
    try {
      setSuccess(false);
      const result = await post(JSON.stringify({ ...data, token }));
      if (result && result.status >= 200 && result.status < 300) {
        setSuccess(true);
      }
    } catch (error) {
      //
    }
  };

  return { reset, isLoading, error, success };
};
