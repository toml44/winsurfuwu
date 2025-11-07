"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { id: string; name: string; priceCents: number; qty: number; vendorId: string };
export type Cart = { items: CartItem[] };

const CartContext = createContext<{
  cart: Cart;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  update: (id: string, qty: number) => void;
  clear: () => void;
  totalCents: number;
} | null>(null);

const STORAGE_KEY = "winsurf_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [] });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCart(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  }, [cart]);

  const add = (item: Omit<CartItem, "qty">, qty = 1) => {
    setCart((c) => {
      const existing = c.items.find((i) => i.id === item.id);
      if (existing) {
        return { items: c.items.map((i) => (i.id === item.id ? { ...i, qty: i.qty + qty } : i)) };
      }
      return { items: [...c.items, { ...item, qty }] };
    });
  };

  const remove = (id: string) => setCart((c) => ({ items: c.items.filter((i) => i.id !== id) }));
  const update = (id: string, qty: number) => setCart((c) => ({ items: c.items.map((i) => (i.id === id ? { ...i, qty } : i)) }));
  const clear = () => setCart({ items: [] });

  const totalCents = useMemo(() => cart.items.reduce((s, i) => s + i.priceCents * i.qty, 0), [cart]);

  return React.createElement(
    CartContext.Provider,
    { value: { cart, add, remove, update, clear, totalCents } },
    children
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
