"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";
import { simpson } from "./ImNumerika";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const PIROS = "#dc2626";

/**
 * A négy jegyzetbeli példa + két „rossz irányú” eset, amelyekből semmi nem következik.
 * irany: "majorans" → g fölötte van; "minorans" → h alatta van.
 */
const PELDAK = [
  {
    cimke: "e^(−x²)",
    fLatex: "e^{-x^2}",
    f: (x) => Math.exp(-x * x),
    gLatex: "e^{-x}",
    g: (x) => Math.exp(-x),
    irany: "majorans",
    gKonv: true,
    jo: true,
    yMax: 0.42,
    indok: "Ha x ≥ 1, akkor x² ≥ x, tehát e^(−x²) ≤ e^(−x). A majoráns integrálja 1/e ≈ 0,368, konvergens.",
    zaras: "Konvergens — és az értéke legfeljebb 1/e ≈ 0,368.",
  },
  {
    cimke: "1/(x²+√x)",
    fLatex: "\\frac{1}{x^2+\\sqrt{x}}",
    f: (x) => 1 / (x * x + Math.sqrt(x)),
    gLatex: "\\frac{1}{x^2}",
    g: (x) => 1 / (x * x),
    irany: "majorans",
    gKonv: true,
    jo: true,
    yMax: 1.15,
    indok: "A nagyobb nevező kisebb törtet ad: x² + √x > x², tehát a tört kisebb, mint 1/x².",
    zaras: "Konvergens — a majoráns p = 2 > 1 miatt konvergens.",
  },
  {
    cimke: "(2+sin x)/x",
    fLatex: "\\frac{2+\\sin x}{x}",
    f: (x) => (2 + Math.sin(x)) / x,
    gLatex: "\\frac{1}{x}",
    g: (x) => 1 / x,
    irany: "minorans",
    gKonv: false,
    jo: true,
    yMax: 3.2,
    indok: "sin x ≥ −1, tehát a számláló legalább 1: a tört legalább 1/x. A minoráns integrálja divergens (p = 1).",
    zaras: "Divergens — a sin x ingadozása nem számít, a számláló sosem megy 1 alá.",
  },
  {
    cimke: "(2+cos x)/x^(3/2)",
    fLatex: "\\frac{2+\\cos x}{x^{3/2}}",
    f: (x) => (2 + Math.cos(x)) / Math.pow(x, 1.5),
    gLatex: "\\frac{3}{x^{3/2}}",
    g: (x) => 3 / Math.pow(x, 1.5),
    irany: "majorans",
    gKonv: true,
    jo: true,
    yMax: 3.3,
    indok: "cos x ≤ 1, tehát a számláló legfeljebb 3. A majoráns integrálja 3·1/(3/2−1) = 6, konvergens.",
    zaras: "Konvergens — az értéke legfeljebb 6. A döntést a nevező kitevője hozza, nem a számláló hullámzása.",
  },
  {
    cimke: "rossz irány ①",
    fLatex: "\\frac{1}{x^2}",
    f: (x) => 1 / (x * x),
    gLatex: "\\frac{1}{x}",
    g: (x) => 1 / x,
    irany: "majorans",
    gKonv: false,
    jo: false,
    yMax: 1.15,
    indok: "Igaz, hogy 1/x² ≤ 1/x, és igaz, hogy ∫1/x divergens. De egy DIVERGENS majoráns semmit nem bizonyít!",
    zaras: "Ebből semmi nem következik. (Az 1/x² integrálja történetesen konvergens — épp az ellenkezője annak, amit a hibás következtetés adna.)",
  },
  {
    cimke: "rossz irány ②",
    fLatex: "\\frac{1}{\\sqrt{x}}",
    f: (x) => 1 / Math.sqrt(x),
    gLatex: "\\frac{1}{x^2}",
    g: (x) => 1 / (x * x),
    irany: "minorans",
    gKonv: true,
    jo: false,
    yMax: 1.15,
    indok: "Igaz, hogy 1/√x ≥ 1/x², és igaz, hogy ∫1/x² konvergens. De egy KONVERGENS minoráns semmit nem bizonyít!",
    zaras: "Ebből semmi nem következik. (Az 1/√x integrálja valójában divergens.)",
  },
];

export default function ImKriteriumFelfedezo() {
  const [i, setI] = useState(0);
  const [d, setD] = useState(6);
  const P = PELDAK[i];

  const If = simpson(P.f, 1, d, 400);
  const Ig = simpson(P.g, 1, d, 400);
  const majorans = P.irany === "majorans";

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={0.6}
            xMax={11.5}
            yMin={0}
            yMax={P.yMax}
            magassag={330}
            gorbek={[
              { fn: P.f, szin: TEAL, vastag: 2.8, tol: 0.7 },
              { fn: P.g, szin: majorans ? NAR : "#7c3aed", vastag: 2.2, szaggatott: true, tol: 0.7 },
            ]}
          >
            {(S) => {
              // a két görbe közötti sáv 1-től d-ig
              const db = 220;
              let felso = "";
              let also = "";
              for (let k = 0; k <= db; k++) {
                const x = 1 + ((d - 1) * k) / db;
                const yf = Math.min(P.f(x), P.yMax * 1.02);
                const yg = Math.min(P.g(x), P.yMax * 1.02);
                const felsoY = Math.max(yf, yg);
                const alsoY = Math.min(yf, yg);
                felso += `${k ? "L" : "M"}${S.px(x).toFixed(1)},${S.py(felsoY).toFixed(1)} `;
                also = `L${S.px(x).toFixed(1)},${S.py(alsoY).toFixed(1)} ${also}`;
              }
              // az f alatti terület
              let alattUt = `M${S.px(1).toFixed(1)},${S.py(0).toFixed(1)} `;
              for (let k = 0; k <= db; k++) {
                const x = 1 + ((d - 1) * k) / db;
                alattUt += `L${S.px(x).toFixed(1)},${S.py(Math.min(P.f(x), P.yMax * 1.02)).toFixed(1)} `;
              }
              alattUt += `L${S.px(d).toFixed(1)},${S.py(0).toFixed(1)} Z`;

              return (
                <g clipPath="url(#fv-vago)">
                  <path d={alattUt} fill={TEAL} fillOpacity="0.16" />
                  <path d={`${felso} ${also} Z`} fill={majorans ? NAR : "#7c3aed"} fillOpacity="0.14" />
                  <line x1={S.px(1)} y1={S.py(0)} x2={S.px(1)} y2={S.margo.fel} stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1={S.px(d)} y1={S.py(0)} x2={S.px(d)} y2={S.margo.fel} stroke={PIROS} strokeWidth="1.2" strokeDasharray="4 3" />
                  <text x={S.px(d) + 4} y={S.margo.fel + 13} fontSize="11.5" fontWeight="650" fill={PIROS}>
                    d
                  </text>
                  {/* jelmagyarázat a panel jobb felső sarkában */}
                  <rect
                    x={S.margo.bal + S.w - 158}
                    y={S.margo.fel + 8}
                    width={150}
                    height={44}
                    rx="7"
                    fill="white"
                    fillOpacity="0.88"
                    stroke="#e2e8f0"
                  />
                  <line
                    x1={S.margo.bal + S.w - 148}
                    y1={S.margo.fel + 22}
                    x2={S.margo.bal + S.w - 124}
                    y2={S.margo.fel + 22}
                    stroke={TEAL}
                    strokeWidth="2.8"
                  />
                  <text x={S.margo.bal + S.w - 118} y={S.margo.fel + 26} fontSize="11.5" fontWeight="650" fill={TEAL}>
                    f (a vizsgált)
                  </text>
                  <line
                    x1={S.margo.bal + S.w - 148}
                    y1={S.margo.fel + 40}
                    x2={S.margo.bal + S.w - 124}
                    y2={S.margo.fel + 40}
                    stroke={majorans ? NAR : "#7c3aed"}
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                  />
                  <text
                    x={S.margo.bal + S.w - 118}
                    y={S.margo.fel + 44}
                    fontSize="11.5"
                    fontWeight="650"
                    fill={majorans ? NAR : "#7c3aed"}
                  >
                    {majorans ? "g (majoráns)" : "h (minoráns)"}
                  </text>
                </g>
              );
            }}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Zöld: az <M>{"f"}</M> alatti terület. A színes sáv a két görbe közötti rész — ennyivel becsülünk felül vagy alul.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Példa</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PELDAK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => setI(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? k.jo
                      ? "bg-petrol-700 text-white"
                      : "bg-rose-600 text-white"
                    : k.jo
                      ? "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                      : "bg-white text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="szamok mt-4 text-[15px] text-petrol-900">
            <M>{`\\int_1^{\\infty} ${P.fLatex}\\,dx`}</M>
          </div>
          <div className="szamok mt-1 text-[14px] text-petrol-700">
            <M>{majorans ? `${P.fLatex} \\le ${P.gLatex}` : `${P.fLatex} \\ge ${P.gLatex}`}</M>
          </div>

          <div className="mt-4">
            <Csuszka cimke="Felső határ, d" ertek={d} min={2} max={20} lepes={0.5} tizedes={1} onChange={setD} />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-emerald-50 px-3 py-2">
              <p className="text-[11px] text-emerald-700">∫₁ᵈ f</p>
              <p className="szamok text-[15px] font-semibold text-petrol-900">{sz(If, 4)}</p>
            </div>
            <div className={`rounded-xl px-3 py-2 ${majorans ? "bg-naracs-50" : "bg-violet-50"}`}>
              <p className={`text-[11px] ${majorans ? "text-naracs-700" : "text-violet-700"}`}>
                ∫₁ᵈ {majorans ? "g" : "h"}
              </p>
              <p className="szamok text-[15px] font-semibold text-petrol-900">{sz(Ig, 4)}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl bg-petrol-50 px-4 py-3 text-[13px] text-petrol-700">
            <p>
              <strong>{majorans ? "Majoráns" : "Minoráns"}:</strong> a becslő függvény integrálja{" "}
              <strong className={P.gKonv ? "text-emerald-700" : "text-rose-700"}>
                {P.gKonv ? "konvergens" : "divergens"}
              </strong>
              .
            </p>
            <p className="mt-1.5">{P.indok}</p>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 ${
              P.jo ? "border-emerald-200 bg-emerald-50" : "border-rose-300 bg-rose-50"
            }`}
          >
            <p className={`text-[11px] font-bold tracking-[0.14em] uppercase ${P.jo ? "text-emerald-700" : "text-rose-700"}`}>
              {P.jo ? "Ebből következik" : "Ebből NEM következik semmi"}
            </p>
            <p className="mt-1 text-[13.5px] text-petrol-800">{P.zaras}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
