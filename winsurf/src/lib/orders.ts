"use client";

export type OrderItem = { id: string; name: string; qty: number; priceCents: number };
export type Order = {
  id: string;
  createdAt: string;
  items: OrderItem[];
  totalCents: number;
  feeCents: number; // platform commission
  netCents: number; // amount for seller after commission
  status: "pending" | "paid" | "confirmed" | "shipped" | "delivered" | "cancelled";
};

const KEY = "winsurf_orders";

export function listOrders(): Order[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(orders));
  } catch {}
}

export function createOrder(items: OrderItem[], totalCents: number): Order {
  const feeCents = Math.round(totalCents * 0.10);
  const netCents = Math.max(0, totalCents - feeCents);
  const order: Order = {
    id: `o_${Date.now()}`,
    createdAt: new Date().toISOString(),
    items,
    totalCents,
    feeCents,
    netCents,
    status: "paid",
  };
  const current = listOrders();
  current.unshift(order);
  saveOrders(current);
  return order;
}
