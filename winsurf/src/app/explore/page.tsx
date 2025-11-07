"use client";

import Link from "next/link";
import { vendors } from "@/lib/mock";

interface SearchParams {
  q?: string;
}

export default function Explore({ searchParams }: { searchParams: SearchParams }) {
  const q = (searchParams.q ?? "").trim().toLowerCase();
  const filtered = q
    ? vendors.filter((v) => `${v.name} ${v.category} ${v.city}`.toLowerCase().includes(q))
    : vendors;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Explorer</h1>
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline">
            ← Accueil
          </Link>
        </div>

        {q && (
          <p className="mb-4 text-sm text-muted-foreground">
            Résultats pour: <span className="font-medium text-foreground">{q}</span>
          </p>
        )}

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((v) => (
            <Link
              key={v.id}
              href={`/vendor/${v.slug}`}
              className="group rounded-xl border border-border bg-card/60 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            
            >
              <div className="h-40 w-full rounded-lg bg-muted transition group-hover:opacity-90" />
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="font-medium">{v.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {v.category} • {v.city}
                  </div>
                </div>
                <span className="text-xs text-[var(--primary)]">Voir</span>
              </div>
            </Link>
          ))}
        </div>

        {!filtered.length && (
          <div className="mt-16 text-center text-muted-foreground">Aucun résultat. Essayez un autre mot-clé.</div>
        )}
      </div>
    </main>
  );
}
