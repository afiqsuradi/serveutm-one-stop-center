import { createContext, useContext, useState } from "react";

interface AuthType {
  accessToken: string;
}

interface AuthContextType {
  Auth: AuthType;
  setAuth: (auth: AuthType) => void;
}
const AuthContext = createContext<AuthContextType>({
  Auth: { accessToken: "" },
  setAuth: () => {
    return;
  },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface Props {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: Props) => {
  const [Auth, setAuth] = useState<AuthType>({ accessToken: "" });
  return (
    <AuthContext.Provider value={{ Auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
