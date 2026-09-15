"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { metszespontok, simpson, teruletUt } from "./HoSzamol";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const PIROS = "#dc2626";

const PAROK = [
  {
    cimke: "x² és x+2",
    f: { fn: (x) => x * x, latex: "y=x^2", rajz: "x²", szin: TEAL },
    g: { fn: (x) => x + 2, latex: "y=x+2", rajz: "x+2", szin: LILA },
    felsoAlap: "g",
    x: [-2.4, 3.2],
    y: [-1.2, 5.2],
    integralLatex: "\\int_{-1}^{2}\\left(x+2-x^2\\right)dx",
    ertekLatex: "\\frac92 = 4{,}5",
    megjegyzes:
      "A jegyzet 16. példája. A metszéspontok x = −1 és x = 2, közöttük az egyenes a felső — behelyettesítéssel ellenőrizhető: x = 0-ban az egyenes 2, a parabola 0.",
  },
  {
    cimke: "x² − 4 és az x tengely",
    f: { fn: (x) => x * x - 4, latex: "y=x^2-4", rajz: "x²−4", szin: TEAL },
    g: { fn: () => 0, latex: "y=0", rajz: "x tengely", szin: LILA },
    felsoAlap: "g",
    x: [-3.4, 3.4],
    y: [-5, 3],
    integralLatex: "\\int_{-2}^{2}\\left(0-(x^2-4)\\right)dx",
    ertekLatex: "\\frac{32}{3}\\approx 10{,}67",
    megjegyzes:
      "A 15. példa. Itt a parabola a tengely ALATT van, tehát a „felső” görbe maga az x tengely. Ha fordítva számolsz, −32/3 jön ki: az előjeles integrál, nem a terület.",
  },
  {
    cimke: "x³ és x",
    f: { fn: (x) => x * x * x, latex: "y=x^3", rajz: "x³", szin: TEAL },
    g: { fn: (x) => x, latex: "y=x", rajz: "x", szin: LILA },
    felsoAlap: "g",
    x: [-1.6, 1.6],
    y: [-1.6, 1.6],
    integralLatex: "2\\int_{0}^{1}\\left(x-x^3\\right)dx",
    ertekLatex: "\\frac12",
    megjegyzes:
      "Három metszéspont: −1, 0, 1 — tehát KÉT tartomány van, és a felső–alsó szerep a 0-ban cserélődik. Egyben integrálva 0 jönne ki!",
  },
  {
    cimke: "sin x és cos x",
    f: { fn: Math.sin, latex: "y=\\sin x", rajz: "sin x", szin: TEAL },
    g: { fn: Math.cos, latex: "y=\\cos x", rajz: "cos x", szin: LILA },
    felsoAlap: "f",
    x: [-0.4, 4.6],
    y: [-1.4, 1.4],
    integralLatex: "\\int_{\\pi/4}^{5\\pi/4}\\left(\\sin x-\\cos x\\right)dx",
    ertekLatex: "2\\sqrt2\\approx 2{,}828",
    megjegyzes:
      "A metszéspontok π/4 ≈ 0,785 és 5π/4 ≈ 3,927. Közöttük a szinusz a felső, a különbségük integrálja 2√2 ≈ 2,828 — szép példa arra, hogy a metszéspontokat előbb meg kell keresni.",
  },
];

export default function HoTeruletFelfedezo() {
  const [i, setI] = useState(0);
  const [csere, setCsere] = useState(false);
  const P = PAROK[i];

  const m = metszespontok(P.f.fn, P.g.fn, P.x[0], P.x[1]);
  const darabok = [];
  for (let k = 0; k + 1 < m.length; k++) darabok.push([m[k], m[k + 1]]);
  if (darabok.length === 0 && m.length === 1) darabok.push([m[0], P.x[1] - 0.05]);

  const alapFelso = P.felsoAlap === "f" ? P.f : P.g;
  const alapAlso = P.felsoAlap === "f" ? P.g : P.f;
  const felsoAdat = csere ? alapAlso : alapFelso;
  const alsoAdat = csere ? alapFelso : alapAlso;
  const felso = felsoAdat.fn;
  const also = alsoAdat.fn;

  // minden darabon a helyes (pozitív) terület, és az éppen felírt integrál értéke
  let helyes = 0;
  let felirt = 0;
  darabok.forEach(([a, b]) => {
    const v = simpson((x) => felso(x) - also(x), a, b, 600);
    felirt += v;
    helyes += Math.abs(v);
  });
  const negativ = felirt < -1e-6;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={P.x[0]}
            xMax={P.x[1]}
            yMin={P.y[0]}
            yMax={P.y[1]}
            gorbek={[
              { fn: P.f.fn, szin: P.f.szin, vastag: 2.6, cimke: P.f.rajz },
              {
                fn: P.g.fn,
                szin: P.g.szin,
                vastag: 2.6,
                cimke: P.g.rajz,
                cimkeX: P.x[0] + (P.x[1] - P.x[0]) * 0.18,
              },
            ]}
            pontok={m.map((x) => ({ x, y: P.f.fn(x), szin: NAR, r: 5 }))}
            className="abra w-full select-none"
          >
            {(S) => (
              <g>
                {darabok.map(([a, b], k) => {
                  const v = simpson((x) => felso(x) - also(x), a, b, 400);
                  return (
                    <path
                      key={k}
                      d={teruletUt(S, also, felso, a, b)}
                      fill={v >= 0 ? NAR : PIROS}
                      fillOpacity={v >= 0 ? 0.2 : 0.3}
                      stroke={v >= 0 ? NAR : PIROS}
                      strokeWidth="1"
                      strokeDasharray={v >= 0 ? undefined : "5 4"}
                    />
                  );
                })}
                {/* néhány függőleges sáv, ami a „felső − alsó” magasságot mutatja */}
                {darabok.map(([a, b], k) =>
                  [0.3, 0.55, 0.8].map((u, j) => {
                    const x = a + (b - a) * u;
                    return (
                      <line
                        key={`${k}-${j}`}
                        x1={S.px(x)}
                        y1={S.py(Math.max(S.yMin, Math.min(S.yMax, also(x))))}
                        x2={S.px(x)}
                        y2={S.py(Math.max(S.yMin, Math.min(S.yMax, felso(x))))}
                        stroke="#475569"
                        strokeWidth="1.1"
                        strokeDasharray="3 3"
                      />
                    );
                  }),
                )}
                {m.map((x, k) => (
                  <text
                    key={k}
                    x={S.px(x)}
                    y={S.py(P.f.fn(x)) - 11}
                    fontSize="11.5"
                    fontWeight="700"
                    textAnchor="middle"
                    style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    {sz(x, 2)}
                  </text>
                ))}
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            {negativ
              ? "Piros szaggatott: itt az „alsó mínusz felső” szerepel az integrálban — negatív területet kapunk."
              : "A szaggatott függőleges vonalak a sáv magasságát mutatják: felső mínusz alsó."}
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Görbepár</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PAROK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => {
                  setI(j);
                  setCsere(false);
                }}
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

          <button
            type="button"
            onClick={() => setCsere((v) => !v)}
            className={`mt-3 rounded-lg px-3 py-1.5 text-[12.5px] font-semibold ring-1 transition ${
              csere
                ? "bg-rose-600 text-white ring-rose-600"
                : "bg-white text-rose-700 ring-rose-200 hover:bg-rose-50"
            }`}
          >
            {csere ? "Vissza a helyes sorrendre" : "Ki a felső? — cseréld meg!"}
          </button>

          <div className="szamok mt-4 space-y-1.5 rounded-xl bg-petrol-50 p-4 text-[13.5px] text-petrol-800">
            <div>
              <span style={{ color: P.f.szin }}>
                <M>{P.f.latex}</M>
              </span>
            </div>
            <div>
              <span style={{ color: P.g.szin }}>
                <M>{P.g.latex}</M>
              </span>
            </div>
            <div className="border-t border-petrol-200 pt-1.5">
              Metszéspontok:{" "}
              <strong>{m.length ? m.map((x) => sz(x, 3)).join(" · ") : "nincs a képen"}</strong>
            </div>
            <div>
              Tartományok száma: <strong>{darabok.length}</strong>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border p-4 ${
              negativ ? "border-rose-200 bg-rose-50" : "border-naracs-200 bg-naracs-50"
            }`}
          >
            <p
              className={`text-[10.5px] font-bold tracking-[0.16em] uppercase ${
                negativ ? "text-rose-700" : "text-naracs-700"
              }`}
            >
              A felírt integrál
            </p>
            <div className="szamok finom-gorgeto mt-1.5 overflow-x-auto text-[13.5px] text-petrol-900">
              <M>{`\\int \\left(${felsoAdat.latex.replace("y=", "")} - \\left(${alsoAdat.latex.replace(
                "y=",
                "",
              )}\\right)\\right)dx = ${szK(felirt, 4)}`}</M>
            </div>
            <p className="mt-1.5 text-[12.5px] text-petrol-800">
              {negativ ? (
                <>
                  <strong>Negatív „terület”</strong> — ez lehetetlen. A sorrend fordított: mindig{" "}
                  <strong>felső mínusz alsó</strong>. A helyes érték {sz(helyes, 4)}.
                </>
              ) : (
                <>
                  A valódi terület: <strong>{sz(helyes, 4)}</strong>
                  {darabok.length > 1
                    ? " — a szakaszonként vett abszolút értékek összege, mert a felső–alsó szerep közben cserélődik."
                    : "."}
                </>
              )}
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-petrol-200 bg-white p-4 text-[13px] text-petrol-700">
            <p className="text-[11px] font-semibold tracking-[0.12em] text-petrol-500 uppercase">
              Pontos érték
            </p>
            <div className="szamok finom-gorgeto mt-1 overflow-x-auto">
              <M>{`${P.integralLatex} = ${P.ertekLatex}`}</M>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{P.megjegyzes}</p>
        </div>
      </div>
    </div>
  );
}
