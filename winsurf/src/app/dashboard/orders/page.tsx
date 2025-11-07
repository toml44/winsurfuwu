"use client";

import Link from "next/link";
import { listOrders } from "@/lib/orders";
import { formatPrice } from "@/lib/mock";
import { useRequireAuth } from "@/lib/auth-mock";
import { useMemo, useState } from "react";

export default function SellerOrdersPage() {
  useRequireAuth();
  const allOrders = listOrders();
  const [period, setPeriod] = useState<"day" | "week" | "month" | "all">("all");
  const periodMs = { day: 24*3600e3, week: 7*24*3600e3, month: 30*24*3600e3 } as const;
  const orders = useMemo(() => {
    if (period === "all") return allOrders;
    const now = Date.now();
    const delta = periodMs[period];
    return allOrders.filter(o => now - new Date(o.createdAt).getTime() <= delta);
  }, [allOrders, period]);

  const totals = useMemo(() => {
    const gross = orders.reduce((s, o) => s + o.totalCents, 0);
    const net = orders.reduce((s, o) => s + (o.netCents ?? Math.round(o.totalCents * 0.9)), 0);
    const fee = orders.reduce((s, o) => s + (o.feeCents ?? Math.round(o.totalCents * 0.1)), 0);
    return { gross, net, fee };
  }, [orders]);

  function exportCSV() {
    const headers = ["ID","Date","Total (EUR)","Net (EUR)","Commission (EUR)"]; 
    const rows = orders.map(o => {
      const net = (o.netCents ?? Math.round(o.totalCents * 0.9)) / 100;
      const fee = (o.feeCents ?? Math.round(o.totalCents * 0.1)) / 100;
      const total = o.totalCents / 100;
      return [
        o.id,
        new Date(o.createdAt).toLocaleString(),
        total.toFixed(2).replace('.', ','),
        net.toFixed(2).replace('.', ','),
        fee.toFixed(2).replace('.', ',')
      ].join(';');
    });
    const csv = [headers.join(';'), ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_export_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Commandes (vendeur - mock)</h1>
          <div className="flex items-center gap-3">
            <button onClick={exportCSV} className="rounded-full border border-border px-3 py-1.5 text-sm hover:bg-muted">Exporter CSV</button>
            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs text-muted-foreground">Période:</span>
              <div className="flex overflow-hidden rounded-full border border-border text-xs">
                {(["day","week","month","all"] as const).map(p => (
                  <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 ${period===p?"bg-[var(--primary)] text-white":"hover:bg-muted"}`}>{p === 'day' ? 'Jour' : p === 'week' ? 'Semaine' : p === 'month' ? 'Mois' : 'Tout'}</button>
                ))}
              </div>
            </div>
            <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Accueil</Link>
          </div>
        </div>

        <div className="rounded-xl border border-border">
          <table className="w-full border-separate border-spacing-0 text-sm">
            <thead className="text-left text-muted-foreground">
              <tr>
                <th className="border-b border-border p-3">ID</th>
                <th className="border-b border-border p-3">Date</th>
                <th className="border-b border-border p-3">Articles</th>
                <th className="border-b border-border p-3">Net</th>
                <th className="border-b border-border p-3" title="Commission plateforme: 10% du total">Commission ▸</th>
                <th className="border-b border-border p-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="p-3 align-top font-mono">{o.id}</td>
                  <td className="p-3 align-top">{new Date(o.createdAt).toLocaleString()}</td>
                  <td className="p-3 align-top text-muted-foreground">
                    {o.items.map((i) => (
                      <div key={i.id}>• {i.name} × {i.qty}</div>
                    ))}
                  </td>
                  <td className="p-3 align-top">{formatPrice(((o.netCents ?? Math.round(o.totalCents * 0.9)) / 100) * 100)}</td>
                  <td className="p-3 align-top">{formatPrice(((o.feeCents ?? Math.round(o.totalCents * 0.1)) / 100) * 100)}</td>
                  <td className="p-3 align-top"><span className="rounded-full border border-border px-2 py-1 text-xs">{o.status}</span></td>
                </tr>
              ))}
              {!orders.length && (
                <tr>
                  <td className="p-6 text-center text-muted-foreground" colSpan={6}>Aucune commande.</td>
                </tr>
              )}
            </tbody>
            {orders.length > 0 && (
              <tfoot>
                <tr className="text-sm font-medium">
                  <td className="p-3" colSpan={3}>Totaux</td>
                  <td className="p-3">{formatPrice(totals.net)}</td>
                  <td className="p-3">{formatPrice(totals.fee)}</td>
                  <td className="p-3" />
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </main>
  );
}
