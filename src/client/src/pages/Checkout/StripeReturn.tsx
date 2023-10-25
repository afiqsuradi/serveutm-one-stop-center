import useGetData from "@/hooks/useGetData";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface StatusResponse {
  status: "open" | "complete";
}

const StripeReturn = () => {
  const [status, setStatus] = useState<string>("");
  const { data, fetchData } = useGetData<StatusResponse>();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    fetchData(`/api/checkout?session_id=${sessionId}`);
  }, []);

  useEffect(() => {
    if (data) {
      setStatus(data.status);
    }
  }, [data]);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! Now, fuck off. If you have any questions,
          please email
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default StripeReturn;
