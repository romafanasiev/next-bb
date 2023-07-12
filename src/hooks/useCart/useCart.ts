import { useStore } from 'store';

export const useCart = () => {
  const addToCart = useStore.use.addToCart();
  const removeFromCart = useStore.use.removeFromCart();
  const cart = useStore.use.cart();

  return { cart, addToCart, removeFromCart };
};
