"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import GoogleMap from "@/components/GoogleMap";
import { Search, Users, CalendarDays, MapPin, Globe, Star, ShoppingBag } from "lucide-react";
import { CartButton } from "@/components/CartButton";
import { vendors, type Vendor } from "@/lib/mock";

// Étendre le type Vendor avec les propriétés manquantes
type ExtendedVendor = Vendor & {
  image?: string;
  rating?: number;
  reviews?: number;
  location?: string;
};

export default function Home() {
  const [address, setAddress] = useState("");
  const [planetOpen, setPlanetOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const availableCount = vendors.filter(v => v.hasApp).length;
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string | undefined;

  const [userPos, setUserPos] = useState<{lat:number; lng:number} | null>(null);
  const [geoErr, setGeoErr] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  function getLocation() {
    if (!("geolocation" in navigator)) {
      setGeoErr("La géolocalisation n'est pas supportée.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setGeoErr(null);
        setLocating(false);
      },
      (err) => {
        setGeoErr(err.message || "Impossible d'obtenir la position");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 30000 }
    );
  }

  useEffect(() => {
    if (planetOpen && !userPos && !locating && !geoErr) {
      getLocation();
    }
  }, [planetOpen]);

  function haversineKm(a: {lat:number; lng:number}, b: {lat?:number; lng?:number}) {
    if (!b.lat || !b.lng) return Infinity;
    const R = 6371;
    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;
    const la1 = (a.lat * Math.PI) / 180;
    const la2 = (b.lat * Math.PI) / 180;
    const s = Math.sin(dLat/2)**2 + Math.cos(la1)*Math.cos(la2)*Math.sin(dLng/2)**2;
    return 2 * R * Math.asin(Math.sqrt(s));
  }

  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* Glassy navbar (non-sticky) */}
      <header className="absolute inset-x-0 top-0 z-20">
        <div className="mx-auto max-w-6xl px-6 py-4">
          <div className="flex items-center justify-between rounded-full border border-white/15 bg-white/10 px-4 py-2 text-white backdrop-blur">
            <a className={`text-sm font-semibold tracking-tight ${pathname === "/" ? "underline underline-offset-4" : ""}`} href="/">Winsurf</a>
            <nav className="flex items-center gap-2 text-sm">
              <a className="hidden rounded-full px-3 py-2 hover:text-white/90 sm:block" href="#explorer">Nos partenaires</a>
              <a className={`hidden rounded-full px-3 py-2 hover:text-white/90 sm:block ${pathname === "/about" ? "underline underline-offset-4" : ""}`} href="/about">À propos</a>
              <a className={`rounded-full px-3 py-2 hover:text-white/90 ${pathname?.startsWith("/dashboard") ? "underline underline-offset-4" : ""}`} href="/dashboard">Espace vendeur</a>
              <a className={`inline-flex items-center rounded-full border border-white/30 px-3 py-2 text-white hover:bg-white/10 ${pathname === "/signin" ? "ring-1 ring-white/40" : ""}`} href="/signin">Se connecter</a>
              <CartButton />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero full-bleed with gradient forest vibe */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#0a1f1a] via-[#0b2b24] to-[#0b2431] text-white">
        {/* Decorative gradient shapes */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-10%] top-[-20%] h-[28rem] w-[28rem] rounded-full blur-3xl animate-pulse" style={{background: "radial-gradient(closest-side, rgba(46,134,193,0.35), transparent 70%)"}} />
          <div className="absolute right-[-6%] top-[10%] h-[26rem] w-[26rem] rounded-full blur-3xl animate-pulse" style={{background: "radial-gradient(closest-side, rgba(16,185,129,0.25), transparent 70%)"}} />
          <div className="absolute bottom-[-12%] left-1/3 h-[22rem] w-[22rem] rounded-full blur-3xl animate-pulse" style={{background: "radial-gradient(closest-side, rgba(46,134,193,0.28), transparent 70%)"}} />
          {/* Subtle blurred image for depth */}
          <img src="/local-hero.png" alt="fond" className="absolute inset-0 h-full w-full object-contain opacity-10 blur-xl" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />
        </div>

        <div className="mx-auto min-h-[68vh] max-w-6xl px-6 pb-16 pt-28">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="text-center sm:text-left">
              <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Voyagez local.</h1>
              <p className="mt-3 max-w-2xl text-white/85 text-base sm:text-lg lg:text-xl">Découvrez les artisans, restaurants et services près de chez vous. Réservez, commandez, soutenez le local.</p>

              {/* Compact single-line search pill */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const q = address.trim();
                  router.push(`/explore${q ? `?q=${encodeURIComponent(q)}` : ""}`);
                }}
                className="mt-8 flex w-full max-w-2xl items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur"
              >
                <MapPin className="h-5 w-5 opacity-80" />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Adresse, ville, commerce…"
                  className="w-full bg-transparent outline-none placeholder:text-white/60"
                />
                <button
                  type="button"
                  title="Commerces autour"
                  aria-label="Commerces autour"
                  onClick={() => setPlanetOpen(true)}
                  className="relative grid h-10 place-items-center rounded-full border border-white/15 bg-white/10 px-3 text-white hover:bg-white/15"
                >
                  <Globe className="h-4 w-4" />
                  {availableCount > 0 && (
                    <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[var(--primary)] px-1 text-[10px] leading-none text-white">
                      {availableCount}
                    </span>
                  )}
                </button>
                <button
                  type="submit"
                  aria-label="Rechercher"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white text-black shadow-md ring-0 hover:ring-2 hover:ring-white/70 sm:h-12 sm:w-12"
                  title="Rechercher"
                >
                  <Search className="h-5 w-5 text-[#0b2b24]" />
                </button>
              </form>

              <div className="mt-6 flex gap-3">
                <a className="rounded-full bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/15" href="/seller/onboarding">Devenir vendeur</a>
                <Link 
                  href="/explorer" 
                  className="rounded-full border border-white/30 px-5 py-2 text-sm text-white hover:bg-white/10 transition-colors"
                >
                  Découvrir
                </Link>
              </div>
            </div>

            {/* Right illustration: centered and polished */}
            <div className="hidden place-items-center md:grid">
              <svg viewBox="0 0 480 480" className="h-[320px] w-[320px] drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)] lg:h-[380px] lg:w-[380px]" aria-hidden="true">
                <defs>
                  {/* Ocean gradient */}
                  <radialGradient id="oceanGrad" cx="40%" cy="35%" r="70%">
                    <stop offset="0%" stopColor="#0f3a33" />
                    <stop offset="70%" stopColor="#14352e" />
                    <stop offset="100%" stopColor="#0b2b24" />
                  </radialGradient>
                  {/* Light/shadow shading */}
                  <radialGradient id="shadeGrad" cx="35%" cy="30%" r="85%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.18" />
                    <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0.35" />
                  </radialGradient>
                  {/* Atmosphere glow */}
                  <radialGradient id="glow" cx="50%" cy="50%" r="55%">
                    <stop offset="60%" stopColor="#6ad3ff" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#6ad3ff" stopOpacity="0" />
                  </radialGradient>
                  <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" />
                  </filter>
                </defs>
                {/* Globe */}
                <circle cx="300" cy="250" r="170" fill="url(#oceanGrad)" />
                {/* Graticule: a few latitude/longitude lines */}
                <g opacity="0.18" stroke="#9ad6c0" strokeWidth="0.6" fill="none">
                  {/* Latitudes */}
                  <ellipse cx="300" cy="250" rx="150" ry="110" />
                  <ellipse cx="300" cy="250" rx="150" ry="70" />
                  <ellipse cx="300" cy="250" rx="150" ry="40" />
                  {/* Longitudes (rotated ellipses) */}
                  <g transform="rotate(25 300 250)">
                    <ellipse cx="300" cy="250" rx="150" ry="110" />
                  </g>
                  <g transform="rotate(-25 300 250)">
                    <ellipse cx="300" cy="250" rx="150" ry="110" />
                  </g>
                </g>
                {/* Continents with subtle stroke */}
                <g stroke="#0a221d" strokeOpacity="0.4" strokeWidth="1.2">
                  <path d="M220 200c32-22 72-26 100-12 23 12 20 34-6 48-19 10-36 8-50 18-14 10-12 21-32 28-24 8-42-7-42-24 0-18 12-30 30-58z" fill="#86c89b" />
                  <path d="M330 310c26 9 45 27 40 45-5 20-34 32-66 26-18-3-30-11-34-21-4-9 1-18 14-22 18-7 28-22 46-28z" fill="#7dbb91" />
                  <path d="M290 140c18 2 32 11 32 24s-13 20-28 20-30-7-32-18c-2-11 9-28 28-26z" fill="#8ecc9f" />
                </g>
                {/* Soft highlight and rim glow */}
                <circle cx="300" cy="250" r="170" fill="url(#shadeGrad)" opacity="0.6" />
                <circle cx="300" cy="250" r="176" fill="url(#glow)" opacity="0.7" />
                {/* Location pin (black & white) */}
                <g transform="translate(340,120)">
                  <path d="M70 0c39 0 70 31 70 68 0 41-33 75-70 141C33 143 0 109 0 68 0 31 31 0 70 0z" fill="#ffffff" />
                  <circle cx="70" cy="68" r="26" fill="#0b0b0b" />
                </g>
                {/* Shadow */}
                <ellipse cx="300" cy="430" rx="110" ry="18" fill="#000" opacity="0.25" filter="url(#soft)" />
              </svg>
            </div>
          </div>
        </div>

      </section>

      <section id="explorer" className="mx-auto max-w-7xl px-6 pb-24 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Tendances près de vous</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-300">Découvrez les commerces les plus populaires dans votre région</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {(vendors as unknown as ExtendedVendor[]).slice(0, 6).map((vendor, i) => (
            <div 
              key={i}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm border border-white/5 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-white/10 hover:shadow-white/5 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <div 
                  className="h-full w-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${vendor.image || '/placeholder-shop.jpg'})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2b24]/95 via-[#0b2b24]/30 to-transparent"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="absolute bottom-3 left-3 flex items-center rounded-full bg-black/70 backdrop-blur-sm px-3 py-1.5 text-sm font-medium text-white border border-white/10 shadow-sm">
                  <Star className="mr-1 h-4 w-4 text-amber-400 fill-amber-400" />
                  {vendor.rating}
                  <span className="ml-1 text-gray-300">({vendor.reviews})</span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-cyan-300 ring-1 ring-inset ring-white/10">
                    {vendor.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-400">
                    <MapPin className="mr-1 h-3 w-3 text-gray-500" />
                    {vendor.location || vendor.city}
                  </div>
                </div>
                
                <h3 className="mb-2 text-xl font-bold text-white group-hover:text-cyan-200 transition-colors duration-300">{vendor.name}</h3>
                <p className="mb-5 text-gray-300/90 text-sm leading-relaxed line-clamp-2">{vendor.description}</p>
                
                <div className="flex items-center justify-between">
                  <Link 
                    href={`/vendor/${vendor.id}`}
                    className="group/button inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-white/15 focus:outline-none"
                  >
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Voir la boutique
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        {new Date().getFullYear()} Winsurf — Aide les entreprises locales à se digitaliser.
      </footer>

      {/* Nearby shops modal (hasApp=true) */}
      {planetOpen && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setPlanetOpen(false)} />
          <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-background p-4 shadow-2xl sm:p-6">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-lg font-semibold"><Globe className="h-5 w-5 text-[var(--primary)]"/> Commerces autour</div>
              <button className="rounded-full border border-border px-3 py-1 text-sm hover:bg-muted" onClick={() => setPlanetOpen(false)}>Fermer</button>
            </div>
            {/* Mini-map: Google Maps if API key, fallback to inline SVG */}
            <div className="mb-3 rounded-xl border border-border bg-card/60 p-3">
              {(() => {
                const avail = vendors.filter(v => v.hasApp && v.lat && v.lng);
                if (!avail.length) return <div className="text-xs text-muted-foreground">Aucune donnée carte.</div>;
                if (googleApiKey) {
                  const center = userPos ?? {
                    lat: avail.reduce((s,v)=>s+(v.lat as number),0)/avail.length,
                    lng: avail.reduce((s,v)=>s+(v.lng as number),0)/avail.length,
                  };
                  const markers = avail.map(v => ({ lat: v.lat as number, lng: v.lng as number, title: v.name, href: `/vendor/${v.slug}` }));
                  return <GoogleMap apiKey={googleApiKey} center={center} markers={markers} height={180} />;
                }
                const lats = avail.map(v => v.lat as number);
                const lngs = avail.map(v => v.lng as number);
                const minLat = Math.min(...lats), maxLat = Math.max(...lats);
                const minLng = Math.min(...lngs), maxLng = Math.max(...lngs);
                const w = 520, h = 180;
                const x = (lng:number) => ((lng - minLng) / Math.max(0.0001, (maxLng - minLng))) * (w - 20) + 10;
                const y = (lat:number) => (1 - (lat - minLat) / Math.max(0.0001, (maxLat - minLat))) * (h - 20) + 10;
                return (
                  <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full text-muted-foreground">
                    <rect x="0" y="0" width={w} height={h} rx="12" className="fill-transparent stroke-[0.5] stroke-current/20" />
                    {userPos && (<circle cx={x(userPos.lng)} cy={y(userPos.lat)} r="5" className="fill-[var(--primary)]" />)}
                    {avail.map((v) => (<circle key={v.id} cx={x(v.lng as number)} cy={y(v.lat as number)} r="4" className="fill-white/80" />))}
                  </svg>
                );
              })()}
            </div>

            <div className="max-h-[60vh] space-y-2 overflow-auto">
              {(() => {
                const avail = vendors.filter(v => v.hasApp);
                let sorted = avail;
                if (userPos) {
                  sorted = [...avail].sort((a,b) => haversineKm(userPos, a) - haversineKm(userPos, b));
                } else if (address.trim()) {
                  const q = address.trim().toLowerCase();
                  sorted = [...avail].sort((a,b) => {
                    const am = a.city.toLowerCase().includes(q) ? 0 : 1;
                    const bm = b.city.toLowerCase().includes(q) ? 0 : 1;
                    if (am !== bm) return am - bm;
                    return a.name.localeCompare(b.name);
                  });
                }
                return sorted.map(v => {
                  const d = userPos ? haversineKm(userPos, v) : null;
                  return (
                    <Link key={v.id} href={`/vendor/${v.slug}`} className="flex items-center justify-between rounded-xl border border-border p-3 hover:bg-muted" onClick={() => setPlanetOpen(false)}>
                      <div>
                        <div className="font-medium">{v.name}</div>
                        <div className="text-xs text-muted-foreground">{v.category} • {v.city}{!userPos && address.trim() && v.city.toLowerCase().includes(address.trim().toLowerCase()) ? " • proche de la recherche" : ""}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        {d !== null && isFinite(d) && (
                          <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{d < 1 ? `${Math.round(d*1000)} m` : `${d.toFixed(1)} km`}</span>
                        )}
                        <span className="text-xs text-[var(--primary)]">Voir →</span>
                      </div>
                    </Link>
                  );
                });
              })()}
              {vendors.filter(v => v.hasApp).length === 0 && (
                <div className="rounded-lg border border-border p-4 text-sm text-muted-foreground">Aucun commerce n’a encore activé l’app.</div>
              )}
              {geoErr && (
                <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-xs text-yellow-200">
                  {geoErr} <button className="ml-2 underline" onClick={getLocation}>Réessayer</button>
                </div>
              )}
              {!userPos && !geoErr && (
                <button onClick={getLocation} disabled={locating} className="mt-2 w-full rounded-lg border border-border px-3 py-2 text-sm hover:bg-muted">
                  {locating ? "Localisation…" : "Utiliser ma position"}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
