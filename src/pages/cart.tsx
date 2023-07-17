import { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { withAuthUser } from 'next-firebase-auth';
import { useAuthUser } from '@react-query-firebase/auth';
import { httpsCallable } from 'firebase/functions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';

import { errorMessages, routes } from '@constants';
import { MainLayout } from 'layouts';
import { firebaseAuth, functions, getStripe } from 'utils';
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
  const user = useAuthUser(['user'], firebaseAuth);
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
  console.log(user.data);
  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    if (!isCartEmpty) {
      const paymentIntentItems = cart.map((item) => {
        const { id, version } = item;

        return { id, version };
      });

      paymentIntentFunc({
        items: paymentIntentItems,
      })
        .then((result) => {
          const data = result.data as TPaymentIntent;
          setClientSecret(data.clientSecret);
          setPaymentId(data.id);
        })
        .catch(() => toast.error(errorMessages.unknown));
    }
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
