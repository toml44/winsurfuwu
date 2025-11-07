"use client";

import { useEffect, useState } from "react";
import { signIn, getProviders, ClientSafeProvider } from "next-auth/react";
import Link from "next/link";
import { Mail, Facebook, Chrome } from "lucide-react";
import { loginMock } from "@/lib/auth-mock";

export default function SignInPage() {
  const [providers, setProviders] = useState<Record<string, ClientSafeProvider> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const p = await getProviders();
        setProviders(p ?? {});
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
          <Link href="/" className="text-xl font-semibold tracking-tight hover:opacity-90">Winsurf</Link>
          <Link href="/" className="text-sm text-white/80 hover:text-white">← Retour</Link>
        </div>
      </header>

      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0a1f1a] via-[#0b2b24] to-[#0b2431] py-24 text-white">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -left-24 -top-32 h-96 w-96 rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(46,134,193,0.45), transparent 70%)"}} />
          <div className="absolute -right-16 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{background: "radial-gradient(closest-side, rgba(16,185,129,0.3), transparent 70%)"}} />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />
        </div>

        <div className="mx-auto max-w-md px-6">
          <div className="rounded-2xl border border-white/15 bg-white/10 p-8 shadow-xl backdrop-blur">
            <h1 className="text-center text-2xl font-semibold">Se connecter</h1>
            <p className="mt-2 text-center text-sm text-white/75">Choisissez une méthode d’authentification</p>

            <div className="mt-6 grid gap-3">
              {loading && (
                <div className="h-10 animate-pulse rounded-lg bg-white/10" />
              )}

              {providers && Object.values(providers).length > 0 ? (
                Object.values(providers).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => signIn(p.id, { callbackUrl: "/" })}
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                  >
                    {p.id === "google" && <Chrome className="h-4 w-4" />}
                    {p.id === "facebook" && <Facebook className="h-4 w-4" />}
                    Continuer avec {p.name}
                  </button>
                ))
              ) : (
                !loading && (
                  <>
                    <button
                      onClick={() => signIn(undefined, { callbackUrl: "/" })}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"
                    >
                      <Mail className="h-4 w-4" />
                      Ouvrir la page de connexion
                    </button>
                    <button
                      onClick={() => { loginMock(); window.location.href = "/dashboard"; }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[var(--primary)] px-4 py-2 text-sm text-white hover:opacity-90"
                    >
                      Continuer en invité (Espace pro)
                    </button>
                    <p className="mt-2 text-center text-xs text-white/60">
                      Aucun fournisseur configuré. Ajoutez Google/Facebook ou le provider Email pour activer les boutons.
                    </p>
                    <div className="mt-3 text-center text-xs">
                      <Link href="/seller/onboarding" className="text-[var(--primary)] hover:underline">
                        Créer un compte vendeur
                      </Link>
                    </div>
                  </>
                )
              )}
            </div>

            <p className="mt-6 text-center text-[10px] text-white/50">
              En continuant, vous acceptez nos
              <Link href="/terms" className="mx-1 underline opacity-90 hover:opacity-100">Conditions d’utilisation</Link>
              et
              <Link href="/privacy" className="ml-1 underline opacity-90 hover:opacity-100">Politique de confidentialité</Link>.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
