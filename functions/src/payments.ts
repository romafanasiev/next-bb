import * as functions from 'firebase-functions';

import { stripe } from './config';

interface TCartItem {
  id: string;
  version: 'exclusive' | 'standart';
}

//** Summarize total value */
const calculateOrderAmount = (items: TCartItem[]) => {
  const totalAmount = items.reduce((total, item) => {
    if (item.version === 'standart') {
      return total + 50 * 100;
    }

    return total + 200 * 100;
  }, 0);

  return totalAmount;
};

/// DEPLOYABLE FUNCTIONS ///
export const createPaymentIntent = functions.https.onCall(
  async (data, _ctx) => {
    const { items } = data;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return {
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      };
    } catch (error) {
      throw new functions.https.HttpsError(
        'unknown',
        'Failed to create payment intent',
        error,
      );
    }
  },
);

export const cancelPaymentIntent = functions.https.onCall(
  async (data, _ctx) => {
    const { id } = data;

    try {
      await stripe.paymentIntents.cancel(id);

      return { message: 'Canceled' };
    } catch (error) {
      throw new functions.https.HttpsError(
        'unknown',
        'Failed to cancel payment intent',
        error,
      );
    }
  },
);
