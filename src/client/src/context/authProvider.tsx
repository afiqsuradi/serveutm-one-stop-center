import { createContext, useState } from "react";

export interface AuthType {
  accessToken: string;
  isVerified: boolean;
}

interface AuthContextType {
  Auth: AuthType;
  setAuth: (auth: AuthType) => void;
}
export const AuthContext = createContext<AuthContextType>({
  Auth: { accessToken: "", isVerified: false },
  setAuth: () => {
    return;
  },
});

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [Auth, setAuth] = useState<AuthType>({
    accessToken: "",
    isVerified: false,
  });
  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
