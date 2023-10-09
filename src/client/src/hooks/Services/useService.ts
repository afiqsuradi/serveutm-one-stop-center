import { useEffect, useState } from "react";
import { useAuth } from "../useAuth";
import apiClient from "../../services/apiClient";
import { ServiceType } from "../../pages/Seller/AddGig";

export interface UserInfo {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  dateJoined: string;
}

const useService = (id: string) => {
  const { Auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ServiceType>();
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get<ServiceType>(`api/services/${id}`, {
        signal: controller.signal,
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch(() => {
        //
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      controller.abort();
    };
  }, [Auth.accessToken, id]);
  return { data, loading };
};

export default useService;
