import { useContext } from "react";
import { ServiceProviderContext } from "../context/SellerProvider";

export const useSeller = () => {
  return useContext(ServiceProviderContext);
};
