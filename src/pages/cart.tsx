import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { withAuthUser } from 'next-firebase-auth';

import { MainLayout } from 'layouts';
import { getStripe } from 'utils';
import { CartList } from 'modules';
import { useCart } from 'hooks';

import type { Appearance } from '@stripe/stripe-js';

const stripePromise = getStripe();

const CartPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cart } = useCart();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads

    fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [cart]);

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
          <CartList />
        </Elements>
      )}
    </MainLayout>
  );
};

export default withAuthUser()(CartPage);
