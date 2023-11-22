import useData from "./useData";

export interface UserInfo {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  dateJoined: string;
  dateJoinedFormatted?: string;
}

const useProfile = (username: string, deps?: any[]) => {
  const { isLoading, response, success } = useData<UserInfo>(
    `api/user/${username}`,
    {},
    deps
  );
  if (success && response) {
    const date = new Date(response.dateJoined);
    response.dateJoinedFormatted = new Intl.DateTimeFormat("en-MY", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }
  return { isLoading, response, success };
};

export default useProfile;
