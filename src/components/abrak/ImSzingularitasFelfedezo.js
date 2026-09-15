"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const PIROS = "#dc2626";

const YMAX = 9;

/** ∫_ε^1 x^{-p} dx pontos értéke. */
function csonka(p, eps) {
  if (Math.abs(p - 1) < 1e-9) return -Math.log(eps);
  return (1 - Math.pow(eps, 1 - p)) / (1 - p);
}

const GYORS = [
  { cimke: "p = 1/2", ertek: 0.5 },
  { cimke: "p = 0,9", ertek: 0.9 },
  { cimke: "p = 1", ertek: 1 },
  { cimke: "p = 1,1", ertek: 1.1 },
  { cimke: "p = 2", ertek: 2 },
];

export default function ImSzingularitasFelfedezo() {
  const [p, setP] = useState(0.5);
  const [logEps, setLogEps] = useState(-1);
  const eps = Math.pow(10, logEps);

  const fn = (x) => (x <= 0 ? NaN : Math.pow(x, -p));
  const ertek = csonka(p, eps);
  const konvergens = p < 1 - 1e-9;
  const hatar = konvergens ? 1 / (1 - p) : Infinity;

  const sorok = [-1, -2, -3, -4, -6].map((k) => ({
    eps: Math.pow(10, k),
    kitevo: k,
    ertek: csonka(p, Math.pow(10, k)),
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={0}
            xMax={1.3}
            yMin={0}
            yMax={YMAX}
            magassag={340}
            gorbek={[{ fn, szin: TEAL, vastag: 2.6, tol: 0.0002 }]}
            fuggoleges={[{ x: eps, szin: PIROS }]}
          >
            {(S) => {
              // satírozott terület ε-tól 1-ig
              let d = `M${S.px(eps).toFixed(1)},${S.py(0).toFixed(1)} `;
              const db = 220;
              for (let i = 0; i <= db; i++) {
                // sűrűbb mintavétel a bal széle felé (ott meredek a görbe)
                const u = i / db;
                const x = eps * Math.pow(1 / eps, u);
                const y = Math.min(fn(x), YMAX * 1.02);
                d += `L${S.px(x).toFixed(1)},${S.py(y).toFixed(1)} `;
              }
              d += `L${S.px(1).toFixed(1)},${S.py(0).toFixed(1)} Z`;
              return (
                <g>
                  <path d={d} fill={TEAL} fillOpacity="0.18" clipPath="url(#fv-vago)" />
                  <line
                    x1={S.px(1)}
                    y1={S.py(0)}
                    x2={S.px(1)}
                    y2={S.py(1)}
                    stroke="#94a3b8"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text x={S.px(eps) + 5} y={S.margo.fel + 14} fontSize="11.5" fontWeight="650" fill={PIROS}>
                    ε
                  </text>
                  <text
                    x={S.px(Math.min(0.75, Math.max(0.35, Math.sqrt(eps))))}
                    y={S.py(1.1)}
                    fontSize="12"
                    fontWeight="650"
                    textAnchor="middle"
                    style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    T = {sz(ertek, 3)}
                  </text>
                  <text
                    x={S.px(1.1)}
                    y={S.py(Math.min(YMAX * 0.82, Math.pow(1.1, -p) + 5))}
                    fontSize="12"
                    fontWeight="650"
                    textAnchor="end"
                    style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    y = 1/x^{sz(p, 2)}
                  </text>
                </g>
              );
            }}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A satírozott terület az <M>{"\\varepsilon"}</M>-tól 1-ig vett rendes integrál. Told az{" "}
            <M>{"\\varepsilon"}</M>-t a nullához, és nézd, beáll-e egy számra.
          </p>
        </div>

        <div className="p-5">
          <div className="szamok text-[15px] text-petrol-900">
            <M>{`\\int_{\\varepsilon}^{1}\\frac{dx}{x^{${szK(p, 2)}}}`}</M>
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka
              cimke="Kitevő, p"
              ertek={p}
              min={0.2}
              max={2}
              lepes={0.05}
              tizedes={2}
              onChange={setP}
            />
            <Csuszka
              cimke="Alsó határ, ε = 10^"
              ertek={logEps}
              min={-6}
              max={-0.3}
              lepes={0.1}
              tizedes={1}
              onChange={setLogEps}
            />
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {GYORS.map((g) => (
              <button
                key={g.cimke}
                type="button"
                onClick={() => setP(g.ertek)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  Math.abs(p - g.ertek) < 1e-9
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {g.cimke}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 px-4 py-3">
            <p className="text-[12px] text-petrol-500">
              ε = <span className="szamok font-semibold text-petrol-800">{eps < 0.001 ? eps.toExponential(1).replace(".", ",") : sz(eps, 4)}</span>
            </p>
            <div className="szamok mt-1 text-[14px] text-petrol-900">
              <M>
                {Math.abs(p - 1) < 1e-9
                  ? `\\int_{\\varepsilon}^{1}\\frac{dx}{x} = -\\ln\\varepsilon = ${szK(ertek, 3)}`
                  : `\\int_{\\varepsilon}^{1}\\frac{dx}{x^{p}} = \\frac{1-\\varepsilon^{\\,1-p}}{1-p} = ${szK(ertek, 3)}`}
              </M>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 ${
              konvergens ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p
              className={`text-[11px] font-bold tracking-[0.14em] uppercase ${
                konvergens ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {konvergens ? "Konvergens" : "Divergens"}
            </p>
            <div className="szamok mt-1 text-[14px] text-petrol-900">
              {konvergens ? (
                <M>{`\\int_0^1\\frac{dx}{x^{${szK(p, 2)}}} = \\frac{1}{1-p} = ${szK(hatar, 3)}`}</M>
              ) : (
                <M>{`\\lim_{\\varepsilon\\to0+0}\\int_{\\varepsilon}^{1}\\frac{dx}{x^{${szK(p, 2)}}} = +\\infty`}</M>
              )}
            </div>
            <p className="mt-1.5 text-[12.5px] text-petrol-700">
              {Math.abs(p - 1) < 1e-9
                ? "A p = 1 a határeset — és még ez is divergens: a logaritmus lassan, de minden határon túl nő."
                : konvergens
                  ? "p < 1: a függvény elég szelíden robban fel, a terület véges marad."
                  : "p > 1: a nulla közelében túl gyorsan nő, a terület minden határon túl nő."}
            </p>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-petrol-100">
            <table className="szamok w-full text-[12.5px]">
              <thead className="bg-petrol-50 text-petrol-500">
                <tr>
                  <th className="px-3 py-1.5 text-left font-semibold">ε</th>
                  <th className="px-3 py-1.5 text-right font-semibold">∫ε¹ dx/xᵖ</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                {sorok.map((s) => (
                  <tr key={s.kitevo} className="border-t border-petrol-100">
                    <td className="px-3 py-1">10{s.kitevo === -1 ? "⁻¹" : s.kitevo === -2 ? "⁻²" : s.kitevo === -3 ? "⁻³" : s.kitevo === -4 ? "⁻⁴" : "⁻⁶"}</td>
                    <td className="px-3 py-1 text-right">{s.ertek > 1e6 ? "nagyon nagy" : sz(s.ertek, 3)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
