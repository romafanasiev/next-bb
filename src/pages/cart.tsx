import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { withAuthUser } from 'next-firebase-auth';
import { httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import { errorMessages, routes } from '@constants';
import { MainLayout } from 'layouts';
import { functions, getStripe } from 'utils';
import { CartList } from 'modules';
import { useCart } from 'hooks';

import type { Appearance } from '@stripe/stripe-js';

const stripePromise = getStripe();
const paymentIntentFunc = httpsCallable(functions, 'createPaymentIntent');
const cancelPaymentIntentFunc = httpsCallable(functions, 'cancelPaymentIntent');

interface TPaymentIntent {
  clientSecret: string;
  id: string;
}

const CartPage = () => {
  const [clientSecret, setClientSecret] = useState('');
  const [paymentId, setPaymentId] = useState('');

  const { cart, isCartEmpty, clearCart } = useCart();
  const router = useRouter();

  const handleCancel = async () => {
    try {
      await cancelPaymentIntentFunc({ id: paymentId });
      clearCart();
      router.replace(routes.default.root);
      toast.success('Cancelled successfully');
    } catch (error) {
      toast.error('Cancelled failed');
    }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (!isCartEmpty) {
      paymentIntentFunc({ items: cart })
        .then((result) => {
          const data = result.data as TPaymentIntent;
          setClientSecret(data.clientSecret);
          setPaymentId(data.id);
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
      {clientSecret && !isCartEmpty && (
        <Elements stripe={stripePromise} options={options}>
          <CartList />
          <button onClick={handleCancel}>Cancel payment</button>
        </Elements>
      )}
    </MainLayout>
  );
};

export default withAuthUser()(CartPage);
