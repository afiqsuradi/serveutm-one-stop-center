import ROUTES from "@/constant/routes";
import { AuthType } from "@/context/authProvider";
import { useAuth } from "@/hooks/Auth/useAuth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface Props {
  allowedRole: AuthType["role"][];
}

const RequireAuth = ({ allowedRole }: Props) => {
  const { Auth } = useAuth();
  const location = useLocation();
  if (!allowedRole || !Auth.role) {
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }
  return (
    <>
      {allowedRole.includes(Auth.role) ? (
        <Outlet />
      ) : (
        <Navigate to={ROUTES.HOMEPAGE} state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
