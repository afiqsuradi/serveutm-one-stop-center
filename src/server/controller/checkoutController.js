const Service = require("../model/services");
const { User } = require("../model/user");
const stripe = require("../model/stripe");
const { fulfillOrder, createOrder } = require("./helper/checkout");
require("dotenv").config();
const endpointSecret = process.env.ENPOINT_SECRET;
const checkoutController = {};

checkoutController.createSession = async (req, res) => {
  const baseUrl = `${req.protocol}://${req.get("host")}/`;
  const { serviceId, packageTitle, note, quantity } = req.body;
  if (!serviceId || !packageTitle)
    return res
      .status(400)
      .json({ message: "Please select service and package" });
  try {
    const service = await Service.findOne({ _id: serviceId });
    if (!service) return res.status(404).json({ message: "Service not found" });
    const user = await User.findOne({ username: req.user.username });
    if (!user) return res.status(404).json({ message: "User not found" });
    const package = service.pricePackage.find((pack) =>
      pack.title.includes(packageTitle)
    );
    if (!package)
      return res
        .status(404)
        .json({ message: "Could not find selected package" });
    const images = service.images.map(
      (url) => `${baseUrl}images/thumbnails/${url}`
    );
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "myr",
            product_data: {
              name: `I will ${service.title}`,
              description: package.description,
              metadata: {
                serviceId: serviceId,
                package: package.title,
                user: user._id.toString(),
                note: note,
              },
              images,
            },
            unit_amount: package.price * 100,
          },
          quantity,
        },
      ],
      mode: "payment",
      redirect_on_completion: "always",
      invoice_creation: {
        enabled: true,
      },
      customer_email: user.email,
      currency: "myr",
      return_url: `${process.env.ORIGIN_URL}/checkout-confirm?session_id={CHECKOUT_SESSION_ID}`,
    });
    return res.status(200).json({ clientSecret: session.client_secret });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

checkoutController.getSessionStatus = async (req, res) => {
  const session_id = req.query.session_id;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items.data.price.product", "payment_intent"],
    });
    if (session.status === "open") {
      res.json({ status: session.status });
    }

    const invoice = await stripe.invoices.retrieve(
      session.payment_intent.invoice
    );
    const paymentMethod = await stripe.paymentMethods.retrieve(
      session.payment_intent.payment_method
    );

    const responseData = {
      status: session.status,
      payment_status: session.payment_status,
      invoice: {
        number: invoice.number,
        invoice_pdf: invoice.invoice_pdf,
        total: invoice.amount_paid / 100,
        email: invoice.customer_email,
        method: `${paymentMethod.card.brand} •••• ${paymentMethod.card.last4}`,
      },
    };

    res.json(responseData).status(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

checkoutController.handlePaymentWebhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);

    res.status(200).end();
  } catch (err) {
    return res.status(400).json({ message: `Webhook Error: ${err.message}` });
  }
  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;

        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ["line_items.data.price.product"],
          }
        );
        const lineItems = sessionWithLineItems.line_items;
        await createOrder(lineItems, session.id);
        if (session.payment_status === "paid") {
          await fulfillOrder(session);
        }

        break;
      }

      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object;

        // Fulfill the purchase...
        await fulfillOrder(session);

        break;
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object;

        // Send an email to the customer asking them to retry their order
        await fulfillOrder(session, false);

        break;
      }
    }
  } catch (error) {
    // return res.status(500).json({ message: `Server error: ${error.message}` });
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = checkoutController;
