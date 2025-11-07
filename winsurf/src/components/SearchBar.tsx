"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

const MOCK_SUGGESTIONS = [
  "Boulangerie",
  "Fleurs",
  "Café de quartier",
  "Fromagerie",
  "Pizzeria",
  "Coiffure",
  "Primeur",
  "Librairie",
  "Atelier créatif",
];

export function SearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(-1);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    if (!q) return MOCK_SUGGESTIONS.slice(0, 6);
    return MOCK_SUGGESTIONS.filter((s) => s.toLowerCase().includes(q.toLowerCase())).slice(0, 6);
  }, [q]);

  useEffect(() => {
    setIndex(-1);
  }, [q]);

  return (
    <form
      className="relative w-full max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        const query = index >= 0 ? results[index] : q;
        router.push(`/explore${query ? `?q=${encodeURIComponent(query)}` : ""}`);
        setOpen(false);
      }}
    >
      <div className="flex items-center overflow-hidden rounded-xl border border-input bg-background">
        <Search className="ml-3 h-5 w-5 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={(e) => {
            if (!results.length) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setIndex((v) => Math.min(v + 1, results.length - 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setIndex((v) => Math.max(v - 1, 0));
            }
          }}
          className="w-full bg-background px-3 py-3 outline-none"
          placeholder="Rechercher une entreprise, un produit, une catégorie…"
        />
        <button type="submit" className="shrink-0 bg-[var(--primary)] px-4 py-3 text-white hover:opacity-90">
          Rechercher
        </button>
      </div>

      {open && results.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border border-border bg-background shadow-xl"
        >
          {results.map((r, i) => (
            <li
              key={r}
              className={`cursor-pointer px-4 py-3 text-sm hover:bg-muted ${
                i === index ? "bg-muted" : ""
              }`}
              onMouseDown={() => {
                router.push(`/explore?q=${encodeURIComponent(r)}`);
              }}
            >
              {r}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
