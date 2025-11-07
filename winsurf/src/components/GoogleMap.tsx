"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Script from "next/script";

export type GMarker = { lat: number; lng: number; title?: string; href?: string };

declare global {
  interface Window { google?: any }
}

type Props = {
  apiKey: string;
  center: { lat: number; lng: number };
  markers: GMarker[];
  height?: number;
  zoom?: number;
};

export default function GoogleMap({ apiKey, center, markers, height = 200, zoom = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  const bounds = useMemo(() => {
    if (!markers.length) return null as any;
    const b = { n: -90, s: 90, e: -180, w: 180 };
    for (const m of markers) {
      b.n = Math.max(b.n, m.lat);
      b.s = Math.min(b.s, m.lat);
      b.e = Math.max(b.e, m.lng);
      b.w = Math.min(b.w, m.lng);
    }
    return b;
  }, [markers]);

  useEffect(() => {
    if (!ready || !ref.current || !window.google) return;
    const g = window.google;
    const map = new g.maps.Map(ref.current, {
      center,
      zoom,
      disableDefaultUI: true,
      mapId: undefined,
    });

    const info = new g.maps.InfoWindow();
    const gMarkers: any[] = [];
    for (const m of markers) {
      const mk = new g.maps.Marker({ position: { lat: m.lat, lng: m.lng }, map, title: m.title });
      mk.addListener("click", () => {
        const html = `<div style=\"font-size:12px\"><strong>${m.title ?? "Commerce"}</strong>${m.href ? `<br/><a href='${m.href}' style='color:#2E86C1'>Ouvrir</a>` : ""}</div>`;
        info.setContent(html);
        info.open(map, mk);
      });
      gMarkers.push(mk);
    }

    if (bounds && markers.length > 1) {
      const b = new g.maps.LatLngBounds(
        new g.maps.LatLng(bounds.s, bounds.w),
        new g.maps.LatLng(bounds.n, bounds.e)
      );
      map.fitBounds(b, 40);
    }

    return () => {
      gMarkers.forEach((m) => m.setMap(null));
    };
  }, [ready, center.lat, center.lng, zoom, markers, bounds]);

  return (
    <div style={{ height }} className="w-full overflow-hidden rounded-xl border border-border bg-card/60">
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}`}
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
      />
      <div ref={ref} className="h-full w-full" />
    </div>
  );
}
