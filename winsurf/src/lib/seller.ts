"use client";

export type SellerProfile = {
  id: string;
  businessName: string;
  slug: string;
  logoUrl?: string;
  coverUrl?: string;
  description?: string;
  category?: string;
  city?: string;
  businessHours?: string;
  deliveryEnabled: boolean;
  pickupEnabled: boolean;
};

export type SellerProduct = {
  id: string;
  sellerId: string;
  name: string;
  priceCents: number;
  imageUrl?: string;
  description?: string;
  stock?: number;
  isActive?: boolean;
};

const KEY_PROFILE = "winsurf_seller_profile";
const KEY_PRODUCTS = "winsurf_seller_products";

export function getSellerProfile(): SellerProfile | null {
  try {
    const raw = localStorage.getItem(KEY_PROFILE);
    return raw ? (JSON.parse(raw) as SellerProfile) : null;
  } catch {
    return null;
  }
}

export function saveSellerProfile(profile: SellerProfile) {
  try {
    localStorage.setItem(KEY_PROFILE, JSON.stringify(profile));
  } catch {}
}

export function listSellerProducts(): SellerProduct[] {
  try {
    const raw = localStorage.getItem(KEY_PRODUCTS);
    return raw ? (JSON.parse(raw) as SellerProduct[]) : [];
  } catch {
    return [];
  }
}

export function saveSellerProducts(items: SellerProduct[]) {
  try {
    localStorage.setItem(KEY_PRODUCTS, JSON.stringify(items));
  } catch {}
}

export function addSellerProduct(p: Omit<SellerProduct, "id">) {
  const id = `sp_${Date.now()}`;
  const all = listSellerProducts();
  all.unshift({ id, ...p });
  saveSellerProducts(all);
  return id;
}

export function updateSellerProduct(id: string, patch: Partial<SellerProduct>) {
  const all = listSellerProducts();
  const next = all.map((it) => (it.id === id ? { ...it, ...patch } : it));
  saveSellerProducts(next);
}

export function deleteSellerProduct(id: string) {
  const all = listSellerProducts();
  saveSellerProducts(all.filter((it) => it.id !== id));
}
