import { useState, useEffect } from 'react';
import { useElements } from '@stripe/react-stripe-js';
import { Spinner } from '@material-tailwind/react';
import dynamic from 'next/dynamic';
import classNames from 'classnames';

import { useCart } from 'hooks';
import { CartItem } from 'components';

const PaymentForm = dynamic(
  () => import('../paymentForm').then((module) => module.PaymentForm),
  {
    ssr: false,
  },
);

export const CartList: React.FC = () => {
  const [isStripeLoading, setIsStripLoading] = useState(true);

  const elements = useElements();
  const { cart } = useCart();

  useEffect(() => {
    const element = elements?.getElement('payment');

    element?.on('ready', () => {
      setIsStripLoading(false);
    });
  }, [elements, isStripeLoading]);

  return (
    <div className="m-auto flex h-full max-w-[345px] flex-col justify-center gap-2">
      {isStripeLoading && <Spinner />}
      <div className={classNames({ hidden: isStripeLoading })}>
        <div>
          {cart.map((item) => (
            <CartItem
              key={item.id}
              coverUrl={item.coverUrl}
              title={item.title}
              price={item.price}
            />
          ))}
          <PaymentForm />
        </div>
      </div>
    </div>
  );
};
