import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { StateCreator } from "zustand";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
  customizations?: Record<string, any>;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
}

type CartPersist = (
  config: StateCreator<CartStore>,
  options: PersistOptions<CartStore>
) => StateCreator<CartStore>;

export const useCartStore = create<CartStore>()(
  (persist as CartPersist)(
    (set) => ({
      items: [] as CartItem[],
      isOpen: false,
      addItem: (item: CartItem) =>
        set((state) => {
          const existingItem = state.items.find((i) => i.id === item.id);

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }

          return { items: [...state.items, item] };
        }),
      removeItem: (itemId: string) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        })),
      updateQuantity: (itemId: string, quantity: number) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === itemId ? { ...item, quantity } : item)),
        })),
      clearCart: () => set({ items: [] }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
    }),
    {
      name: "cart-storage",
    }
  )
);
