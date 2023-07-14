import { loadStripe } from '@stripe/stripe-js';

import type { Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (stripePromise !== null) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? '', {
      locale: 'en',
    });
  }

  return stripePromise;
};
