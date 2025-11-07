"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { findVendorBySlug, getProductsByVendor, formatPrice } from "@/lib/mock";
import { useCart } from "@/lib/cart";
import { useToast } from "@/lib/toast";
import { getSellerProfile, listSellerProducts } from "@/lib/seller";

export default function VendorPage({ params }: { params: { slug: string } }) {
  const seller = getSellerProfile();
  const isSellerMatch = seller && seller.slug === params.slug;
  const vendor = isSellerMatch
    ? {
        id: "seller-1",
        slug: seller!.slug,
        name: seller!.businessName,
        category: seller!.category ?? "",
        city: seller!.city ?? "",
        description: seller!.description ?? "",
      }
    : findVendorBySlug(params.slug);
  const { add } = useCart();
  const { show } = useToast();
  if (!vendor) return notFound();
  const prods = isSellerMatch
    ? listSellerProducts().filter((p) => (p.isActive ?? true))
        .map((p) => ({ id: p.id, vendorId: "seller-1", name: p.name, priceCents: p.priceCents, description: p.description }))
    : getProductsByVendor(vendor.id);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{vendor.name}</h1>
            <p className="text-muted-foreground">{vendor.category} • {vendor.city}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted"
              onClick={() => {
                const url = typeof window !== 'undefined' ? window.location.href : '';
                if (url) {
                  navigator.clipboard.writeText(url);
                }
                show({ title: 'Lien copié', description: 'URL de la vitrine copiée dans le presse‑papiers.', variant: 'success' });
              }}
            >
              Partager la vitrine
            </button>
            <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Accueil</Link>
          </div>
        </div>

        <p className="mb-8 max-w-3xl">{vendor.description}</p>

        <h2 className="mb-3 text-xl font-medium">Produits</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {prods.map((p) => (
            <div key={p.id} className="rounded-xl border border-border p-4">
              <div className="h-40 w-full rounded-lg bg-muted" />
              <Link href={`/product/${p.id}`} className="mt-3 block font-medium hover:underline">
                {p.name}
              </Link>
              <div className="text-sm text-muted-foreground">{formatPrice(p.priceCents)}</div>
              <div className="mt-3 flex gap-2">
                <Link href={`/product/${p.id}`} className="rounded-full border border-border px-3 py-2 text-sm hover:bg-muted">Voir</Link>
                <button
                  onClick={() => {
                    add({ id: p.id, name: p.name, priceCents: p.priceCents, vendorId: isSellerMatch ? "seller-1" : p.vendorId }, 1);
                    show({ title: "Ajouté au panier", description: p.name, variant: "success" });
                  }}
                  className="rounded-full bg-[var(--primary)] px-3 py-2 text-sm text-white hover:opacity-90"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
