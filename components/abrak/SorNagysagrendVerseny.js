"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { sz } from "@/lib/szamok";

const SZ = 560;
const BAL = 92;
const JOBB = 26;
const FENT = 26;
const SOR = 40;
const N_MAX = 30;

/** log10-értékek, hogy a faktoriális és az n^n se csorduljon túl. */
const VERSENYZOK = [
  { nev: "ln n", szin: "#0ea5e9", lg: (n) => Math.log10(Math.max(1, Math.log(n))), ertek: (n) => Math.log(n) },
  { nev: "√n", szin: "#14b8a6", lg: (n) => 0.5 * Math.log10(n), ertek: (n) => Math.sqrt(n) },
  { nev: "n", szin: "#0f766e", lg: (n) => Math.log10(n), ertek: (n) => n },
  { nev: "n²", szin: "#65a30d", lg: (n) => 2 * Math.log10(n), ertek: (n) => n * n },
  { nev: "2ⁿ", szin: "#e2590a", lg: (n) => n * Math.log10(2), ertek: (n) => Math.pow(2, n) },
  { nev: "n!", szin: "#7c3aed", lg: lgFakt, ertek: (n) => Math.exp(lgFaktTermeszetes(n)) },
  { nev: "nⁿ", szin: "#e11d48", lg: (n) => n * Math.log10(n), ertek: (n) => Math.pow(n, n) },
];

function lgFakt(n) {
  let s = 0;
  for (let i = 2; i <= Math.floor(n); i++) s += Math.log10(i);
  return s;
}
function lgFaktTermeszetes(n) {
  let s = 0;
  for (let i = 2; i <= Math.floor(n); i++) s += Math.log(i);
  return s;
}

const LG_MAX = N_MAX * Math.log10(N_MAX); // n^n a 30. lépésnél

/** Folytonos pozíció: egész n-ek között log-térben interpolálunk. */
function lgErteknel(v, n) {
  const a = Math.floor(n);
  const b = Math.min(N_MAX, a + 1);
  const u = n - a;
  const la = Math.max(0, v.lg(a));
  const lb = Math.max(0, v.lg(b));
  return la + (lb - la) * u;
}

function nagyszam(x) {
  if (!Number.isFinite(x)) return "∞";
  if (x < 1e5) return sz(x, x < 10 ? 2 : 0);
  const kitevo = Math.floor(Math.log10(x));
  const mant = x / Math.pow(10, kitevo);
  return `${sz(mant, 2)}·10${String(kitevo)
    .split("")
    .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)])
    .join("")}`;
}

export default function SorNagysagrendVerseny() {
  const [n, setN] = useState(N_MAX);
  const [jatszik, setJatszik] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    if (!jatszik) return undefined;
    let utolso = null;
    let ertek = 1;
    const lepes = (most) => {
      if (utolso == null) utolso = most;
      ertek += ((most - utolso) / 1000) * 3.2; // 3,2 index / mp
      utolso = most;
      if (ertek >= N_MAX) {
        setN(N_MAX);
        setJatszik(false);
        return;
      }
      setN(ertek);
      raf.current = requestAnimationFrame(lepes);
    };
    raf.current = requestAnimationFrame(lepes);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [jatszik]);

  const magassag = FENT + VERSENYZOK.length * SOR + 34;
  const px = (lg) => BAL + (lg / LG_MAX) * (SZ - BAL - JOBB);

  const allas = useMemo(() => {
    const k = Math.max(1, Math.round(n));
    return VERSENYZOK.map((v) => ({ nev: v.nev, szin: v.szin, ertek: v.ertek(k), lg: Math.max(0, v.lg(k)) })).sort(
      (a, b) => b.lg - a.lg,
    );
  }, [n]);

  const egeszN = Math.max(1, Math.round(n));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox={`0 0 ${SZ} ${magassag}`} className="abra w-full select-none">
            {/* célvonal és nagyságrend-skála */}
            {[0, 10, 20, 30, 40].map((lg) => (
              <g key={lg}>
                <line x1={px(lg)} y1={FENT - 12} x2={px(lg)} y2={FENT + VERSENYZOK.length * SOR - 14} stroke="#dbe5e9" strokeWidth="1" />
                <text x={px(lg)} y={FENT + VERSENYZOK.length * SOR + 2} textAnchor="middle" fontSize="10" fill="#94a3b8">
                  10{String(lg)
                    .split("")
                    .map((d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)])
                    .join("")}
                </text>
              </g>
            ))}
            <text x={BAL} y={FENT - 16} fontSize="10.5" fill="#64748b">
              logaritmikus pálya — egy osztás tíz nagyságrend
            </text>

            {VERSENYZOK.map((v, i) => {
              const y = FENT + i * SOR;
              const x = px(lgErteknel(v, Math.max(1, n)));
              return (
                <g key={v.nev}>
                  <line x1={BAL} y1={y} x2={SZ - JOBB} y2={y} stroke="#e6eef1" strokeWidth="7" strokeLinecap="round" />
                  <line x1={BAL} y1={y} x2={x} y2={y} stroke={v.szin} strokeWidth="7" strokeLinecap="round" opacity="0.35" />
                  <text x={BAL - 10} y={y + 4} textAnchor="end" fontSize="12.5" fontWeight="650" fill={v.szin}>
                    {v.nev}
                  </text>
                  <circle cx={x} cy={y} r="7" fill={v.szin} stroke="white" strokeWidth="2" />
                </g>
              );
            })}
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A pálya logaritmikus: egyenlő szakaszok egyenlő <em>arányt</em> jelentenek. n = {egeszN}
          </p>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setN(1);
                setJatszik(true);
              }}
              disabled={jatszik}
              className="rounded-lg bg-naracs-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-naracs-600 disabled:opacity-60"
            >
              ▶ Rajt
            </button>
            <button
              type="button"
              onClick={() => {
                setJatszik(false);
                setN(N_MAX);
              }}
              className="rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              Ugrás a végére
            </button>
          </div>

          <label className="mt-3 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">n</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">{egeszN}</span>
            </span>
            <input
              type="range"
              min={1}
              max={N_MAX}
              step={1}
              value={egeszN}
              onChange={(e) => {
                setJatszik(false);
                setN(Number(e.target.value));
              }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <p className="mt-4 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Állás a {egeszN}. lépésnél
          </p>
          <ol className="mt-2 space-y-1">
            {allas.map((v, i) => (
              <li key={v.nev} className="flex items-center gap-2 rounded-lg bg-petrol-50 px-3 py-1.5">
                <span className="szamok w-4 text-[12px] font-bold text-petrol-400">{i + 1}.</span>
                <span className="text-[13px] font-semibold" style={{ color: v.szin }}>
                  {v.nev}
                </span>
                <span className="szamok ml-auto text-[12.5px] text-petrol-600">{nagyszam(v.ertek)}</span>
              </li>
            ))}
          </ol>

          <div className="mt-4 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3 text-[13px] leading-relaxed text-naracs-900">
            {egeszN <= 4 ? (
              <>
                Kis n-nél a sorrend <strong>félrevezető</strong>: n = {egeszN}-nél a hatványok még vezethetnek. Épp ezért nem
                szabad „megérzésre” dönteni.
              </>
            ) : (
              <>
                A végleges sorrend kialakult: <strong>ln n ≪ n<sup>α</sup> ≪ qⁿ ≪ n! ≪ nⁿ</strong>. Hányadosnál mindig az
                erősebb dönt: ha az erősebb a nevezőben van, a határérték 0.
              </>
            )}
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            Szemléletes példa a türelemre: <span className="szamok">n¹⁰⁰</span> egészen{" "}
            <span className="szamok">n = 996</span>-ig nagyobb, mint <span className="szamok">2ⁿ</span> — a{" "}
            <span className="szamok">997</span>. lépésnél előzi meg az exponenciális. A határértéket viszont a <em>végtelenben</em>{" "}
            nézzük, és ott már nincs vita.
          </p>
        </div>
      </div>
    </div>
  );
}
