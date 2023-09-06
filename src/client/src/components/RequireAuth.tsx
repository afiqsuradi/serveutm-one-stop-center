import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import ROUTES from "../constants/path";
import { AuthType } from "../context/authProvider";

interface Props {
  allowedRole: AuthType["role"][];
}

const RequireAuth = ({ allowedRole }: Props) => {
  const { Auth } = useAuth();
  const location = useLocation();
  const authorise = allowedRole.reduce((acc, curr) => {
    if (acc === true) {
      return acc;
    }
    return Auth.role === curr;
  }, false);
  // user exist -> user role
  return Auth?.role !== undefined && authorise ? (
    <Outlet />
  ) : Auth.username !== "" ? (
    // TODO: ADD UNAUTHORISED PAGE
    <Navigate to={ROUTES.HOMEPAGE} state={{ from: location }} replace />
  ) : (
    <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />
  );
};

export default RequireAuth;
