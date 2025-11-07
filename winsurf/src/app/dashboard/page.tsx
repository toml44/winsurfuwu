"use client";

import Link from "next/link";
import { listOrders } from "@/lib/orders";
import { getSellerProfile } from "@/lib/seller";
import { useRequireAuth } from "@/lib/auth-mock";
import { listSellerProducts } from "@/lib/seller";
import { useEffect, useState } from "react";
import { useToast } from "@/lib/toast";
import { Crown, Sparkles } from "lucide-react";

export default function DashboardPage() {
  useRequireAuth();
  const profile = getSellerProfile();
  const orders = listOrders();
  const [productCount, setProductCount] = useState(0);
  useEffect(() => { setProductCount(listSellerProducts().length); }, []);
  const kpiOrders = orders.length;
  const gross = orders.reduce((s, o) => s + o.totalCents, 0) / 100;
  const net = orders.reduce((s, o) => s + (o.netCents ?? o.totalCents * 0.9), 0) / 100;
  const fees = orders.reduce((s, o) => s + (o.feeCents ?? o.totalCents * 0.1), 0) / 100;
  const { show } = useToast();
  const [subscribed, setSubscribed] = useState<boolean>(() => {
    try { return localStorage.getItem('winsurf_sub_active') === '1'; } catch { return false; }
  });
  function subscribe() {
    try { localStorage.setItem('winsurf_sub_active','1'); } catch {}
    setSubscribed(true);
    show({ title: 'Abonnement activé', description: 'Plafond de 20 produits levé.', variant: 'success' });
  }
  function unsubscribe() {
    try { localStorage.removeItem('winsurf_sub_active'); } catch {}
    setSubscribed(false);
    show({ title: 'Revenu au plan gratuit', description: 'Limite de 20 produits réactivée.', variant: 'default' });
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard vendeur (mock)</h1>
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Accueil</Link>
        </div>

        {!profile && (
          <div className="mb-6 rounded-xl border border-yellow-600/30 bg-yellow-600/10 p-4 text-yellow-200">
            Complétez votre profil vendeur pour débloquer toutes les fonctionnalités.
            <Link className="ml-2 underline" href="/seller/onboarding">Aller à l'onboarding</Link>
          </div>
        )}

        {!subscribed ? (
          <div className="mb-5 flex items-center gap-2 rounded-md border border-blue-400/20 bg-blue-500/5 px-3 py-2 text-xs">
            <Crown className="h-4 w-4 text-blue-300/80" />
            <span className="text-muted-foreground">Gratuit: 20 produits ({productCount}/20). Pour plus, </span>
            <button onClick={subscribe} className="underline decoration-blue-300/60 underline-offset-2 hover:text-blue-200">Activer PRO (5€/mois)</button>
          </div>
        ) : (
          <div className="mb-5 flex items-center gap-2 rounded-md border border-emerald-400/20 bg-emerald-500/5 px-3 py-2 text-xs">
            <Sparkles className="h-4 w-4 text-emerald-300/80" />
            <span className="text-muted-foreground">PRO actif. </span>
            <button onClick={unsubscribe} className="underline decoration-emerald-300/60 underline-offset-2 hover:text-emerald-200">Revenir au plan gratuit</button>
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border p-4">
            <div className="text-sm text-muted-foreground">Commandes</div>
            <div className="mt-2 text-3xl font-semibold">{kpiOrders}</div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <div className="text-sm text-muted-foreground">CA brut</div>
            <div className="mt-2 text-3xl font-semibold">{gross.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <div className="text-sm text-muted-foreground">CA net (après 10%)</div>
            <div className="mt-2 text-3xl font-semibold">{net.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <div className="text-sm text-muted-foreground">Commission (10%)</div>
            <div className="mt-2 text-3xl font-semibold">{fees.toLocaleString("fr-FR", { style: "currency", currency: "EUR" })}</div>
          </div>
          <div className="rounded-xl border border-border p-4">
            <div className="text-sm text-muted-foreground">Produits actifs</div>
            <div className="mt-2 text-3xl font-semibold">—</div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link href="/dashboard/products" className="rounded-xl border border-border p-6 hover:bg-muted">
            <div className="text-lg font-medium">Gérer mes produits</div>
            <div className="text-sm text-muted-foreground">Ajouter, éditer, activer/désactiver.</div>
          </Link>
          <Link href="/dashboard/orders" className="rounded-xl border border-border p-6 hover:bg-muted">
            <div className="text-lg font-medium">Voir mes commandes</div>
            <div className="text-sm text-muted-foreground">Suivi et statuts.</div>
          </Link>
        </div>
      </div>
    </main>
  );
}
