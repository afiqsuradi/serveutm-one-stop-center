import { useEffect } from "react";
import useData from "../useData";

export type User = {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  role: "admin" | "service_provider" | "user";
};

type Users = {
  count: number;
  users: User[];
};

export type UsersFilterType = {
  textInput?: string;
  type?: "username" | "email" | "name";
  role?: string;
  page?: number;
  limit: number;
};

const useUsers = (filters: UsersFilterType) => {
  const query = Object.entries(filters)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const { isLoading, response, setError } = useData<Users>(
    `/api/user?${query}`,
    {},
    [filters]
  );
  return { data: response, isLoading, setError };
};

export default useUsers;
