// This is your test secret API key.
import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

const calculateOrderAmount = (_items: any) => 1400;

export default async function handler(req: any, res: any) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'eur',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
