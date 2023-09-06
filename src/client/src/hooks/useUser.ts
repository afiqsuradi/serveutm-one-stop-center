import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useAuth } from "./useAuth";

export interface UserInfo {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  dateJoined: string;
}

const useUser = (username: string) => {
  const { Auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<UserInfo>();
  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    apiClient
      .get<UserInfo>(`api/user/${username}`, {
        signal: controller.signal,
        withCredentials: true,
      })
      .then((res) => {
        const date = new Date(res.data.dateJoined);
        res.data.dateJoined = new Intl.DateTimeFormat("en-MY", {
          year: "numeric",
          month: "long",
          day: "2-digit",
        }).format(date);
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
  }, [Auth.accessToken, username]);
  return { data, loading };
};

export default useUser;
