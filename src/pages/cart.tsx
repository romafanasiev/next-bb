import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { withAuthUser } from 'next-firebase-auth';
import { loadStripe } from '@stripe/stripe-js';

import { MainLayout } from 'layouts';
import { PaymentForm } from 'modules';

import type { Appearance } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY ?? '');

const Cart = () => {
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: [{ id: 'xl-tshirt' }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'flat' as Appearance['theme'],
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <MainLayout>
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <PaymentForm />
        </Elements>
      )}
    </MainLayout>
  );
};

export default withAuthUser()(Cart);
