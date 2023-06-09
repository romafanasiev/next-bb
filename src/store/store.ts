import { create, StoreApi, UseBoundStore } from 'zustand';
import { persist } from 'zustand/middleware';

import { storageIds } from '@constants';

import type { TCartItem } from 'types';

// Autogenerate selectors
type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S,
) => {
  const store = _store as WithSelectors<typeof _store>;
  store.use = {};

  for (const k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

// Store instance
interface AppState {
  cart: TCartItem[];
  addToCart: (track: TCartItem) => void;
  removeFromCart: (id: TCartItem['id']) => void;
}

const useStoreBase = create<AppState>()(
  persist(
    (set) => {
      return {
        cart: [],
        addToCart: (track) =>
          set((state) => {
            if (!state.cart.find((item) => item.id === track.id)) {
              return { cart: [...state.cart, track] };
            }

            return state;
          }),
        removeFromCart: (id) =>
          set((state) => {
            return { cart: state.cart.filter((item) => item.id !== id) };
          }),
      };
    },
    {
      name: storageIds.tracks,
    },
  ),
);

export const useStore = createSelectors(useStoreBase);
