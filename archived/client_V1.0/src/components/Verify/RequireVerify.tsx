import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ROUTES from "../../constants/path";

const RequireVerify = () => {
  const { Auth } = useAuth();
  const location = useLocation();
  // user exist -> user role
  return Auth?.isVerified ? (
    <Outlet />
  ) : (
    // TODO: ADD UNAUTHORISED PAGE
    <Navigate to={ROUTES.HOMEPAGE} state={{ from: location }} replace />
  );
};

export default RequireVerify;
