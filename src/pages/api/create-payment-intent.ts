import Stripe from 'stripe';

import { TCartItem } from 'types';

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2022-11-15',
});

const calculateOrderAmount = (items: TCartItem[]) => {
  const totalAmount = items.reduce(
    (total, item) => total + item.price * 100,
    0,
  );

  return totalAmount;
};

export default async function handler(req: any, res: any) {
  const { items } = req.body;

  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items),
    currency: 'usd',
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
}
