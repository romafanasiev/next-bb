import * as functions from 'firebase-functions';

import { db, stripe } from './config';

export const stripeWebhookSignature =
  functions.config().stripe.webhook_signature;

// const webhookHandler = async (data: any) => {
//   const customerId = data.customer;
//   const _customer = await stripe.customers.retrieve(customerId);

//   return await db.doc('payments/123').set(data, { merge: true });
// };

const webhookHandler = async (data: any) =>
  await db.doc('payments/123').set(data, { merge: true });

export const paymentWebhookEndpoint = functions.https.onRequest(
  async (req, _res) => {
    try {
      const signature = req.headers['stripe-signature'];

      if (signature) {
        const event = stripe.webhooks.constructEvent(
          (req as any).rawBody,
          signature,
          stripeWebhookSignature,
        );
        const data = event.data.object;

        switch (event.type) {
          case 'payment_intent.succeeded':
            await webhookHandler(data);
        }
      }
    } catch (error) {
      throw new functions.https.HttpsError(
        'unknown',
        `Error constructing Stripe event: ${error}`,
      );
    }
  },
);

// export const handleStripeEvent = functions.https.onRequest(async (req, res) => {
//   const signature = req.headers['stripe-signature'] ?? '';

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       req.rawBody,
//       signature,
//       stripeSecret,
//     );

//     // logic to handle the event here
//     let paymentIntent = null;

//     switch (event.type) {
//       case 'payment_intent.succeeded':
//         paymentIntent = event.data.object;
//         return await db.collection('payments').doc('stripe').set(paymentIntent);
//         break;
//       default:
//         functions.logger.log('Unhandled event type', event.type);
//         break;
//     }

//     res.send();
//   } catch (error) {
//     throw new functions.https.HttpsError(
//       'unknown',
//       `Error constructing Stripe event: ${error}`,
//     );
//   }
// });
