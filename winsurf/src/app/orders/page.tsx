"use client";

import Link from "next/link";
import { listOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/mock";
import { useEffect } from "react";
import { useToast } from "@/lib/toast";

export default function OrdersPage({ searchParams }: { searchParams: { success?: string } }) {
  const orders = listOrders();
  const success = searchParams.success;
  const { show } = useToast();

  useEffect(() => {
    if (success) {
      show({ title: "Commande confirmée", description: `Commande ${success}`, variant: "success" });
    }
  }, [success, show]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mes commandes</h1>
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Accueil</Link>
        </div>

        {success && (
          <div className="mb-4 rounded-lg border border-green-600/30 bg-green-600/10 p-3 text-sm text-green-200">
            Commande {success} confirmée (mock) ✅
          </div>
        )}

        {!orders.length ? (
          <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
            Aucune commande.
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => (
              <div key={o.id} className="rounded-xl border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                  <div className="text-sm">Statut: <span className="font-medium">{o.status}</span></div>
                </div>
                <div className="mt-3 grid gap-2 text-sm text-muted-foreground">
                  {o.items.map((i) => (
                    <div key={i.id} className="flex justify-between">
                      <span>{i.name} × {i.qty}</span>
                      <span>{formatPrice(i.priceCents * i.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
                  <div className="text-sm text-muted-foreground">Total</div>
                  <div className="text-lg font-semibold">{formatPrice(o.totalCents)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
