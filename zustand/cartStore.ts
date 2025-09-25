import { create } from 'zustand';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  discountPrice: number;
}

interface CartState {
  items: CartItem[];
  total: () => number;
  clearCart: () => void;
  removeItem: (id: string) => void;
  addItem: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (item) => {
    const existingItem = get().items.find(i => i.id === item.id);
    if (existingItem) {
      set({
        items: get().items.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        ),
      });
    } else {
      set({ items: [...get().items, item] });
    }
  },

  removeItem: (id) => {
    set({ items: get().items.filter(i => i.id !== id) });
  },

  clearCart: () => set({ items: [] }),

  updateQuantity: (id, quantity) => {
    set({
      items: get().items.map(i =>
        i.id === id ? { ...i, quantity } : i
      ),
    });
  },

  total: () => get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
}));
