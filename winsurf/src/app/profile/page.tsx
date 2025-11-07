"use client";

import Link from "next/link";
import { useState } from "react";

export default function ProfilePage() {
  const [name, setName] = useState("Client Démo");
  const [email, setEmail] = useState("demo@example.com");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Mon profil (mock)</h1>
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Accueil</Link>
        </div>

        <div className="rounded-xl border border-border p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Nom</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="rounded-full bg-[var(--primary)] px-5 py-2 text-white">Enregistrer (mock)</button>
          </div>
        </div>
      </div>
    </main>
  );
}
