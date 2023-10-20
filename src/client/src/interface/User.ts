import { AuthType } from "@/context/authProvider";

export interface UserInfo {
  profileImage: string;
  name: string;
  username: string;
  email: string;
  dateJoined: string;
  role?: AuthType["role"];
}
