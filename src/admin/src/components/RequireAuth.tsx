import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const RequireAuth = () => {
  const { Auth } = useAuth();
  if (Auth.role && Auth.role === "admin") return <Outlet />;
  return <Navigate to={"/login"} />;
};

export default RequireAuth;
