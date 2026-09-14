"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { kurzus, modulok, extraOldalak } from "@/lib/oldalterkep";
import SotetKapcsolo from "@/components/SotetKapcsolo";

function Logo({ className = "" }) {
  // Görbe és tengelyek: a függvény, az analízis alapgondolata
  return (
    <svg viewBox="0 0 44 40" className={className} aria-hidden="true">
      <path
        d="M6 34 H38"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M6 34 V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.45"
      />
      <path
        d="M8 30 C 14 30, 18 9, 24 9 S 32 24, 38 11"
        fill="none"
        stroke="var(--color-naracs-400)"
        strokeWidth="3.2"
        strokeLinecap="round"
      />
      <circle cx="24" cy="9" r="2.6" fill="white" />
    </svg>
  );
}

function Nyilacska({ nyitva }) {
  return (
    <svg
      viewBox="0 0 12 12"
      className={`hidden h-2.5 w-2.5 transition-transform duration-200 2xl:block ${
        nyitva ? "rotate-180" : ""
      }`}
      aria-hidden="true"
    >
      <path
        d="M2 4.5 L6 8.5 L10 4.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function SiteHeader() {
  const utvonal = usePathname();
  const [mobilNyitva, setMobilNyitva] = useState(false);
  const [nyitottFul, setNyitottFul] = useState(null);

  return (
    <header className="sticky top-0 z-50">
      {/* Felső, sötét sáv */}
      <div className="racs-hatter bg-linear-to-r from-petrol-950 via-petrol-800 to-petrol-700">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5 text-white">
            <Logo className="h-7 w-7 shrink-0 text-white" />
            <span className="leading-none">
              <span className="block text-[15px] font-semibold tracking-[0.14em] uppercase">
                {kurzus.cim}
              </span>
              <span className="mt-0.5 block text-[11px] font-medium tracking-wide text-petrol-200">
                {kurzus.alcim}
              </span>
            </span>
          </Link>

          <span className="ml-auto hidden text-right text-[11px] leading-tight text-petrol-200/90 lg:block">
            <span className="block">{kurzus.tanszek}</span>
            <span className="block text-petrol-300/80">{kurzus.targy}</span>
          </span>

          <div className="hidden items-center gap-1.5 md:flex lg:ml-3">
            {extraOldalak.map((o) => {
              const aktiv = utvonal.startsWith(o.slug);
              return (
                <Link
                  key={o.slug}
                  href={o.slug}
                  title={o.leiras}
                  className={`rounded-lg px-2.5 py-1.5 text-[12px] font-semibold transition ${
                    aktiv ? "bg-naracs-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {o.rovid}
                </Link>
              );
            })}
            <SotetKapcsolo vilagos />
          </div>

          <button
            type="button"
            onClick={() => setMobilNyitva((v) => !v)}
            className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/20 text-white transition hover:bg-white/10 md:hidden"
            aria-label="Menü"
            aria-expanded={mobilNyitva}
          >
            <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
              {mobilNyitva ? (
                <path
                  d="M5 5 L15 15 M15 5 L5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6 H17 M3 10 H17 M3 14 H17"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Alsó, világos navigációs sáv – asztali nézet */}
      <nav className="hidden border-b border-[color:var(--keret)] bg-white/95 backdrop-blur md:block">
        <div className="finom-gorgeto mx-auto flex max-w-7xl items-stretch gap-0.5 overflow-x-auto px-4 sm:px-6">
          {modulok.map((m) => {
            const aktiv =
              m.slug === "/" ? utvonal === "/" : utvonal.startsWith(m.slug);
            return (
              <div
                key={m.slug}
                className="relative shrink-0"
                onMouseEnter={() => setNyitottFul(m.slug)}
                onMouseLeave={() => setNyitottFul(null)}
              >
                <Link
                  href={m.slug}
                  className={`flex h-12 items-center gap-1 border-b-2 px-1.5 text-[12.5px] font-medium whitespace-nowrap transition 2xl:gap-1.5 2xl:px-2.5 2xl:text-[13px] ${
                    aktiv
                      ? "border-naracs-500 text-petrol-900"
                      : "border-transparent text-petrol-600 hover:border-petrol-200 hover:text-petrol-900"
                  }`}
                >
                  {m.szam !== null && (
                    <span
                      className={`grid h-5 w-5 place-items-center rounded text-[11px] font-bold ${
                        aktiv
                          ? "bg-naracs-500 text-white"
                          : "bg-petrol-100 text-petrol-600"
                      }`}
                    >
                      {m.szam}
                    </span>
                  )}
                  {m.rovid}
                  {!m.kesz && (
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-petrol-300"
                      title="hamarosan"
                      aria-label="hamarosan"
                    />
                  )}
                  <Nyilacska nyitva={nyitottFul === m.slug} />
                </Link>

                {nyitottFul === m.slug && (
                  <div className="absolute top-full left-0 z-50 w-72 rounded-b-xl border border-t-0 border-[color:var(--keret)] bg-white p-2 shadow-xl shadow-petrol-900/5">
                    <p className="px-2.5 pt-1.5 pb-2 text-[11.5px] leading-snug text-petrol-500">
                      {!m.kesz && (
                        <span className="mr-1.5 rounded bg-petrol-100 px-1.5 py-0.5 text-[9.5px] font-semibold tracking-wide text-petrol-500 uppercase">
                          hamarosan
                        </span>
                      )}
                      {m.leiras}
                    </p>
                    {m.szakaszok.map((sz) => (
                      <Link
                        key={sz.id}
                        href={`${m.slug === "/" ? "" : m.slug}#${sz.id}`}
                        className="block rounded-lg px-2.5 py-1.5 text-[13px] text-petrol-700 transition hover:bg-petrol-50 hover:text-petrol-900"
                      >
                        {sz.cim}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Mobil menü */}
      {mobilNyitva && (
        <nav className="border-b border-[color:var(--keret)] bg-white shadow-lg md:hidden">
          <div className="max-h-[70vh] overflow-y-auto px-4 py-3">
            <div className="flex flex-wrap items-center gap-2 border-b border-petrol-50 pb-3">
              {extraOldalak.map((o) => (
                <Link
                  key={o.slug}
                  href={o.slug}
                  onClick={() => setMobilNyitva(false)}
                  className="rounded-lg bg-naracs-500 px-3 py-1.5 text-[12.5px] font-semibold text-white"
                >
                  {o.rovid}
                </Link>
              ))}
              <SotetKapcsolo />
            </div>
            {modulok.map((m) => {
              const aktiv =
                m.slug === "/" ? utvonal === "/" : utvonal.startsWith(m.slug);
              return (
                <div key={m.slug} className="border-b border-petrol-50 py-2 last:border-0">
                  <Link
                    href={m.slug}
                    onClick={() => setMobilNyitva(false)}
                    className={`flex items-center gap-2 text-[15px] font-semibold ${
                      aktiv ? "text-naracs-600" : "text-petrol-900"
                    }`}
                  >
                    {m.szam !== null && (
                      <span className="grid h-5 w-5 place-items-center rounded bg-petrol-100 text-[11px] font-bold text-petrol-600">
                        {m.szam}
                      </span>
                    )}
                    {m.cim}
                  </Link>
                  <div className="mt-1.5 flex flex-wrap gap-1.5 pl-7">
                    {m.szakaszok.map((sz) => (
                      <Link
                        key={sz.id}
                        href={`${m.slug === "/" ? "" : m.slug}#${sz.id}`}
                        onClick={() => setMobilNyitva(false)}
                        className="rounded-full bg-petrol-50 px-2.5 py-1 text-[12px] text-petrol-600"
                      >
                        {sz.cim}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
