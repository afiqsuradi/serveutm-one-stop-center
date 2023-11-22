import { defaultAuthValue } from "@/constant/authValue";
import { createContext, useState } from "react";
export interface AuthType {
  profileImage: string;
  accessToken: string;
  username: string;
  role?: "user" | "admin" | "service_provider";
  isVerified: boolean;
}

interface AuthContextType {
  Auth: AuthType;
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>; // Use React.Dispatch type
}
export const AuthContext = createContext<AuthContextType>({
  Auth: defaultAuthValue,
  setAuth: () => defaultAuthValue,
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [Auth, setAuth] = useState<AuthType>(defaultAuthValue);
  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
