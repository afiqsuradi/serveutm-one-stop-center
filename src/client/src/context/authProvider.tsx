import { createContext, useState } from "react";

export interface AuthType {
  accessToken: string;
  username: "";
  role?: "user" | "admin" | "service_provider";
  isVerified: boolean;
}

export const defaultAuthValue: AuthType = {
  accessToken: "",
  username: "",
  isVerified: false,
};

interface AuthContextType {
  Auth: AuthType;
  setAuth: (auth: AuthType) => void;
}
export const AuthContext = createContext<AuthContextType>({
  Auth: defaultAuthValue,
  setAuth: () => {
    return;
  },
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
