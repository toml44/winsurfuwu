"use client";

import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type Toast = { id: string; title?: string; description?: string; variant?: "default" | "success" | "error" };

type ToastCtx = {
  toasts: Toast[];
  show: (t: Omit<Toast, "id"> & { durationMs?: number }) => void;
  remove: (id: string) => void;
};

const Ctx = createContext<ToastCtx | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const remove = useCallback((id: string) => {
    setToasts((arr) => arr.filter((t) => t.id !== id));
  }, []);

  const show = useCallback((t: Omit<Toast, "id"> & { durationMs?: number }) => {
    const id = `tw_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    const toast: Toast = { id, title: t.title, description: t.description, variant: t.variant ?? "default" };
    setToasts((arr) => [...arr, toast]);
    const ms = t.durationMs ?? 2200;
    if (ms > 0) setTimeout(() => remove(id), ms);
  }, [remove]);

  const value = useMemo<ToastCtx>(() => ({ toasts, show, remove }), [toasts, show, remove]);

  return (
    <Ctx.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-4 z-[999] mx-auto flex max-w-md flex-col gap-2 px-4">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-lg backdrop-blur ${
              t.variant === "success"
                ? "border-green-400/30 bg-green-500/10 text-green-100"
                : t.variant === "error"
                ? "border-red-400/30 bg-red-500/10 text-red-100"
                : "border-white/20 bg-white/10 text-white"
            }`}
          >
            {t.title && <div className="font-medium">{t.title}</div>}
            {t.description && <div className="text-xs opacity-80">{t.description}</div>}
          </div>
        ))}
      </div>
    </Ctx.Provider>
  );
}

export function useToast() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
