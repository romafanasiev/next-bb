import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import { routes } from '@constants';
import { Indicator, CartItem } from 'components';
import { useCart } from 'hooks';

export const Cart = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { cart, removeFromCart } = useCart();

  const modalStyles = classNames(
    'absolute flex flex-col gap-2 right-[-40px] top-[37px] w-[300px] bg-primary rounded-lg p-2 z-[100] text-center',
    {
      block: isVisible,
      hidden: !isVisible,
    },
  );

  const handleVisibility = () => {
    if (cart.length > 0) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    if (cart.length === 0) {
      setIsVisible(false);
    }
  }, [cart]);

  return (
    <div
      onMouseOver={handleVisibility}
      onFocus={handleVisibility}
      className="relative"
    >
      <Indicator count={cart.length}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="fill-current"
        >
          <path d="M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z"></path>
          <circle cx="10.5" cy="19.5" r="1.5"></circle>
          <circle cx="17.5" cy="19.5" r="1.5"></circle>
        </svg>
      </Indicator>
      <div className={modalStyles}>
        {cart.map((item) => (
          <div className="flex items-center justify-between" key={item.id}>
            <CartItem
              price={item.price}
              coverUrl={item.coverUrl}
              title={item.title}
            />
            <button onClick={() => removeFromCart(item.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </button>
          </div>
        ))}
        <Link href={routes.default.cart}>Proceed to checkout</Link>
        <button onClick={() => setIsVisible(false)}>Continue shopping</button>
      </div>
    </div>
  );
};
