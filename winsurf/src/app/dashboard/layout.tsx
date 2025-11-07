"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getSellerProfile, listSellerProducts } from "@/lib/seller";
import { useRequireAuth } from "@/lib/auth-mock";
import { ShoppingBag, Package, Receipt, MessageSquare, Eye, Settings } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useRequireAuth();
  const pathname = usePathname();
  const profile = getSellerProfile();
  const products = listSellerProducts();

  const completeness = useMemo(() => {
    const checks = [
      !!profile?.businessName,
      !!profile?.slug,
      !!profile?.category,
      !!profile?.city,
      !!profile?.description,
      !!profile?.logoUrl,
      products.length >= 3,
    ];
    const score = Math.round((checks.filter(Boolean).length / checks.length) * 100);
    return isNaN(score) ? 0 : score;
  }, [profile?.businessName, profile?.slug, profile?.category, profile?.city, profile?.description, profile?.logoUrl, products.length]);

  const nav = [
    { href: "/dashboard", label: "Dashboard", icon: ShoppingBag },
    { href: "/dashboard/products", label: "Produits", icon: Package },
    { href: "/dashboard/orders", label: "Commandes", icon: Receipt },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: profile?.slug ? `/vendor/${profile.slug}` : "/explore", label: "Vitrine", icon: Eye },
    { href: "/seller/onboarding", label: "Paramètres", icon: Settings },
  ];

  const [open, setOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);
  const [pendingOrders, setPendingOrders] = useState<number>(0);

  useEffect(() => {
    const readCounts = () => {
      try {
        setUnreadMessages(parseInt(localStorage.getItem("winsurf_unread_messages") || "0", 10));
        setPendingOrders(parseInt(localStorage.getItem("winsurf_pending_orders") || "0", 10));
      } catch {}
    };
    readCounts();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "winsurf_unread_messages" || e.key === "winsurf_pending_orders") readCounts();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function NavList({ onClick }: { onClick?: () => void }) {
    return (
      <nav className="mt-2 grid gap-1 text-sm">
        {nav.map((n) => {
          const active = pathname === n.href;
          const Icon = n.icon;
          const badge = n.label === "Messages" ? unreadMessages : n.label === "Commandes" ? pendingOrders : 0;
          return (
            <Link
              key={n.href}
              href={n.href}
              onClick={onClick}
              className={`relative flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-muted ${active ? "bg-muted before:absolute before:left-0 before:top-0 before:h-full before:w-1 before:rounded-r before:bg-[var(--primary)] before:content-['']" : ""}`}
            >
              <Icon className={`h-4 w-4 ${active ? "text-[var(--primary)]" : "text-muted-foreground"}`} />
              <span className={`${active ? "text-foreground" : "text-foreground"}`}>{n.label}</span>
              {badge > 0 && (
                <span className="ml-auto inline-flex min-w-[1.25rem] items-center justify-center rounded-full bg-[var(--primary)] px-1.5 text-[10px] text-white">
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-background text-foreground">
      {/* Fixed sidebar on desktop */}
      <aside className="fixed left-0 top-0 hidden h-screen w-[260px] flex-col border-r border-border bg-card/60 p-4 shadow-sm md:flex">
        <div className="mb-4 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items.center overflow-hidden rounded-full bg-white/10 text-sm font-medium">
              {profile?.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.logoUrl} alt={profile.businessName} className="h-full w-full object-cover" />
              ) : (
                (profile?.businessName?.[0] ?? "W")
              )}
            </div>
            <div>
              <div className="text-sm font-medium">{profile?.businessName ?? "Mon entreprise"}</div>
              <div className="text-xs text-muted-foreground">Profil: {completeness}% complet</div>
            </div>
        </div>
        <NavList />
      </aside>

      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-border bg-card/60 px-4 py-3 md:hidden">
        <button onClick={() => setOpen(true)} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Menu</button>
        <div className="text-sm font-medium">{profile?.businessName ?? "Mon entreprise"}</div>
        <div className="h-2 w-20 overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-[var(--primary)]" style={{ width: `${completeness}%` }} />
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-[80vw] max-w-[280px] border-r border-border bg-card/60 p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center overflow-hidden rounded-full bg-white/10 text-sm font-medium">
                  {profile?.logoUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={profile.logoUrl} alt={profile.businessName} className="h-full w-full object-cover" />
                  ) : (
                    (profile?.businessName?.[0] ?? "W")
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{profile?.businessName ?? "Mon entreprise"}</div>
                  <div className="text-xs text-muted-foreground">Profil: {completeness}%</div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="rounded-lg border border-border px-3 py-1.5 text-sm hover:bg-muted">Fermer</button>
            </div>
            <NavList onClick={() => setOpen(false)} />
          </div>
        </div>
      )}

      {/* Content area: shifted right on desktop, scrolls independently */}
      <div className="mx-auto h-full max-w-6xl px-4 md:ml-[260px] md:px-6">
        <section className="flex h-full flex-col rounded-2xl border border-border bg-white text-neutral-900 shadow-sm dark:bg-card/60 dark:text-foreground">
          <header className="sticky top-0 z-10 flex items-center justify-between rounded-t-2xl border-b border-border bg-card/70 px-5 py-4 backdrop-blur">
            <div>
              <div className="text-lg font-semibold">{profile?.businessName ?? "Espace vendeur"}</div>
              <div className="text-xs text-muted-foreground">Complétude du profil</div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-40 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-[var(--primary)]" style={{ width: `${completeness}%` }} />
              </div>
              <span className="text-xs text-muted-foreground">{completeness}%</span>
            </div>
          </header>
          <div className="h-full overflow-auto p-5">{children}</div>
        </section>
      </div>
    </div>
  );
}
