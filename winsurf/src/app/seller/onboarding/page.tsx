"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { SellerProfile, getSellerProfile, saveSellerProfile } from "@/lib/seller";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export default function SellerOnboardingPage() {
  const [profile, setProfile] = useState<SellerProfile | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [city, setCity] = useState("");
  const [businessHours, setBusinessHours] = useState("");
  const [deliveryEnabled, setDeliveryEnabled] = useState(true);
  const [pickupEnabled, setPickupEnabled] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const p = getSellerProfile();
    if (p) {
      setProfile(p);
      setName(p.businessName);
      setSlug(p.slug);
      setLogoUrl(p.logoUrl ?? "");
      setCoverUrl(p.coverUrl ?? "");
      setDescription(p.description ?? "");
      setCategory(p.category ?? "");
      setCity(p.city ?? "");
      setBusinessHours(p.businessHours ?? "");
      setDeliveryEnabled(p.deliveryEnabled);
      setPickupEnabled(p.pickupEnabled);
    }
  }, []);

  const canSave = useMemo(() => name.trim().length >= 3 && slug.trim().length >= 3, [name, slug]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Espace vendeur — Onboarding</h1>
          <Link href="/" className="text-sm text-[var(--primary)] hover:underline">← Accueil</Link>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-muted-foreground">Nom de l’entreprise</label>
              <input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!profile) setSlug(slugify(e.target.value));
                }}
                placeholder="Ex: Boulangerie du Coin"
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Slug (URL)</label>
              <input value={slug} onChange={(e) => setSlug(slugify(e.target.value))} className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Catégorie</label>
              <input value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Ville</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Logo (URL image)</label>
              <input value={logoUrl} onChange={(e) => setLogoUrl(e.target.value)} placeholder="https://..." className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div>
              <label className="mb-1 block text-sm text-muted-foreground">Bannière (URL image)</label>
              <input value={coverUrl} onChange={(e) => setCoverUrl(e.target.value)} placeholder="https://..." className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-muted-foreground">Horaires</label>
              <input value={businessHours} onChange={(e) => setBusinessHours(e.target.value)} placeholder="Lun–Sam 08:00–19:00" className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm text-muted-foreground">Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2" />
            </div>
            <div className="flex items-center gap-6 sm:col-span-2">
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={deliveryEnabled} onChange={(e) => setDeliveryEnabled(e.target.checked)} /> Livraison</label>
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={pickupEnabled} onChange={(e) => setPickupEnabled(e.target.checked)} /> Retrait</label>
            </div>
          </div>

          <div className="mt-6 grid gap-3 rounded-xl border border-white/10 p-4 sm:grid-cols-2">
            <div>
              <div className="text-sm font-medium">Complétude du profil</div>
              {(() => {
                const checks = [
                  name.trim().length >= 3,
                  slug.trim().length >= 3,
                  !!category,
                  !!city,
                  !!description,
                  !!logoUrl,
                  !!coverUrl,
                ];
                const score = Math.round((checks.filter(Boolean).length / checks.length) * 100);
                return (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="h-2 w-40 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full bg-[var(--primary)]" style={{ width: `${score}%` }} />
                    </div>
                    <span className="text-xs text-white/70">{score}%</span>
                  </div>
                );
              })()}
            </div>
            <ul className="grid gap-2 text-sm text-white/80">
              <li>• Nom + Slug</li>
              <li>• Catégorie + Ville</li>
              <li>• Description</li>
              <li>• Logo + Bannière</li>
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {saved && <div className="text-sm text-green-500">Profil enregistré.</div>}
            <div className="flex gap-3">
              <Link href="/dashboard" className="rounded-full border border-border px-5 py-2 hover:bg-muted">Aller au dashboard</Link>
              <button
                disabled={!canSave}
                onClick={() => {
                  const p: SellerProfile = {
                    id: "seller-1",
                    businessName: name.trim(),
                    slug: slug.trim(),
                    logoUrl: logoUrl || undefined,
                    coverUrl: coverUrl || undefined,
                    description: description || undefined,
                    category: category || undefined,
                    city: city || undefined,
                    businessHours: businessHours || undefined,
                    deliveryEnabled,
                    pickupEnabled,
                  };
                  saveSellerProfile(p);
                  setSaved(true);
                  setTimeout(() => setSaved(false), 2000);
                }}
                className={`rounded-full px-5 py-2 text-white ${canSave ? "bg-[var(--primary)] hover:opacity-90" : "bg-gray-400/40 cursor-not-allowed"}`}
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
