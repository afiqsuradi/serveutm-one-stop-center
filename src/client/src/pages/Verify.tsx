import { useLocation } from "react-router-dom";
import apiClient from "../services/apiClient";
import { AuthType } from "../context/authProvider";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

interface VerifyResponse {
  status: number;
  isVerified: boolean;
}

const Verify = () => {
  const { Auth, setAuth } = useAuth();
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const token = new URLSearchParams(location.search).get("token");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = apiClient
      .post<VerifyResponse>(
        "/api/verify-email",
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
      });
    return () => {
      controller.abort();
    };
  }, [token]);
  return (
    <div>
      {success ? <h1>Successfully Verified</h1> : <h1>Failed to verified</h1>}
    </div>
  );
};

export default Verify;
