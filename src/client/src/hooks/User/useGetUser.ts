import useData from "../useData";

export interface UserInfo {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  dateJoined: string;
  role?: string;
}

const useGetUser = (username: string) => {
  const { data, isLoading, error } = useData<UserInfo>(`api/user/${username}`);
  return { data, isLoading, error };
};

export default useGetUser;
