"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { createOrder } from "@/lib/orders";
import { formatPrice } from "@/lib/mock";
import { useState } from "react";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalCents, clear } = useCart();
  const [method, setMethod] = useState<"delivery" | "pickup">("delivery");
  const [address, setAddress] = useState("");

  const canPay = cart.items.length > 0 && (method === "pickup" || address.trim().length >= 8);
  const stripePk = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string | undefined;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-6 text-2xl font-semibold">Paiement</h1>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-3 text-lg font-medium">Méthode</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => setMethod("delivery")}
                  className={`rounded-full px-4 py-2 text-sm ${method === "delivery" ? "bg-[var(--primary)] text-white" : "border border-border"}`}
                >
                  Livraison
                </button>
                <button
                  onClick={() => setMethod("pickup")}
                  className={`rounded-full px-4 py-2 text-sm ${method === "pickup" ? "bg-[var(--primary)] text-white" : "border border-border"}`}
                >
                  Retrait sur place
                </button>
              </div>

              {method === "delivery" && (
                <div className="mt-4">
                  <label className="mb-1 block text-sm text-muted-foreground">Adresse de livraison</label>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="12 rue de la Paix, Paris"
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                  />
                </div>
              )}
            </div>

            <div>
              <h2 className="mb-3 text-lg font-medium">Résumé</h2>
              <div className="space-y-2 text-sm text-muted-foreground">
                {cart.items.map((i) => (
                  <div key={i.id} className="flex justify-between">
                    <span>
                      {i.name} × {i.qty}
                    </span>
                    <span>{formatPrice(i.priceCents * i.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-xl font-semibold">{formatPrice(totalCents)}</span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Link href="/cart" className="rounded-full border border-border px-4 py-2 hover:bg-muted">
              Retour panier
            </Link>
            {stripePk ? (
              <button
                disabled={!canPay}
                onClick={async () => {
                  const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      items: cart.items.map((i) => ({ name: i.name, qty: i.qty, priceCents: i.priceCents })),
                      successUrl: `${window.location.origin}/orders?success=1`,
                      cancelUrl: `${window.location.origin}/cart`,
                    }),
                  });
                  const data = await res.json();
                  if (data?.url) {
                    window.location.href = data.url as string;
                  }
                }}
                className={`rounded-full px-5 py-2 text-white ${
                  canPay ? "bg-[var(--primary)] hover:opacity-90" : "bg-gray-400/40 cursor-not-allowed"
                }`}
              >
                Payer avec Stripe (test)
              </button>
            ) : (
              <button
                disabled={!canPay}
                onClick={() => {
                  const order = createOrder(
                    cart.items.map((i) => ({ id: i.id, name: i.name, qty: i.qty, priceCents: i.priceCents })),
                    totalCents
                  );
                  clear();
                  router.push(`/orders?success=${order.id}`);
                }}
                className={`rounded-full px-5 py-2 text-white ${
                  canPay ? "bg-[var(--primary)] hover:opacity-90" : "bg-gray-400/40 cursor-not-allowed"
                }`}
              >
                Payer maintenant (mock)
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
