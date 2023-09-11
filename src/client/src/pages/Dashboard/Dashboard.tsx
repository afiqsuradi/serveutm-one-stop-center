import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import ROUTES from "../../constants/path";
import UserDashboard from "./UserDashboard";
import SellerDashboard from "./SellerDashboard";

const Dashboard = () => {
  const { Auth } = useAuth();
  return (
    <>
      {Auth.role === "user" ? (
        <UserDashboard />
      ) : Auth.role === "service_provider" ? (
        <SellerDashboard />
      ) : (
        <Navigate to={ROUTES.NOTFOUND} />
      )}
    </>
  );
};

export default Dashboard;
