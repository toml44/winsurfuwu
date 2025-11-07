"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const KEY = "winsurf_authed";

export function isAuthed() {
  try {
    return localStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

export function loginMock() {
  try {
    localStorage.setItem(KEY, "1");
  } catch {}
}

export function logoutMock() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}

export function useRequireAuth(redirect = "/signin") {
  const router = useRouter();
  useEffect(() => {
    const ok = isAuthed();
    if (!ok) router.replace(redirect);
  }, [router, redirect]);
}
