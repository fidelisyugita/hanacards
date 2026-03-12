import { create } from "zustand";
import { Product } from "@/data/products";
import { apiFetch } from "@/lib/api";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;

  // DB Sync
  setFromDB: (items: CartItem[]) => void;
  syncToDB: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find(
        (item) => item.product.id === product.id,
      );
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    });
    // Fire and forget sync if they happen to be logged in
    get().syncToDB().catch(() => {});
  },
  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.product.id !== productId),
    }));
    get().syncToDB().catch(() => {});
  },
  updateQuantity: (productId, quantity) => {
    set((state) => {
      if (quantity <= 0) {
        return {
          items: state.items.filter((item) => item.product.id !== productId),
        };
      }
      return {
        items: state.items.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item,
        ),
      };
    });
    get().syncToDB().catch(() => {});
  },
  clearCart: () => {
    set({ items: [] });
    // Note: To clear DB as well, you'd call apiFetch('/me/cart', { method: 'DELETE' })
    // but typically clearCart is only used on successful order placement where the backend clears it anyway.
  },
  getCartTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  },
  getCartCount: () => {
    return get().items.reduce((count, item) => count + item.quantity, 0);
  },

  setFromDB: (items: CartItem[]) => {
    set({ items });
  },

  syncToDB: async () => {
    // We only want this to run if they are logged in.
    // We check via our api fetcher; if it throws a 401, we just swallow it
    // because it means they are a guest user (which is fine, local state works).
    const items = get().items;
    try {
      // Very naive sync: clear DB cart and bulk insert new one
      // In production, you'd want a more robust merge strategy
      await apiFetch("/me/cart", { method: "DELETE" });
      
      for (const item of items) {
        await apiFetch("/me/cart", {
          method: "POST",
          data: { productId: item.product.id, quantity: item.quantity },
        });
      }
    } catch {
      // Ignore 401s (guest user)
    }
  },
}));
