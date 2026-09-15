"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const PIROS = "#dc2626";

/** ∫_1^D dx/x^p */
function felhalmozott(p, D) {
  if (D <= 1) return 0;
  if (Math.abs(p - 1) < 1e-9) return Math.log(D);
  return (Math.pow(D, 1 - p) - 1) / (1 - p);
}

const GYORS = [
  { cimke: "p = 1/2", ertek: 0.5 },
  { cimke: "p = 0,9", ertek: 0.9 },
  { cimke: "p = 1", ertek: 1 },
  { cimke: "p = 1,1", ertek: 1.1 },
  { cimke: "p = 2", ertek: 2 },
];

const XMAX = 11.5;

export default function ImVegtelenFelfedezo() {
  const [p, setP] = useState(2);
  const [logD, setLogD] = useState(1);
  const d = Math.pow(10, logD);

  const fn = (x) => (x <= 0 ? NaN : Math.pow(x, -p));
  const ertek = felhalmozott(p, d);
  const konvergens = p > 1 + 1e-9;
  const hatar = konvergens ? 1 / (p - 1) : Infinity;

  const yFelso = Math.max(1.2, Math.min(3, Math.pow(0.9, -p)));
  const yAlso = Math.max(1.4, 1.25 * (konvergens ? Math.max(hatar, ertek) : ertek));

  const sorok = [1, 2, 3, 4, 6].map((k) => ({
    kitevo: k,
    ertek: felhalmozott(p, Math.pow(10, k)),
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={0}
            xMax={XMAX}
            yMin={0}
            yMax={yFelso}
            magassag={205}
            gorbek={[{ fn, szin: TEAL, vastag: 2.4, tol: 0.05 }]}
          >
            {(S) => {
              const jobbSzel = Math.min(d, XMAX);
              let path = `M${S.px(1).toFixed(1)},${S.py(0).toFixed(1)} `;
              for (let i = 0; i <= 200; i++) {
                const x = 1 + ((jobbSzel - 1) * i) / 200;
                path += `L${S.px(x).toFixed(1)},${S.py(Math.min(fn(x), yFelso)).toFixed(1)} `;
              }
              path += `L${S.px(jobbSzel).toFixed(1)},${S.py(0).toFixed(1)} Z`;
              return (
                <g>
                  <path d={path} fill={TEAL} fillOpacity="0.2" clipPath="url(#fv-vago)" />
                  <line x1={S.px(1)} y1={S.py(0)} x2={S.px(1)} y2={S.margo.fel} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  {d <= XMAX ? (
                    <>
                      <line x1={S.px(d)} y1={S.py(0)} x2={S.px(d)} y2={S.margo.fel} stroke={PIROS} strokeWidth="1.2" strokeDasharray="4 3" />
                      <text x={S.px(d) + 4} y={S.margo.fel + 13} fontSize="11.5" fontWeight="650" fill={PIROS}>
                        d
                      </text>
                    </>
                  ) : (
                    <>
                      <path
                        d={`M${S.px(XMAX - 2.4)},${S.margo.fel + 20} L${S.px(XMAX - 0.2)},${S.margo.fel + 20}`}
                        stroke={PIROS}
                        strokeWidth="1.5"
                        markerEnd="url(#im-veg-hegy)"
                      />
                      <text x={S.px(XMAX - 2.6)} y={S.margo.fel + 24} fontSize="11" fontWeight="650" fill={PIROS} textAnchor="end">
                        d = {sz(d, 0)}
                      </text>
                      <defs>
                        <marker id="im-veg-hegy" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                          <path d="M 0 1 L 9 5 L 0 9 z" fill={PIROS} />
                        </marker>
                      </defs>
                    </>
                  )}
                  <text
                    x={S.px(3.2)}
                    y={S.py(fn(3.2)) - 9}
                    fontSize="12"
                    fontWeight="650"
                    style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    y = 1/x^{sz(p, 2)}
                  </text>
                </g>
              );
            }}
          </FvRajz>

          <FvRajz
            xMin={0}
            xMax={6.8}
            yMin={0}
            yMax={yAlso}
            magassag={195}
            tengelyCimkek={{ x: "lg d", y: "T(d)" }}
            gorbek={[{ fn: (u) => felhalmozott(p, Math.pow(10, u)), szin: NAR, vastag: 2.6 }]}
            vizszintes={konvergens ? [{ y: hatar, szin: "#047857" }] : []}
          >
            {(S) => (
              <g>
                <circle cx={S.px(logD)} cy={S.py(Math.min(ertek, yAlso))} r="5" fill={PIROS} stroke="white" strokeWidth="1.6" />
                {konvergens && (
                  <text
                    x={S.margo.bal + S.w - 4}
                    y={S.py(hatar) - 7}
                    fontSize="11.5"
                    fontWeight="650"
                    textAnchor="end"
                    style={{ fill: "#047857", paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    határérték: {sz(hatar, 3)}
                  </text>
                )}
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Fent a görbe és az 1-től <M>{"d"}</M>-ig satírozott terület, lent ugyanennek a területnek az értéke{" "}
            <M>{"\\lg d"}</M> függvényében. Beáll egy vonalra, vagy elszáll?
          </p>
        </div>

        <div className="p-5">
          <div className="szamok text-[15px] text-petrol-900">
            <M>{`\\int_{1}^{d}\\frac{dx}{x^{${szK(p, 2)}}}`}</M>
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka cimke="Kitevő, p" ertek={p} min={0.2} max={3} lepes={0.05} tizedes={2} onChange={setP} />
            <Csuszka cimke="Felső határ, d = 10^" ertek={logD} min={0} max={6} lepes={0.1} tizedes={1} onChange={setLogD} />
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
              d = <span className="szamok font-semibold text-petrol-800">{sz(d, d < 100 ? 1 : 0)}</span>
            </p>
            <div className="szamok mt-1 text-[14px] text-petrol-900">
              <M>
                {Math.abs(p - 1) < 1e-9
                  ? `\\int_1^{d}\\frac{dx}{x} = \\ln d = ${szK(ertek, 3)}`
                  : `\\int_1^{d}\\frac{dx}{x^{p}} = \\frac{d^{\\,1-p}-1}{1-p} = ${szK(ertek, 3)}`}
              </M>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 ${
              konvergens ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"
            }`}
          >
            <p className={`text-[11px] font-bold tracking-[0.14em] uppercase ${konvergens ? "text-emerald-700" : "text-rose-700"}`}>
              {konvergens ? "Konvergens" : "Divergens"}
            </p>
            <div className="szamok mt-1 text-[14px] text-petrol-900">
              {konvergens ? (
                <M>{`\\int_1^{\\infty}\\frac{dx}{x^{${szK(p, 2)}}} = \\frac{1}{p-1} = ${szK(hatar, 3)}`}</M>
              ) : (
                <M>{`\\lim_{d\\to\\infty}\\int_1^{d}\\frac{dx}{x^{${szK(p, 2)}}} = +\\infty`}</M>
              )}
            </div>
            <p className="mt-1.5 text-[12.5px] text-petrol-700">
              {Math.abs(p - 1) < 1e-9
                ? "A p = 1 határeset: a logaritmus nagyon lassan, de korlátlanul nő — épp csak nem elég gyors a fogyás."
                : konvergens
                  ? "p > 1: a függvény elég gyorsan fogy, a felhalmozott terület beáll egy számra."
                  : "p < 1: a függvény lassan fogy, a terület minden határon túl nő."}
            </p>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-petrol-100">
            <table className="szamok w-full text-[12.5px]">
              <thead className="bg-petrol-50 text-petrol-500">
                <tr>
                  <th className="px-3 py-1.5 text-left font-semibold">d</th>
                  <th className="px-3 py-1.5 text-right font-semibold">∫₁ᵈ dx/xᵖ</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                {sorok.map((s) => (
                  <tr key={s.kitevo} className="border-t border-petrol-100">
                    <td className="px-3 py-1">10{["", "¹", "²", "³", "⁴", "⁵", "⁶"][s.kitevo]}</td>
                    <td className="px-3 py-1 text-right">{s.ertek > 1e7 ? "nagyon nagy" : sz(s.ertek, 3)}</td>
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
