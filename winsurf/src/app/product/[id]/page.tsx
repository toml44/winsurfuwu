"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { findProductById, findVendorById, formatPrice } from "@/lib/mock";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = findProductById(params.id);
  const { add } = useCart();
  const { show } = useToast();
  if (!product) return notFound();
  const vendor = findVendorById(product.vendorId);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Link href={vendor ? `/vendor/${vendor.slug}` : "/explore"} className="text-sm text-[var(--primary)] hover:underline">
          ← Retour
        </Link>

        <div className="mt-6 grid gap-8 sm:grid-cols-2">
          <div className="h-64 w-full rounded-xl bg-muted sm:h-96" />
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            {vendor && (
              <Link href={`/vendor/${vendor.slug}`} className="text-sm text-muted-foreground hover:underline">
                {vendor.name}
              </Link>
            )}
            <div className="mt-4 text-xl">{formatPrice(product.priceCents)}</div>
            <p className="mt-4 text-muted-foreground">
              {product.description ?? "Un superbe produit local de qualité."}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => { add({ id: product.id, name: product.name, priceCents: product.priceCents, vendorId: product.vendorId }, 1); show({ title: "Ajouté au panier", description: product.name, variant: "success" }); }}
                className="rounded-full bg-[var(--primary)] px-5 py-3 text-white hover:opacity-90"
              >
                Ajouter au panier
              </button>
              <Link href="/cart" className="rounded-full border border-border px-5 py-3 hover:bg-muted">
                Voir le panier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
