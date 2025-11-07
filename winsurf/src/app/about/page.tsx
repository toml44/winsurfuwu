"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck, Package, CreditCard, MessageSquare, Truck, Store, Leaf, HandHeart, Users, Smartphone, MapPin, Sparkles, Rocket, Globe } from "lucide-react";
import { vendors } from "@/lib/mock";

export default function AboutPage() {
  const [open, setOpen] = useState(false);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0a1f1a] via-[#0b2b24] to-[#0b2431] py-24 text-white">
        <div className="absolute inset-0 -z-10">
          {/* Full background image */}
          <img
            src="https://img.freepik.com/photos-gratuite/gros-plan-colore-plante-feuilles_23-2149337929.jpg?semt=ais_hybrid&w=740&q=80"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />
        </div>
        <div className="mx-auto flex min-h-[46vh] max-w-5xl flex-col items-center justify-center px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">À propos de Winsurf</h1>
          <p className="mt-4 max-w-3xl text-white/85">Notre mission est d’aider les commerces de proximité à vendre en ligne sans complexité. Avec Winsurf, lancez votre vitrine, gérez vos produits et recevez des commandes en quelques minutes.</p>
          <div className="mt-6 flex gap-3">
            <a href="/seller/onboarding" className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm text-white hover:opacity-90">Devenir vendeur</a>
            <a href="/explore" className="rounded-full border border-white/30 px-5 py-2 text-sm text-white hover:bg-white/10">Explorer les commerces</a>
          </div>
        </div>

        {/* Floating planet button */}
        <button
          aria-label="Voir les commerces autour"
          onClick={() => setOpen(true)}
          className="absolute bottom-6 right-6 grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-white/15 text-white shadow-lg backdrop-blur hover:bg-white/25"
        >
          <Globe className="h-5 w-5" />
        </button>
      </section>

      {/* KPI band */}
      <section className="mx-auto max-w-6xl px-6 mt-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/60 p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground">120+</div>
            <div className="text-xs text-muted-foreground">Commerces locaux</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground">3.2k</div>
            <div className="text-xs text-muted-foreground">Commandes passées</div>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5 text-center shadow-sm">
            <div className="text-2xl font-bold text-foreground">4.8/5</div>
            <div className="text-xs text-muted-foreground">Satisfaction moyenne</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><Sparkles className="h-5 w-5 text-[var(--primary)]"/> Ce que fait Winsurf</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <Store className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Vitrine en ligne</div>
                  <div className="text-sm text-muted-foreground">Profil pro, logo, description, photos.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <Package className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Produits & commandes</div>
                  <div className="text-sm text-muted-foreground">Ajout/édition, statuts d’expédition.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <CreditCard className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Paiement sécurisé</div>
                  <div className="text-sm text-muted-foreground">Paiements en ligne sécurisés.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <MessageSquare className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Messagerie</div>
                  <div className="text-sm text-muted-foreground">Échanges client ↔ vendeur.</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><HandHeart className="h-5 w-5 text-[var(--primary)]"/> Pourquoi le local</h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <Users className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Économie de quartier</div>
                  <div className="text-sm text-muted-foreground">Achats qui soutiennent vos voisins.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <Leaf className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Moins d’empreinte</div>
                  <div className="text-sm text-muted-foreground">Circuits courts, livraisons locales.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <Truck className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Livraison ou retrait</div>
                  <div className="text-sm text-muted-foreground">Flexible selon chaque commerce.</div>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-border p-4">
                <ShieldCheck className="h-5 w-5 text-[var(--primary)]"/>
                <div>
                  <div className="font-medium">Transparence</div>
                  <div className="text-sm text-muted-foreground">Frais clairs, rémunération juste.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-xl font-semibold">Comment ça marche</h2>
        <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium"><Store className="h-4 w-4 text-[var(--primary)]"/> Vendeur</div>
            <p className="mt-2 text-sm text-muted-foreground">Créez votre profil, ajoutez vos produits, publiez votre vitrine.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium"><Users className="h-4 w-4 text-[var(--primary)]"/> Client</div>
            <p className="mt-2 text-sm text-muted-foreground">Explorez les commerces près de chez vous et passez commande.</p>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-5 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium"><Truck className="h-4 w-4 text-[var(--primary)]"/> Commande</div>
            <p className="mt-2 text-sm text-muted-foreground">Suivez le statut, retrait en magasin ou livraison locale.</p>
          </div>
        </div>
        <div className="mt-6">
          <a href="/seller/onboarding" className="rounded-full bg-[var(--primary)] px-5 py-2 text-sm text-white hover:opacity-90">Créer mon profil vendeur</a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><ShieldCheck className="h-5 w-5 text-[var(--primary)]"/> Sécurité et confiance</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--primary)]"/> Paiements sécurisés</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--primary)]"/> Conformité RGPD et respect des données</li>
              <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[var(--primary)]"/> Profils vendeurs vérifiés (progressif)</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
            <h2 className="flex items-center gap-2 text-xl font-semibold"><HandHeart className="h-5 w-5 text-[var(--primary)]"/> Engagements & impact</h2>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--primary)]"/> Freemium pour démarrer</li>
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--primary)]"/> Commission raisonnable et transparente</li>
              <li className="flex items-center gap-2"><Sparkles className="h-4 w-4 text-[var(--primary)]"/> Accessibilité & éco-conception continue</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-4 text-xl font-semibold">Roadmap</h2>
        <div className="relative">
          <div className="absolute left-3 top-0 h-full w-px bg-border"/>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li className="relative rounded-xl border border-border bg-card/60 p-4 shadow-sm">
              <div className="absolute left-0 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--primary)]"/>
              <div className="flex items-center gap-2 text-foreground"><Smartphone className="h-4 w-4 text-[var(--primary)]"/> App mobile</div>
            </li>
            <li className="relative rounded-xl border border-border bg-card/60 p-4 shadow-sm">
              <div className="absolute left-0 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--primary)]"/>
              <div className="flex items-center gap-2 text-foreground"><MapPin className="h-4 w-4 text-[var(--primary)]"/> Géolocalisation avancée et filtres de distance</div>
            </li>
            <li className="relative rounded-xl border border-border bg-card/60 p-4 shadow-sm">
              <div className="absolute left-0 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--primary)]"/>
              <div className="flex items-center gap-2 text-foreground"><Rocket className="h-4 w-4 text-[var(--primary)]"/> Abonnements premium et mises en avant locales</div>
            </li>
            <li className="relative rounded-xl border border-border bg-card/60 p-4 shadow-sm">
              <div className="absolute left-0 top-4 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--primary)]"/>
              <div className="flex items-center gap-2 text-foreground"><Sparkles className="h-4 w-4 text-[var(--primary)]"/> Promotions locales et recommandations</div>
            </li>
          </ul>
        </div>
      </section>

      {/* Team section removed per request */}

      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-xl font-semibold">FAQ</h2>
        <div className="mt-4 space-y-2">
          <details className="group rounded-xl border border-border p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
              Combien ça coûte ?
              <span className="text-xs text-muted-foreground group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">Modèle freemium pour démarrer; options premium à venir pour plus de visibilité.</p>
          </details>
          <details className="group rounded-xl border border-border p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
              Comment se passent les livraisons ?
              <span className="text-xs text-muted-foreground group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">Chaque vendeur choisit retrait en magasin ou livraison locale; vous sélectionnez à la commande.</p>
          </details>
          <details className="group rounded-xl border border-border p-4">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-medium text-foreground">
              Comment être mis en avant ?
              <span className="text-xs text-muted-foreground group-open:rotate-180">▾</span>
            </summary>
            <p className="mt-2 text-sm text-muted-foreground">Mise en avant locale via la page Explorer; des boosts premium seront proposés.</p>
          </details>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-border bg-card/60 p-6 shadow-sm">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p className="mt-2 text-sm text-muted-foreground">Une question ou une idée ? Écrivez-nous et nous vous répondrons rapidement.</p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href="mailto:contact@winsurf.local" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-muted">contact@winsurf.local</a>
            <a href="/explore" className="rounded-full bg-[var(--primary)] px-4 py-2 text-sm text-white hover:opacity-90">Explorer</a>
          </div>
        </div>
      </section>
    </main>
  );
}
