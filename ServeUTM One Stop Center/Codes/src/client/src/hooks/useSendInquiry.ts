import usePost from "./usePost";
import { useState } from "react";
import { inquiryStruct } from "@/types/userDataRule";
import { AxiosResponse } from "axios";

const useSendInquiry = () => {
  const [success, setSuccess] = useState(false);
  const { isLoading, post, error } = usePost<string, AxiosResponse>(
    "/api/inquiry",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const send = async (data: inquiryStruct) => {
    try {
      setSuccess(false);
      const result = await post(
        JSON.stringify({
          name: data.name,
          email: data.mail,
          message: data.message,
        })
      );
      if (result && result.status >= 200 && result.status < 300) {
        setSuccess(true);
      }
    } catch (error) {
      //
    }
  };

  return { send, isLoading, error, success };
};

export default useSendInquiry;
