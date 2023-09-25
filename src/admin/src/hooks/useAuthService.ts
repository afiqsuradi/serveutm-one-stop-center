import { AxiosError, AxiosRequestConfig } from "axios";
import { useRefresh } from "./useRefresh";
import { useAuth } from "./useAuth";
import { useEffect } from "react";
import apiClient from "../services/apiClient";

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  sent?: boolean;
}

const useAuthService = () => {
  const refresh = useRefresh();
  const { Auth } = useAuth();
  useEffect(() => {
    const requestIntercept = apiClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${Auth.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = apiClient.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const prevReq = error.config as CustomAxiosRequestConfig;
        if (error.response?.status === 403 && !prevReq.sent) {
          prevReq.sent = true;
          const newAccessToken = await refresh();
          if (prevReq.headers) {
            prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return apiClient(prevReq);
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      apiClient.interceptors.request.eject(requestIntercept);
      apiClient.interceptors.response.eject(responseIntercept);
    };
  }, [Auth, refresh]);
  return apiClient;
};

export default useAuthService;
