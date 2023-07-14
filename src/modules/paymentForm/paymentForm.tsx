import { PaymentElement } from '@stripe/react-stripe-js';

import type { FieldOption, Layout } from '@stripe/stripe-js';

export const PaymentForm = () => {
  const paymentElementOptions = {
    layout: 'tabs' as Layout,
    paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
    fields: {
      billingDetails: {
        address: 'never' as FieldOption,
      },
    },
  };

  return (
    <form>
      <div id="payment_form" />
      <PaymentElement options={paymentElementOptions} />
      <button>Submit</button>
    </form>
  );
};
