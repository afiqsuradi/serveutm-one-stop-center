import { OrderType } from "@/interface/Orders";
import { useAuth } from "../Auth/useAuth";
import useData from "../useData";

type OrdersRequestFilter = {
  fullfillmentStatus: string;
  target?: string;
};

type OrdersResponseType = {
  count: number;
  data: OrderType[];
};

const useOrders = (filters: OrdersRequestFilter) => {
  const { Auth } = useAuth();
  const query = Object.entries(filters)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");
  const { isLoading, data, error } = useData<OrdersResponseType>(
    `/api/orders?${query}`,
    {},
    [Auth.accessToken, JSON.stringify(filters)]
  );
  return { data, isLoading, error };
};

export default useOrders;
