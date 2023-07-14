import { useEffect, useState } from 'react';
import { useElements } from '@stripe/react-stripe-js';
import { Spinner } from '@material-tailwind/react';
import classNames from 'classnames';

import { PaymentForm } from 'modules';
import { useCart } from 'hooks';
import { CartItem } from 'components';

export const CartList = () => {
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
  );
};
