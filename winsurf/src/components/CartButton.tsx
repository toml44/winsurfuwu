"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart";

export function CartButton() {
  const { cart, totalCents } = useCart();
  const count = cart.items.reduce((s, i) => s + i.qty, 0);
  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm text-white/90 hover:bg-white/10"
    >
      <ShoppingCart className="h-4 w-4" /> Panier
      {count > 0 && (
        <span className="ml-1 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs text-white">
          {count}
        </span>
      )}
    </Link>
  );
}
