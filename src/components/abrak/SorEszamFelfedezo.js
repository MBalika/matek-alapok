"use client";

import { useState } from "react";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const SZ = 560;
const MA = 330;
const BAL = 52;
const JOBB = 20;
const FENT = 22;
const LENT = 36;

const LG_MAX = 4; // n = 10 000
const Y_ALSO = 1.9;
const Y_FELSO = 3.12;

const ertek = (n) => Math.pow(1 + 1 / n, n);

const px = (lg) => BAL + (lg / LG_MAX) * (SZ - BAL - JOBB);
const py = (y) => FENT + ((Y_FELSO - y) / (Y_FELSO - Y_ALSO)) * (MA - FENT - LENT);

const GORBE = (() => {
  const p = [];
  for (let i = 0; i <= 240; i++) {
    const lg = (i / 240) * LG_MAX;
    const n = Math.pow(10, lg);
    p.push(`${px(lg).toFixed(1)},${py(ertek(n)).toFixed(1)}`);
  }
  return p.join(" ");
})();

const JELOLT = [1, 2, 5, 10, 100, 1000, 10000];

export default function SorEszamFelfedezo() {
  const [lgN, setLgN] = useState(2); // n = 100
  const n = Math.max(1, Math.round(Math.pow(10, lgN)));
  const a = ertek(n);
  const toke = 100 * a;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full select-none">
            {/* vízszintes vonalak */}
            {[2, 2.25, 2.5, 2.75, 3].map((v) => (
              <g key={v}>
                <line x1={BAL} y1={py(v)} x2={SZ - JOBB} y2={py(v)} stroke="#dbe5e9" strokeWidth="1" />
                <text x={BAL - 7} y={py(v) + 4} textAnchor="end" fontSize="10.5" fill="#94a3b8">
                  {sz(v, 2)}
                </text>
              </g>
            ))}

            {/* felső korlát: 3 */}
            <line x1={BAL} y1={py(3)} x2={SZ - JOBB} y2={py(3)} stroke="#e11d48" strokeWidth="1.6" strokeDasharray="6 4" />
            <text x={SZ - JOBB - 2} y={py(3) - 6} textAnchor="end" fontSize="11.5" fontWeight="650" fill="#e11d48">
              felső korlát: 3
            </text>

            {/* e */}
            <line x1={BAL} y1={py(Math.E)} x2={SZ - JOBB} y2={py(Math.E)} stroke="#e2590a" strokeWidth="1.8" />
            <text x={SZ - JOBB - 2} y={py(Math.E) - 6} textAnchor="end" fontSize="11.5" fontWeight="650" fill="#e2590a">
              e = 2,71828…
            </text>

            {/* tengelyek */}
            <line x1={BAL} y1={MA - LENT} x2={SZ - JOBB + 4} y2={MA - LENT} stroke="#64748b" strokeWidth="1.25" />
            <line x1={BAL} y1={MA - LENT} x2={BAL} y2={FENT - 8} stroke="#64748b" strokeWidth="1.25" />
            <text x={SZ - JOBB + 2} y={MA - LENT - 8} textAnchor="end" fontSize="12" fill="#1d3c48">
              n (logaritmikus)
            </text>
            {[0, 1, 2, 3, 4].map((lg) => (
              <g key={lg}>
                <line x1={px(lg)} y1={MA - LENT} x2={px(lg)} y2={MA - LENT + 4} stroke="#64748b" strokeWidth="1" />
                <text x={px(lg)} y={MA - LENT + 19} textAnchor="middle" fontSize="10.5" fill="#94a3b8">
                  {Math.pow(10, lg)}
                </text>
              </g>
            ))}

            {/* a görbe */}
            <polyline points={GORBE} fill="none" stroke="#0f766e" strokeWidth="2.4" />

            {/* nevezetes tagok */}
            {JELOLT.map((k) => (
              <circle key={k} cx={px(Math.log10(k))} cy={py(ertek(k))} r="3.4" fill="#0f766e" stroke="white" strokeWidth="1.2" />
            ))}

            {/* az aktuális n */}
            <line x1={px(Math.log10(n))} y1={MA - LENT} x2={px(Math.log10(n))} y2={py(a)} stroke="#7c3aed" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx={px(Math.log10(n))} cy={py(a)} r="6.5" fill="#7c3aed" stroke="white" strokeWidth="2" />
            <text
              x={px(Math.log10(n)) + (Math.log10(n) > 3.2 ? -10 : 10)}
              y={py(a) + 20}
              textAnchor={Math.log10(n) > 3.2 ? "end" : "start"}
              fontSize="12"
              fontWeight="650"
              fill="#7c3aed"
              style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              n = {n}: {sz(a, 5)}
            </text>
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A sorozat szigorúan nő, a 3-at soha nem éri el — monoton és korlátos, tehát konvergens. A határérték az e.
          </p>
        </div>

        <div className="p-5">
          <div className="szamok text-[15px] text-petrol-900">
            <M>{"a_n = \\left(1+\\frac1n\\right)^n"}</M>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">n (logaritmikus csúszka)</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">{n}</span>
            </span>
            <input
              type="range"
              min={0}
              max={4}
              step={0.02}
              value={lgN}
              onChange={(e) => setLgN(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {JELOLT.map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setLgN(Math.log10(k))}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                n = {k}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <div className="szamok space-y-1.5 text-[13.5px] text-petrol-800">
              <div>
                <M>{`\\left(1+\\frac{1}{${n}}\\right)^{${n}} = ${szK(a, 6)}`}</M>
              </div>
              <div>
                <M>{`e - a_n = ${szK(Math.E - a, 6)}`}</M>
              </div>
            </div>
            <p className="mt-2 text-[12.5px] text-petrol-600">
              A közeledés nagyon lassú: a hiba nagyjából <M>{"e/(2n)"}</M>, tehát tízszer nagyobb n csak egy tizedesjeggyel
              pontosabb eredményt ad.
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] leading-relaxed text-emerald-900">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">Kamatos kamat</p>
            <p className="mt-1.5">
              Évi 100 % kamat, <strong>{n}</strong>-szeri tőkésítéssel: minden részperiódusban 1/{n} rész kamat jár, tehát 100
              forintból az év végére <span className="szamok font-semibold">{sz(toke, 2)} Ft</span> lesz. Ha végtelen sűrűn
              tőkésítünk („folytonos kamatozás”), <span className="szamok font-semibold">{sz(100 * Math.E, 2)} Ft</span>-nál áll
              meg — nem a végtelenbe szalad.
            </p>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            Ez az <M>{"1^\\infty"}</M> határozatlan alak legfontosabb példája: az alap 1-hez tart, a kitevő végtelenhez, és az
            eredmény mégsem 1, hanem e ≈ 2,718.
          </p>
        </div>
      </div>
    </div>
  );
}
