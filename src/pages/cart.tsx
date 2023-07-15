import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { withAuthUser } from 'next-firebase-auth';
import { httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';

import { errorMessages } from '@constants';
import { MainLayout } from 'layouts';
import { functions, getStripe } from 'utils';
import { CartList } from 'modules';
import { useCart } from 'hooks';

import type { Appearance } from '@stripe/stripe-js';

const stripePromise = getStripe();
const paymentIntentFunc = httpsCallable(functions, 'createPaymentIntent');

const CartPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const { cart, isCartEmpty } = useCart();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (!isCartEmpty) {
      paymentIntentFunc({ items: cart })
        .then((result) => {
          const data = result.data as { clientSecret: string };
          setClientSecret(data.clientSecret);
        })
        .catch(() => toast.error(errorMessages.unknown));
    }
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
