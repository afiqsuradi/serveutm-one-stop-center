import { useEffect, useState } from "react";
import apiClient, { ErrorData } from "../services/apiClient";
import { AxiosError } from "axios";
import { useToast } from "@chakra-ui/react";
import { InquiryFormStruct } from "../types/inquiry";

export interface LoginFormData {
  username: string;
  password: string;
}

const usePostInquiry = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const toast = useToast();

  const post = async (data: InquiryFormStruct) => {
    setIsLoading(true);
    try {
      const result = await apiClient.post(
        "/api/inquiry",
        JSON.stringify(data),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (result) {
        toast({
          title: "Thanks for the inquiry",
          status: "success",
          position: "top",
          isClosable: true,
        });
      }
    } catch (resError) {
      if ((resError as AxiosError<ErrorData>).response) {
        setError(
          (resError as AxiosError<ErrorData>).response?.data.message as string
        );
      } else {
        // If backend crash / not found
        setError((resError as AxiosError<ErrorData>).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (error.length > 0) {
      if (error) {
        toast({
          title: `${error}`,
          status: "error",
          position: "top",
          isClosable: true,
        });
      }
    }
    setError("");
  }, [error]);
  return { post, isLoading };
};

export default usePostInquiry;
