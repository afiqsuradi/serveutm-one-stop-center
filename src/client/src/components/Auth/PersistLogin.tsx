import { useAuth } from "@/hooks/Auth/useAuth";
import { useRefresh } from "@/hooks/Auth/useRefresh";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setLoading] = useState(true);
  const { Auth } = useAuth();
  const refresh = useRefresh();
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    };
    !Auth || Auth.accessToken.length === 0
      ? verifyRefreshToken()
      : setLoading(false);
  }, []);
  return <>{!isLoading && <Outlet />}</>;
};

export default PersistLogin;
