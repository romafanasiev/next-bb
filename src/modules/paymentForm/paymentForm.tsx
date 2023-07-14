import { useEffect } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

import { useCart } from 'hooks';

import type { Layout } from '@stripe/stripe-js';
import type { FormEvent } from 'react';

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { clearCart } = useCart();

  const paymentElementOptions = {
    layout: 'tabs' as Layout,
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
    // fields: {
    //   billingDetails: {
    //     address: 'never' as FieldOption,
    //   },
    // },
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret',
    );

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case 'succeeded':
          clearCart();
          toast.success('Payment succeeded!');
          break;
        case 'processing':
          toast('Please wait...');
          break;
        case 'requires_payment_method':
          toast.error('Your payment was not successful, please try again.');
          break;
        default:
          toast.error('Something went wrong.');
          break;
      }
    });

    // toast.promise(
    //   stripe
    //     .retrievePaymentIntent(clientSecret)
    //     .then(({ paymentIntent }) => paymentIntent?.status),
    //   {
    //     loading: 'Your payment is processing',
    //     success: 'Payment succeeded!',
    //     error: 'Your payment was not successful, please try again.',
    //   },
    // );
  }, [stripe]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: window.location.origin,
        return_url: 'http://localhost:3000/cart',
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === 'card_error' || error.type === 'validation_error') {
      toast.error(error.message ?? '');
    } else {
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <PaymentElement options={paymentElementOptions} id="payment-element" />
      <button type="submit" disabled={!stripe || !elements}>
        Submit
      </button>
    </form>
  );
};
