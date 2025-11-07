"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  SellerProduct,
  addSellerProduct,
  deleteSellerProduct,
  listSellerProducts,
  updateSellerProduct,
} from "@/lib/seller";
import { formatPrice } from "@/lib/mock";
import { useRequireAuth } from "@/lib/auth-mock";
import { useToast } from "@/lib/toast";

export default function SellerProductsPage() {
  useRequireAuth();
  const [items, setItems] = useState<SellerProduct[]>([]);
  const [editing, setEditing] = useState<SellerProduct | null>(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<string>("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState<string>("0");
  const [isActive, setIsActive] = useState(true);
  const [csvBusy, setCsvBusy] = useState(false);
  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [sort, setSort] = useState<"priceAsc" | "priceDesc">("priceAsc");
  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [uploadBusy, setUploadBusy] = useState(false);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string | undefined;
  const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string | undefined;

  async function uploadToCloudinary(file: File): Promise<string | null> {
    try {
      if (!cloudName || !uploadPreset) return null;
      setUploadBusy(true);
      const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", uploadPreset);
      const res = await fetch(url, { method: "POST", body: fd });
      if (!res.ok) return null;
      const data = await res.json();
      return data.secure_url as string;
    } catch {
      return null;
    } finally { setUploadBusy(false); }
  }

  useEffect(() => {
    setItems(listSellerProducts());
  }, []);

  const { show } = useToast();
  const [subscribed, setSubscribed] = useState<boolean>(() => {
    try { return localStorage.getItem('winsurf_sub_active') === '1'; } catch { return false; }
  });
  function subscribe() {
    try { localStorage.setItem('winsurf_sub_active','1'); } catch {}
    setSubscribed(true);
    show({ title: 'Abonnement activé', description: 'Vous pouvez dépasser 20 produits.', variant: 'success' });
  }

  const canSave = useMemo(() => name.trim().length >= 2 && Number(price) >= 0, [name, price]);

  function resetForm() {
    setEditing(null);
    setName("");
    setPrice("");
    setImageUrl("");
    setDescription("");
    setStock("0");
    setIsActive(true);
  }

  function startEdit(p: SellerProduct) {
    setEditing(p);
    setName(p.name);
    setPrice(String((p.priceCents / 100).toFixed(2)));
    setImageUrl(p.imageUrl ?? "");
    setDescription(p.description ?? "");
    setStock(String(p.stock ?? 0));
    setIsActive(p.isActive ?? true);
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Produits (vendeur - mock)</h1>
          <Link href="/dashboard" className="text-sm text-[var(--primary)] hover:underline">← Dashboard</Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-xl border border-border p-6">
            <h2 className="mb-4 text-lg font-medium">{editing ? "Modifier un produit" : "Ajouter un produit"}</h2>
            <div className="space-y-3">
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">Nom</label>
                <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2" />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Prix (EUR)</label>
                  <input value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2" />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Stock</label>
                  <input value={stock} onChange={(e) => setStock(e.target.value)} className="w-full rounded-md border border-input bg-background px-3 py-2" />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">Image (URL)</label>
                <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." className="w-full rounded-md border border-input bg-background px-3 py-2" />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm text-muted-foreground">Upload image</label>
                  <input type="file" accept="image/*" onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    // Try Cloudinary first
                    const url = await uploadToCloudinary(f);
                    if (url) {
                      setImageUrl(url);
                    } else {
                      // Fallback to data URL preview/storage
                      setUploadBusy(true);
                      const r = new FileReader();
                      r.onload = () => { setImageUrl(String(r.result || "")); setUploadBusy(false); };
                      r.readAsDataURL(f);
                    }
                  }} />
                </div>
                <div className="flex items-end">
                  {imageUrl && <div className="h-12 w-12 rounded-md bg-muted" style={{backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover'}} />}
                </div>
              </div>
              {uploadBusy && <div className="text-xs text-[var(--primary)]">Téléversement…</div>}
              <div>
                <label className="mb-1 block text-sm text-muted-foreground">Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded-md border border-input bg-background px-3 py-2" />
              </div>
              <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" checked={isActive} onChange={(e) => setIsActive(e.target.checked)} /> Actif</label>
            </div>
            <div className="mt-4 flex gap-3">
              <button
                disabled={!canSave}
                onClick={() => {
                  const priceCents = Math.round(Number(price) * 100) || 0;
                  if (editing) {
                    updateSellerProduct(editing.id, {
                      name: name.trim(),
                      priceCents,
                      imageUrl: imageUrl || undefined,
                      description: description || undefined,
                      stock: Number(stock) || 0,
                      isActive,
                    });
                    setItems(listSellerProducts());
                    resetForm();
                  } else {
                    if (!subscribed && listSellerProducts().length >= 20) {
                      show({ title: 'Limite atteinte', description: 'Le plan gratuit permet 20 produits. Passez à 5€/mo pour plus.', variant: 'default' });
                      return;
                    }
                    const id = addSellerProduct({
                      sellerId: "seller-1",
                      name: name.trim(),
                      priceCents,
                      imageUrl: imageUrl || undefined,
                      description: description || undefined,
                      stock: Number(stock) || 0,
                      isActive,
                    });
                    setItems(listSellerProducts());
                    resetForm();
                  }
                }}
                className={`rounded-full px-5 py-2 text-white ${canSave ? "bg-[var(--primary)] hover:opacity-90" : "bg-gray-400/40 cursor-not-allowed"}`}
              >
                {editing ? "Enregistrer" : "Ajouter"}
              </button>
              {editing && (
                <button onClick={resetForm} className="rounded-full border border-border px-5 py-2">Annuler</button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-border p-6">
            <h2 className="mb-2 text-lg font-medium">Mes produits</h2>
            {!subscribed && (
              <div className="mb-3 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-100">
                Plan Gratuit: 20 produits inclus ({items.length}/20). 
                <button onClick={subscribe} className="ml-2 rounded-full border border-yellow-400 px-2 py-0.5 text-yellow-200 hover:bg-yellow-500/20">Passer en Pro 5€/mo</button>
              </div>
            )}
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
              <div className="flex overflow-hidden rounded-full border border-border">
                {(["all","active","inactive"] as const).map(f => (
                  <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 ${filter===f?"bg-[var(--primary)] text-white":"hover:bg-muted"}`}>{f==='all'?'Tous':f==='active'?'Actifs':'Inactifs'}</button>
                ))}
              </div>
              <div className="flex overflow-hidden rounded-full border border-border">
                {(["priceAsc","priceDesc"] as const).map(s => (
                  <button key={s} onClick={() => setSort(s)} className={`px-3 py-1 ${sort===s?"bg-[var(--primary)] text-white":"hover:bg-muted"}`}>{s==='priceAsc'?"Prix ↑":"Prix ↓"}</button>
                ))}
              </div>
            </div>
            <div className="mb-4 rounded-lg border border-dashed border-border p-3 text-xs text-muted-foreground">
              Import CSV rapide: colonnes `name,price,stock,image,description,active`. Exemple:<br/>
              <code>"Baguette",1.20,50,https://...,"Pain croustillant",true</code>
              <div className="mt-2 flex items-center gap-2">
                <input type="file" accept=".csv" onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  setCsvBusy(true);
                  const r = new FileReader();
                  r.onload = () => {
                    try {
                      const text = String(r.result || "");
                      const lines = text.split(/\r?\n/).filter(l => l.trim());
                      let added = 0;
                      for (const line of lines) {
                        const parts = line.split(',');
                        if (parts.length < 2) continue;
                        const [n, p, s, img, desc, act] = parts;
                        addSellerProduct({
                          sellerId: "seller-1",
                          name: (n || '').trim(),
                          priceCents: Math.round(parseFloat(p || '0') * 100) || 0,
                          stock: Number(s || '0') || 0,
                          imageUrl: img ? img.trim() : undefined,
                          description: desc ? desc.trim() : undefined,
                          isActive: String(act || 'true').toLowerCase().startsWith('t'),
                        });
                        added++;
                      }
                      setItems(listSellerProducts());
                      show({ title: 'Import CSV', description: `${added} produit(s) importé(s)`, variant: 'success' });
                    } finally {
                      setCsvBusy(false);
                      e.currentTarget.value = '';
                    }
                  };
                  r.readAsText(f);
                }} />
                {csvBusy && <span className="text-[var(--primary)]">Import…</span>}
              </div>
            </div>
            {!items.length ? (
              <div className="text-sm text-muted-foreground">Aucun produit.</div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {(() => {
                  const filtered = items
                  .filter(p => filter==='all' ? true : filter==='active' ? (p.isActive ?? true) : !(p.isActive ?? true))
                  .sort((a,b) => sort==='priceAsc' ? a.priceCents-b.priceCents : b.priceCents-a.priceCents);
                  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
                  const currentPage = Math.min(page, totalPages);
                  const start = (currentPage - 1) * pageSize;
                  const pageItems = filtered.slice(start, start + pageSize);
                  return pageItems.map((p) => (
                  <div key={p.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div className="flex items-center gap-3">
                      <div className="h-16 w-16 rounded-md bg-muted" style={{backgroundImage: p.imageUrl ? `url(${p.imageUrl})` : undefined, backgroundSize: 'cover'}} />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-muted-foreground">{formatPrice(p.priceCents)} • Stock: {p.stock ?? 0} • {p.isActive ? 'Actif' : 'Inactif'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="rounded-full border border-border px-3 py-1 text-sm" onClick={() => startEdit(p)}>Modifier</button>
                      <button className="rounded-full border border-red-500 px-3 py-1 text-sm text-red-500" onClick={() => { deleteSellerProduct(p.id); setItems(listSellerProducts()); }}>Supprimer</button>
                    </div>
                  </div>
                  ));
                })()}
              </div>
            )}
            {items.length > pageSize && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <button className="rounded-full border border-border px-3 py-1 disabled:opacity-50" onClick={() => setPage(p => Math.max(1, p-1))} disabled={page===1}>Précédent</button>
                <span className="text-xs text-muted-foreground">Page {page}</span>
                <button className="rounded-full border border-border px-3 py-1" onClick={() => setPage(p => p+1)}>Suivant</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
