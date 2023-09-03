import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";
import { useAuth } from "./useAuth";

export const languageLevel = ["Basic", "Fluent", "Native"] as const;
export const skillLevel = ["Beginner", "Intermediate", "Expert"] as const;

export interface Language {
  name: string;
  level: (typeof languageLevel)[number];
}

export interface Skill {
  name: string;
  level: (typeof skillLevel)[number];
}

export interface UserProfile {
  description: string;
  language: Language[];
  skills: Skill[];
  PersonalWebsite?: string;
}
const defaultProfileValue: UserProfile = {
  description: "",
  language: [{ name: "", level: "Basic" }],
  skills: [{ name: "", level: "Beginner" }],
};

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
  }, [Auth.accessToken, username]);
  return { data, loading };
};

export default useUserProfile;
