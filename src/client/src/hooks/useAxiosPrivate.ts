import { useEffect } from "react";
import { useAuth } from "./useAuth";
import { useRefresh } from "./useRefresh";
import { AxiosError, AxiosRequestConfig } from "axios";
import privateApiClient from "../services/privateApiClient";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const useAxiosPrivate = () => {
  const refresh = useRefresh();
  const { Auth, setAuth } = useAuth();
  useEffect(() => {
    const requestIntercept = privateApiClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${Auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = privateApiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevReq = error.config as CustomAxiosRequestConfig;
        if (error.response?.status === 403 && !prevReq.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          if (prevReq.headers) {
            prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return privateApiClient(prevReq);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      privateApiClient.interceptors.request.eject(requestIntercept);
      privateApiClient.interceptors.response.eject(responseIntercept);
    };
  }, [Auth, refresh]);
  return privateApiClient;
};

export default useAxiosPrivate;
