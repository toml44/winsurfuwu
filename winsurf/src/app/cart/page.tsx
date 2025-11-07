"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/mock";
import { useToast } from "@/lib/toast";

export default function CartPage() {
  const { cart, update, remove, totalCents, clear } = useCart();
  const { show } = useToast();
  const hasItems = cart.items.length > 0;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <h1 className="mb-6 text-2xl font-semibold">Panier</h1>

        {!hasItems && (
          <div className="rounded-xl border border-border p-8 text-center text-muted-foreground">
            Votre panier est vide. <Link className="text-[var(--primary)] hover:underline" href="/explore">Explorer</Link>
          </div>
        )}

        {hasItems && (
          <div className="rounded-xl border border-border">
            <table className="w-full border-separate border-spacing-0">
              <thead className="text-left text-sm text-muted-foreground">
                <tr>
                  <th className="border-b border-border p-4">Produit</th>
                  <th className="border-b border-border p-4">Prix</th>
                  <th className="border-b border-border p-4">Qté</th>
                  <th className="border-b border-border p-4">Total</th>
                  <th className="border-b border-border p-4" />
                </tr>
              </thead>
              <tbody>
                {cart.items.map((i) => (
                  <tr key={i.id} className="align-middle">
                    <td className="p-4">{i.name}</td>
                    <td className="p-4">{formatPrice(i.priceCents)}</td>
                    <td className="p-4">
                      <input
                        type="number"
                        min={1}
                        value={i.qty}
                        onChange={(e) => {
                          const next = Math.max(1, Number(e.target.value) || 1);
                          update(i.id, next);
                          show({ title: "Quantité mise à jour", description: `${i.name} × ${next}`, variant: "success" });
                        }}
                        className="w-20 rounded-md border border-input bg-background px-2 py-1"
                      />
                    </td>
                    <td className="p-4">{formatPrice(i.priceCents * i.qty)}</td>
                    <td className="p-4">
                      <button className="text-sm text-red-500 hover:underline" onClick={() => { remove(i.id); show({ title: "Article supprimé", description: i.name }); }}>
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex items-center justify-between border-t border-border p-4">
              <button className="text-sm text-muted-foreground hover:underline" onClick={() => { clear(); show({ title: "Panier vidé" }); }}>Vider le panier</button>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Sous-total</div>
                <div className="text-xl font-medium">{formatPrice(totalCents)}</div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <Link href="/explore" className="rounded-full border border-border px-4 py-2 hover:bg-muted">Continuer mes achats</Link>
          {hasItems && (
            <Link href="/checkout" className="rounded-full bg-[var(--primary)] px-5 py-2 text-white hover:opacity-90">
              Passer au paiement
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
