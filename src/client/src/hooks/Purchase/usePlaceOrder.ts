import { useNavigate } from "react-router-dom";
import usePost from "../usePost";
import { useStripe } from "./useStripe";
import ROUTES from "@/constant/routes";
import { useAuth } from "../Auth/useAuth";
import { useRefresh } from "../Auth/useRefresh";

interface CheckOutResponse {
  clientSecret: string;
}

interface CheckOutRequest {
  serviceId: string;
  packageTitle: string;
  quantity: number;
  note?: string;
}

const usePlaceOrder = () => {
  const refresh = useRefresh();
  const { Auth } = useAuth();
  const navigate = useNavigate();
  const { setClientSecret } = useStripe();
  const { isLoading, post, error } = usePost<string, CheckOutResponse>(
    "/api/checkout",
    {
      headers: { "Content-Type": "application/json" },
    }
  );
  const placeOrder = async (data: CheckOutRequest) => {
    try {
      await refresh();
      if (!(Auth.accessToken.length > 0)) return navigate(ROUTES.LOGIN);
      const result = await post(JSON.stringify(data));
      if (result && result.status >= 200 && result.status < 300) {
        setClientSecret(result.data.clientSecret);
        navigate(ROUTES.CHECKOUT);
      }
    } catch (error) {
      //
    }
  };

  return { placeOrder, isLoading, error };
};

export default usePlaceOrder;
