import { useAuth } from "@/hooks/Auth/useAuth";
import { useToast } from "../ui/use-toast";
import { Navigate, Outlet } from "react-router-dom";

const RequireVerified = ({ fallback }: { fallback: string }) => {
  const { Auth } = useAuth();
  const { toast } = useToast();
  if (Auth.isVerified) {
    return <Outlet />;
  } else {
    toast({
      variant: "destructive",
      description: "You are not verified yet.",
    });
    return <Navigate to={fallback} />;
  }
};

export default RequireVerified;
