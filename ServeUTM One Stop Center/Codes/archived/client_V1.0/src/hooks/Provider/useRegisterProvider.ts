import { AxiosError } from "axios";
import useAxiosPrivate from "../useAxiosPrivate";
import { ErrorData } from "../../services/apiClient";
import { useState } from "react";
import { UserProfile } from "../../interface/ProviderInfo";

interface ProviderFormError {
  title: string;
  description: string;
}

const useRegisterProvider = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ProviderFormError>();
  const privateApiClient = useAxiosPrivate();
  const register = async (providerInfo: UserProfile) => {
    try {
      const response = await privateApiClient.post(
        "/api/service-provider/register",
        JSON.stringify(providerInfo),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setSuccess(true);
      }
    } catch (error) {
      setSuccess(false);
      if ((error as AxiosError<ErrorData>).response) {
        setError({
          title: "Something went wrong",
          description: (error as AxiosError<ErrorData>).response?.data
            .message as string,
        });
      } else {
        setError({
          title: "Network Error",
          description: "Couldn't connect to the server",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return { success, error, register, setError, loading, setLoading };
};

export default useRegisterProvider;
