import { useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect } from 'react';

export const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe();
  const elements = useElements();
  const options = {
    layout: {
      type: 'accordion',
      defaultCollapsed: false,
      radios: true,
      spacedAccordionItems: false,
    },
  };

  // const elements = stripe.elements(appearance, clientSecret);
  // const paymentElement = elements.create('payment', options);
  useEffect(() => {
    const paymentEl = elements?.create('payment', {
      paymentMethodOrder: ['apple_pay', 'google_pay', 'card'],
    });

    paymentEl?.mount('#card');
  }, []);

  return (
    <form>
      <div id="card" />
      {/* <PaymentElement options={options} /> */}
      <button>Submit</button>
    </form>
  );
};
