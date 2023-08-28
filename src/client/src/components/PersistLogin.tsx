import { useEffect, useState } from "react";
import { useRefresh } from "../hooks/useRefresh";
import { useAuth } from "../hooks/useAuth";
import { Outlet } from "react-router-dom";

const PersistLogin = () => {
  const [isLoading, setLoading] = useState(true);
  const { Auth } = useAuth();
  const refresh = useRefresh();
  useEffect(() => {
    console.log("initiate persist login");
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    Auth.accessToken.length === 0 ? verifyRefreshToken() : setLoading(false);
  }, []);
  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
