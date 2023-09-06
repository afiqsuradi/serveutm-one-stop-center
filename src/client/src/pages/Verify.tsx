import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

interface VerifyResponse {
  status: number;
  isVerified: boolean;
}

const Verify = () => {
  const { Auth, setAuth } = useAuth();
  const [success, setSuccess] = useState(false);
  const location = useLocation();
  const privateApiClient = useAxiosPrivate();
  const token = new URLSearchParams(location.search).get("token");
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    privateApiClient
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
      })
      .catch((err) => {
        console.error(err);
      });
    return () => {
      controller.abort();
    };
  }, []);
  return (
    <div>
      {success ? <h1>Successfully Verified</h1> : <h1>Failed to verified</h1>}
    </div>
  );
};

export default Verify;
