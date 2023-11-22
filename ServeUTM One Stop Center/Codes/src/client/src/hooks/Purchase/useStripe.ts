import { StripeContext } from "@/context/stripeSecretProvider";
import { useContext } from "react";

export const useStripe = () => {
  return useContext(StripeContext);
};
