import { stripePromise } from "@/constant/payment";
import { useStripe } from "@/hooks/Purchase/useStripe";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const StripeCheckout = () => {
  const { clientSecret } = useStripe();
  console.info(clientSecret);
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
};

export default StripeCheckout;
