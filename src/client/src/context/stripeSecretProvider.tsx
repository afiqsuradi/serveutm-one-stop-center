import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

interface AuthContextType {
  clientSecret: string;
  setClientSecret: React.Dispatch<React.SetStateAction<string>>; // Use React.Dispatch type
}
export const StripeContext = createContext<AuthContextType>({
  clientSecret: "",
  setClientSecret: () => "",
});

export const StripeProvider = () => {
  const [clientSecret, setClientSecret] = useState<string>("");
  return (
    <StripeContext.Provider value={{ clientSecret, setClientSecret }}>
      <Outlet />
    </StripeContext.Provider>
  );
};
