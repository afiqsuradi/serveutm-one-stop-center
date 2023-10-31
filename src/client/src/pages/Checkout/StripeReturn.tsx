import useGetData from "@/hooks/useGetData";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constant/routes";
import Spinner from "@/components/ui/spinner";

interface StatusResponse {
  status: "open" | "complete";
  payment_status: string;
  invoice: {
    number: string;
    invoice_pdf: string;
    total: number;
    email: string;
    method: string;
  };
}
const StripeReturn = () => {
  const [status, setStatus] = useState<string>("");
  const { data, fetchData } = useGetData<StatusResponse>();
  const navigate = useNavigate();

  const getStatus = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");
    fetchData(`/api/checkout?session_id=${sessionId}`);
  };

  useEffect(() => {
    if (data) {
      setStatus(data.status);
    } else {
      setTimeout(() => {
        getStatus();
      }, 1000);
    }
  }, [data]);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <div className="container">
        <section className="flex justify-center items-center my-12">
          <Card className="w-[450px]">
            <CardHeader className="text-success space-y-6">
              <CardTitle className="w-full text-center">
                Payment Successful!
              </CardTitle>
              <div className="w-full flex flex-col justify-center">
                <IoMdCheckmarkCircleOutline className="text-center text-5xl w-full" />
                <p className="text-foreground/75 text-center text-xs mt-2">
                  Invoice Paid
                </p>
              </div>
              <h3 className="text-foreground text-3xl text-center">
                MYR {data?.invoice.total}
              </h3>
            </CardHeader>
            <CardContent className="grid grid-cols-[1fr_2fr] space-y-2 text-sm text-foreground/80 w-full">
              <h5 className="mt-auto">Email</h5>
              <h5 className="text-foreground justify-self-end">
                {data?.invoice.email}
              </h5>
              <h5>Invoice Number</h5>
              <h5 className="text-foreground justify-self-end">
                {data?.invoice.number}
              </h5>
              <h5>Payment Method</h5>
              <h5 className="text-foreground justify-self-end">
                {data?.invoice.method}
              </h5>
            </CardContent>
            <CardFooter className="grid grid-cols-2 gap-4">
              <Button
                variant={"outline"}
                className="w-full"
                onClick={() => navigate(ROUTES.HOMEPAGE)}
              >
                Return Home
              </Button>
              <Button className="w-full">
                <a href={data?.invoice.invoice_pdf} target="blank">
                  Download Invoice
                </a>
              </Button>
            </CardFooter>
          </Card>
        </section>
      </div>
    );
  }

  return (
    <div className="container flex justify-center items-center h-[500px]">
      <Spinner />
    </div>
  );
};

export default StripeReturn;
