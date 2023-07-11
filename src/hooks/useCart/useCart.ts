import { useStore } from 'store';

export const useCart = () => {
  const addToCart = useStore.use.addToCart();
  const cart = useStore.use.cart();

  return { cart, addToCart };
};
