import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";
import { effectivePrice } from "@/lib/types";

type CartState = {
  items: CartItem[];
  bump: number;
  add: (product: Product, quantity?: number) => void;
  setQty: (productId: number, quantity: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      bump: 0,
      add: (product, quantity = 1) => {
        const qty = Math.max(1, Math.round(quantity));
        const items = [...get().items];
        const idx = items.findIndex((i) => i.productId === product.id);
        if (idx >= 0) {
          items[idx] = { ...items[idx], quantity: items[idx].quantity + qty };
        } else {
          items.push({
            productId: product.id,
            name: product.name,
            price: effectivePrice(product),
            imageUrl: product.imageUrl,
            quantity: qty,
          });
        }
        set({ items, bump: get().bump + 1 });
      },
      setQty: (productId, quantity) => {
        const qty = Math.round(quantity);
        if (qty <= 0) {
          set({ items: get().items.filter((i) => i.productId !== productId) });
          return;
        }
        set({
          items: get().items.map((i) => (i.productId === productId ? { ...i, quantity: qty } : i)),
        });
      },
      remove: (productId) => set({ items: get().items.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
    }),
    { name: "nazli-cart" },
  ),
);

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.quantity, 0);
}

export function cartTotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}
