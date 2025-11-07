export type Vendor = {
  id: string;
  slug: string;
  name: string;
  category: string;
  city: string;
  description: string;
  logo?: string;
  hasApp?: boolean;
  lat?: number;
  lng?: number;
};

export type Product = {
  id: string;
  vendorId: string;
  name: string;
  priceCents: number;
  image?: string;
  description?: string;
};

export const vendors: Vendor[] = [
  {
    id: "v1",
    slug: "boulangerie-du-coin",
    name: "Boulangerie du Coin",
    category: "Boulangerie",
    city: "Paris",
    description: "Pains au levain et viennoiseries artisanales.",
    hasApp: true,
    lat: 48.8566,
    lng: 2.3522,
  },
  {
    id: "v2",
    slug: "fleurs-et-co",
    name: "Fleurs & Co",
    category: "Fleuriste",
    city: "Lyon",
    description: "Bouquets locaux et compositions sur-mesure.",
    hasApp: false,
    lat: 45.7640,
    lng: 4.8357,
  },
  {
    id: "v3",
    slug: "cafe-du-marche",
    name: "Café du Marché",
    category: "Café",
    city: "Marseille",
    description: "Café de spécialité et douceurs maison.",
    hasApp: true,
    lat: 43.2965,
    lng: 5.3698,
  },
];

export const products: Product[] = [
  { id: "p1", vendorId: "v1", name: "Baguette tradition", priceCents: 120 },
  { id: "p2", vendorId: "v1", name: "Croissant beurre", priceCents: 140 },
  { id: "p3", vendorId: "v2", name: "Bouquet champêtre", priceCents: 2500 },
  { id: "p4", vendorId: "v3", name: "Espresso", priceCents: 200 },
  { id: "p5", vendorId: "v3", name: "Latte", priceCents: 380 },
];

export function findVendorBySlug(slug: string) {
  return vendors.find((v) => v.slug === slug);
}

export function findVendorById(id: string) {
  return vendors.find((v) => v.id === id);
}

export function getProductsByVendor(vendorId: string) {
  return products.filter((p) => p.vendorId === vendorId);
}

export function findProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function formatPrice(cents: number) {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(cents / 100);
}
