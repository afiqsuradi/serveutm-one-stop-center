import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useAuth } from "./useAuth";
import { UserProfile, defaultProfileValue } from "../interface/ProviderInfo";

const useUserProfile = (username: string) => {
  const { Auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserProfile>(defaultProfileValue);
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get<UserProfile>(`api/service-provider/${username}`, {
        signal: controller.signal,
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [Auth.accessToken]);
  return { data, loading };
};

export default useUserProfile;
