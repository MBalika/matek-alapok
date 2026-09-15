"use client";

import { useState } from "react";
import { Csuszka } from "./Csuszka";
import { forgasFelszin, forgasTerfogat } from "./HoSzamol";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";

const SZ = 560;
const MA = 360;

const PROFILOK = [
  {
    cimke: "félkör → gömb",
    latex: "f(x)=\\sqrt{4-x^2}",
    fn: (x) => Math.sqrt(Math.max(0, 4 - x * x)),
    a: -2,
    b: 2,
    vLatex: "V=\\frac{4R^3\\pi}{3}=\\frac{32\\pi}{3}\\approx 33{,}51",
    fLatex: "F=4R^2\\pi=16\\pi\\approx 50{,}27",
    megjegyzes:
      "R = 2 sugarú gömb (26. és 30. példa). A felszínnél a két gyök kiejti egymást — ezért lesz a végeredmény ilyen egyszerű.",
  },
  {
    cimke: "egyenes → csonkakúp",
    latex: "f(x)=1+\\frac{x}{2}",
    fn: (x) => 1 + x / 2,
    a: 0,
    b: 2,
    vLatex: "V=\\frac{\\pi m}{3}\\left(R^2+Rr+r^2\\right)=\\frac{14\\pi}{3}\\approx 14{,}66",
    fLatex: "F=\\pi(R+r)\\ell=3\\pi\\sqrt5\\approx 21{,}07",
    megjegyzes:
      "A 27. példa r = 1, R = 2, m = 2 adatokkal: V = 2π/3·(4+2+1) = 14π/3. A palást alkotója ℓ = √(m²+(R−r)²) = √5.",
  },
  {
    cimke: "√x",
    latex: "f(x)=\\sqrt{x}",
    fn: (x) => (x >= 0 ? Math.sqrt(x) : 0),
    a: 0,
    b: 2,
    vLatex: "V=\\pi\\int_0^2 x\\,dx = 2\\pi\\approx 6{,}283",
    fLatex: "F=\\frac{13\\pi}{3}\\approx 13{,}61",
    megjegyzes:
      "A 31. példa: f·√(1+f′²) = √(x + ¼), és innen F = 13π/3. A térfogat viszont triviális: π∫x dx.",
  },
  {
    cimke: "parabola",
    latex: "f(x)=x^2",
    fn: (x) => x * x,
    a: 0,
    b: 1.5,
    vLatex: "V=\\pi\\int_0^{1{,}5}x^4dx = \\frac{\\pi\\cdot 1{,}5^5}{5}\\approx 4{,}771",
    fLatex: "F=2\\pi\\int_0^{1{,}5}x^2\\sqrt{1+4x^2}\\,dx\\approx 17{,}52",
    megjegyzes:
      "Trombitaszerű test. Figyeld meg, hogy a felszín képletében az első hatvány és a gyök szerepel, a térfogatéban a négyzet és nincs gyök — a két képlet nem cserélhető fel.",
  },
];

export default function HoForgastest() {
  const [i, setI] = useState(0);
  const [fok, setFok] = useState(210);
  const [korongok, setKorongok] = useState(false);
  const [n, setN] = useState(8);
  const P = PROFILOK[i];

  const V = forgasTerfogat(P.fn, P.a, P.b, 2000);
  const F = forgasFelszin(P.fn, P.a, P.b, 2000);

  /* --- vetítés: az x tengely vízszintes, a forgáskör „ferdén” látszik --- */
  const bx = 40;
  const jx = 520;
  const cy = 196;
  const rMax = Math.max(...Array.from({ length: 60 }, (_, k) => P.fn(P.a + ((P.b - P.a) * k) / 59)));
  // azonos lépték vízszintesen és függőlegesen, hogy a gömb gömbnek látsszon
  const leptek = Math.min((jx - bx) / (P.b - P.a), 116 / (rMax || 1));
  const kx = leptek;
  const ky = leptek;
  const lapit = 0.34; // a kör „mélységi” összenyomása
  const eltol = (SZ - (P.b - P.a) * leptek) / 2;

  const px = (x) => eltol + (x - P.a) * leptek;
  const pont = (x, teta) => {
    const r = P.fn(x);
    return [px(x) + r * Math.sin(teta) * kx * lapit, cy - r * Math.cos(teta) * ky];
  };

  const ut = (teta, tol = P.a, ig = P.b, db = 90) => {
    let d = "";
    for (let k = 0; k <= db; k++) {
      const x = tol + ((ig - tol) * k) / db;
      const [X, Y] = pont(x, teta);
      d += `${k ? "L" : "M"}${X.toFixed(1)},${Y.toFixed(1)} `;
    }
    return d;
  };

  const rad = (fok * Math.PI) / 180;

  /* körív egy adott x-nél 0-tól a forgásszögig */
  const korIv = (x, szog) => {
    const db = Math.max(2, Math.round((Math.abs(szog) / Math.PI) * 30));
    let d = "";
    for (let k = 0; k <= db; k++) {
      const [X, Y] = pont(x, (szog * k) / db);
      d += `${k ? "L" : "M"}${X.toFixed(1)},${Y.toFixed(1)} `;
    }
    return d;
  };

  /* a sziluett (a teljes körbeforgatott test körvonala) */
  const sziluett = `${ut(0)} ${ut(Math.PI, P.b, P.a)} Z`;

  const korongHelyek = Array.from({ length: n }, (_, k) => ({
    x0: P.a + ((P.b - P.a) * k) / n,
    x1: P.a + ((P.b - P.a) * (k + 1)) / n,
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            {/* x tengely */}
            <line x1={px(P.a) - 40} y1={cy} x2={px(P.b) + 34} y2={cy} stroke="#475569" strokeWidth="1.3" />
            <text x={px(P.b) + 38} y={cy + 4} fontSize="12" fontStyle="italic" fill="#475569">
              x
            </text>
            <text x={px(P.a)} y={MA - 8} fontSize="11.5" fontWeight="650" textAnchor="middle" fill={NAR}>
              a = {sz(P.a, 1)}
            </text>
            <text x={px(P.b)} y={MA - 8} fontSize="11.5" fontWeight="650" textAnchor="middle" fill={NAR}>
              b = {sz(P.b, 1)}
            </text>
            <line
              x1={px(P.a)}
              y1={cy}
              x2={px(P.a)}
              y2={MA - 22}
              stroke={NAR}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.6"
            />
            <line
              x1={px(P.b)}
              y1={cy}
              x2={px(P.b)}
              y2={MA - 22}
              stroke={NAR}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.6"
            />

            {/* a megforgatott test sziluettje */}
            <path d={sziluett} fill={TEAL} fillOpacity={0.09 + 0.1 * (fok / 360)} stroke="none" />

            {/* a forgatás körívei */}
            {Array.from({ length: 13 }, (_, k) => {
              const x = P.a + ((P.b - P.a) * k) / 12;
              if (P.fn(x) < 1e-6) return null;
              return (
                <path
                  key={k}
                  d={korIv(x, rad)}
                  fill="none"
                  stroke={SZURKE}
                  strokeWidth="1"
                  opacity="0.85"
                />
              );
            })}

            {/* korongokra vágás */}
            {korongok &&
              korongHelyek.map((k, j) => {
                const r = P.fn((k.x0 + k.x1) / 2);
                if (r < 1e-6) return null;
                const X0 = px(k.x0);
                const X1 = px(k.x1);
                const ry = r * ky;
                const rx = r * kx * lapit;
                return (
                  <g key={j}>
                    <rect
                      x={X0}
                      y={cy - ry}
                      width={X1 - X0}
                      height={2 * ry}
                      fill={LILA}
                      fillOpacity="0.14"
                      stroke={LILA}
                      strokeWidth="0.9"
                    />
                    <ellipse
                      cx={X1}
                      cy={cy}
                      rx={rx}
                      ry={ry}
                      fill={LILA}
                      fillOpacity="0.16"
                      stroke={LILA}
                      strokeWidth="1"
                    />
                  </g>
                );
              })}

            {/* a profilgörbe kiinduló helyzetben és elforgatva */}
            <path d={ut(0)} fill="none" stroke={TEAL} strokeWidth="2.8" />
            <path d={ut(rad)} fill="none" stroke={NAR} strokeWidth="2.4" strokeDasharray="6 4" />

            {/* a végső záró ellipszisek */}
            {P.fn(P.b) > 1e-6 && (
              <ellipse
                cx={px(P.b)}
                cy={cy}
                rx={P.fn(P.b) * kx * lapit}
                ry={P.fn(P.b) * ky}
                fill="none"
                stroke={TEAL}
                strokeWidth="1.6"
                opacity={fok >= 355 ? 1 : 0.45}
              />
            )}
            {P.fn(P.a) > 1e-6 && (
              <ellipse
                cx={px(P.a)}
                cy={cy}
                rx={P.fn(P.a) * kx * lapit}
                ry={P.fn(P.a) * ky}
                fill="none"
                stroke={TEAL}
                strokeWidth="1.6"
                opacity={fok >= 355 ? 1 : 0.45}
              />
            )}

            {/* sugárnyíl egy helyen */}
            {(() => {
              const xk = P.a + (P.b - P.a) * 0.62;
              const r = P.fn(xk);
              if (r < 1e-6) return null;
              return (
                <g>
                  <line
                    x1={px(xk)}
                    y1={cy}
                    x2={px(xk)}
                    y2={cy - r * ky}
                    stroke={NAR}
                    strokeWidth="2"
                  />
                  <text
                    x={px(xk) + 7}
                    y={cy - (r * ky) / 2}
                    fontSize="12"
                    fontWeight="650"
                    style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    f(x)
                  </text>
                </g>
              );
            })()}

            <text
              x={16}
              y={26}
              fontSize="12.5"
              fontWeight="700"
              style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              forgatás: {Math.round(fok)}°
            </text>
            {korongok && (
              <text
                x={16}
                y={MA - 30}
                fontSize="12"
                fontWeight="650"
                style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
              >
                {n} korong · ΔV ≈ f(x)²π·Δx
              </text>
            )}
          </svg>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Profilgörbe</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PROFILOK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => setI(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka
              cimke="Forgatás"
              ertek={fok}
              egyseg="°"
              min={0}
              max={360}
              lepes={1}
              tizedes={0}
              onChange={setFok}
            />
            {korongok && (
              <Csuszka
                cimke="A korongok száma"
                ertek={n}
                min={2}
                max={24}
                lepes={1}
                tizedes={0}
                onChange={setN}
              />
            )}
          </div>

          <button
            type="button"
            onClick={() => setKorongok((v) => !v)}
            className={`mt-3 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold ring-1 transition ${
              korongok
                ? "bg-violet-600 text-white ring-violet-600"
                : "bg-white text-violet-700 ring-violet-200 hover:bg-violet-50"
            }`}
          >
            {korongok ? "Korongok elrejtése" : "Korongokra vágás"}
          </button>

          <div className="szamok mt-4 rounded-xl bg-petrol-50 p-4 text-[13.5px] text-petrol-800">
            <M>{`${P.latex},\\quad ${sz(P.a, 1).replace(",", "{,}")} \\le x \\le ${sz(P.b, 1).replace(",", "{,}")}`}</M>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
              <p className="text-[11px] text-naracs-700">Térfogat, V</p>
              <p className="szamok text-[15px] font-semibold text-naracs-900">{sz(V, 3)}</p>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50 px-2 py-2">
              <p className="text-[11px] text-violet-700">Felszín (palást), F</p>
              <p className="szamok text-[15px] font-semibold text-violet-900">{sz(F, 3)}</p>
            </div>
          </div>

          <div className="szamok finom-gorgeto mt-3 space-y-1.5 overflow-x-auto rounded-xl border border-petrol-200 bg-white p-4 text-[13px] text-petrol-800">
            <div>
              <M>{"V=\\pi\\int_a^b f(x)^2dx"}</M>
            </div>
            <div>
              <M>{P.vLatex}</M>
            </div>
            <div className="border-t border-petrol-100 pt-1.5">
              <M>{"F=2\\pi\\int_a^b f(x)\\sqrt{1+f'(x)^2}\\,dx"}</M>
            </div>
            <div>
              <M>{P.fLatex}</M>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{P.megjegyzes}</p>
        </div>
      </div>
    </div>
  );
}
