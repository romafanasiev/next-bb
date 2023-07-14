import { useState, useEffect } from 'react';
import {
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';

import type { FieldOption, Layout } from '@stripe/stripe-js';
import type { FormEvent } from 'react';

export const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [isLoading, setIsLoading] = useState(false);

  const paymentElementOptions = {
    layout: 'tabs' as Layout,
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
    fields: {
      billingDetails: {
        address: 'never' as FieldOption,
      },
    },
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

    toast.promise(
      stripe
        .retrievePaymentIntent(clientSecret)
        .then(({ paymentIntent }) => paymentIntent?.status),
      {
        loading: 'Your payment is processing',
        success: 'Payment succeeded!',
        error: 'Your payment was not successful, please try again.',
      },
    );

    //     stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
    //       switch (paymentIntent?.status) {
    //         case 'succeeded':
    //           toast.success('Payment succeeded!');
    //           break;
    //         case 'processing':
    //           toast.promise(
    //   saveSettings(settings),
    //    {
    //      loading: 'Saving...',
    //      success: <b>Settings saved!</b>,
    //      error: <b>Could not save.</b>,
    //    }
    //  );
    //           toast.('Your payment is processing.');
    //           break;
    //         case 'requires_payment_method':
    //           toast.error('Your payment was not successful, please try again.');
    //           break;
    //         default:
    //           toast.error('Something went wrong.');
    //           break;
    //       }
    //     });
  }, [stripe]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    console.log(e);
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
