import { stripePromise } from "@/constant/payment";
import ROUTES from "@/constant/routes";
import { useStripe } from "@/hooks/Purchase/useStripe";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { Navigate } from "react-router-dom";

const StripeCheckout = () => {
  const { clientSecret } = useStripe();
  if (clientSecret.length > 0) {
    return (
      <div className="w-full bg-foreground/90 py-6">
        <div className="container my-6">
          {clientSecret && (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              options={{ clientSecret }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          )}
        </div>
      </div>
    );
  } else {
    return <Navigate to={ROUTES.HOMEPAGE} />;
  }
};

export default StripeCheckout;
