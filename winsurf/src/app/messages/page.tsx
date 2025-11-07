"use client";

import Link from "next/link";
import { useState } from "react";

const THREADS = [
  { id: "t1", name: "Boulangerie du Coin", last: "Votre commande est prête pour demain." },
  { id: "t2", name: "Fleurs & Co", last: "Avez-vous une préférence de couleur ?" },
  { id: "t3", name: "Café du Marché", last: "La machine sera révisée vendredi." },
];

export default function MessagesPage() {
  const [current, setCurrent] = useState(THREADS[0]);
  const [input, setInput] = useState("");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Messages (mock)</h1>
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Accueil</Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-[280px_1fr]">
          <aside className="rounded-xl border border-border">
            {THREADS.map((t) => (
              <button
                key={t.id}
                onClick={() => setCurrent(t)}
                className={`block w-full border-b border-border px-4 py-3 text-left hover:bg-muted ${
                  current.id === t.id ? "bg-muted" : ""
                }`}
              >
                <div className="font-medium">{t.name}</div>
                <div className="truncate text-sm text-muted-foreground">{t.last}</div>
              </button>
            ))}
          </aside>

          <section className="flex flex-col rounded-xl border border-border">
            <div className="border-b border-border p-4">
              <div className="font-medium">{current.name}</div>
              <div className="text-sm text-muted-foreground">Conversation factice</div>
            </div>
            <div className="flex-1 space-y-3 p-4">
              <div className="max-w-[70%] rounded-lg bg-muted p-3 text-sm text-foreground">Bonjour !</div>
              <div className="ml-auto max-w-[70%] rounded-lg bg-[var(--primary)] p-3 text-sm text-white">Bonjour, je suis intéressé.</div>
              <div className="max-w-[70%] rounded-lg bg-muted p-3 text-sm text-foreground">Parfait, dites-m'en plus.</div>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setInput("");
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écrire un message… (mock)"
                className="flex-1 rounded-md border border-input bg-background px-3 py-2"
              />
              <button className="rounded-md bg-[var(--primary)] px-4 py-2 text-sm text-white">Envoyer</button>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
