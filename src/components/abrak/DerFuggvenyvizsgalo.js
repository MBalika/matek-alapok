"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

const FVEK = [
  {
    cimke: "x/(x²+1)",
    f: "f(x) = \\dfrac{x}{x^2+1}",
    d1: "f'(x) = \\dfrac{1-x^2}{(x^2+1)^2}",
    d2: "f''(x) = \\dfrac{2x(x^2-3)}{(x^2+1)^3}",
    fn: (x) => x / (x * x + 1),
    der: (x) => (1 - x * x) / Math.pow(x * x + 1, 2),
    der2: (x) => (2 * x * (x * x - 3)) / Math.pow(x * x + 1, 3),
    x: [-5, 5],
    y: [-0.75, 0.75],
    y1: [-1.15, 1.25],
    y2: [-0.75, 0.75],
    vizszintes: [0],
    fuggoleges: [],
    ferde: null,
    dom: "\\mathbb{R}",
    paritas: "páratlan (origóra szimmetrikus)",
    hatar: "\\lim_{x\\to\\pm\\infty} f(x) = 0",
    ek: "-\\tfrac12 \\le y \\le \\tfrac12",
  },
  {
    cimke: "x³ − 3x",
    f: "f(x) = x^3-3x",
    d1: "f'(x) = 3x^2-3",
    d2: "f''(x) = 6x",
    fn: (x) => x * x * x - 3 * x,
    der: (x) => 3 * x * x - 3,
    der2: (x) => 6 * x,
    x: [-2.8, 2.8],
    y: [-4.5, 4.5],
    y1: [-4, 11],
    y2: [-13, 13],
    vizszintes: [],
    fuggoleges: [],
    ferde: null,
    dom: "\\mathbb{R}",
    paritas: "páratlan",
    hatar: "\\lim_{x\\to\\pm\\infty} f(x) = \\pm\\infty",
    ek: "\\mathbb{R}",
  },
  {
    cimke: "e^(−x²)",
    f: "f(x) = e^{-x^2}",
    d1: "f'(x) = -2x\\,e^{-x^2}",
    d2: "f''(x) = (4x^2-2)\\,e^{-x^2}",
    fn: (x) => Math.exp(-x * x),
    der: (x) => -2 * x * Math.exp(-x * x),
    der2: (x) => (4 * x * x - 2) * Math.exp(-x * x),
    x: [-3, 3],
    y: [-0.25, 1.25],
    y1: [-1.1, 1.1],
    y2: [-2.6, 2.6],
    vizszintes: [0],
    fuggoleges: [],
    ferde: null,
    dom: "\\mathbb{R}",
    paritas: "páros (y tengelyre szimmetrikus)",
    hatar: "\\lim_{x\\to\\pm\\infty} f(x) = 0",
    ek: "0 < y \\le 1",
  },
  {
    cimke: "x·e^(−x)",
    f: "f(x) = x\\,e^{-x}",
    d1: "f'(x) = (1-x)\\,e^{-x}",
    d2: "f''(x) = (x-2)\\,e^{-x}",
    fn: (x) => x * Math.exp(-x),
    der: (x) => (1 - x) * Math.exp(-x),
    der2: (x) => (x - 2) * Math.exp(-x),
    x: [-0.9, 5.5],
    tablaX: [-0.9, 5.5],
    y: [-2.4, 0.7],
    y1: [-2.6, 1.3],
    y2: [-1.3, 3],
    vizszintes: [0],
    fuggoleges: [],
    ferde: null,
    dom: "\\mathbb{R}",
    paritas: "nincs szimmetria",
    hatar: "\\lim_{x\\to+\\infty} f(x) = 0,\\quad \\lim_{x\\to-\\infty} f(x) = -\\infty",
    ek: "y \\le \\tfrac1e",
  },
  {
    cimke: "(x²+1)/x",
    f: "f(x) = \\dfrac{x^2+1}{x} = x + \\dfrac1x",
    d1: "f'(x) = 1-\\dfrac{1}{x^2}",
    d2: "f''(x) = \\dfrac{2}{x^3}",
    fn: (x) => x + 1 / x,
    der: (x) => 1 - 1 / (x * x),
    der2: (x) => 2 / (x * x * x),
    x: [-4.2, 4.2],
    tablaX: [-4.2, 4.2],
    y: [-6.5, 6.5],
    y1: [-4.5, 3],
    y2: [-6, 6],
    vizszintes: [],
    fuggoleges: [0],
    ferde: { m: 1, b: 0, latex: "y = x" },
    dom: "x \\ne 0",
    paritas: "páratlan",
    hatar: "\\lim_{x\\to0^{\\pm}} f(x) = \\pm\\infty",
    ek: "y \\le -2 \\ \\text{vagy}\\ y \\ge 2",
  },
  {
    cimke: "x·ln x",
    f: "f(x) = x\\ln x",
    d1: "f'(x) = \\ln x + 1",
    d2: "f''(x) = \\dfrac1x",
    fn: (x) => (x > 0 ? x * Math.log(x) : NaN),
    der: (x) => (x > 0 ? Math.log(x) + 1 : NaN),
    der2: (x) => (x > 0 ? 1 / x : NaN),
    x: [-0.3, 3.2],
    tablaX: [0.001, 3.2],
    y: [-0.8, 3.8],
    y1: [-3.2, 2.2],
    y2: [-0.6, 6],
    vizszintes: [],
    fuggoleges: [],
    ferde: null,
    dom: "x > 0",
    paritas: "nincs (csak pozitív x-re értelmes)",
    hatar: "\\lim_{x\\to0^+} x\\ln x = 0,\\quad \\lim_{x\\to\\infty} = +\\infty",
    ek: "y \\ge -\\tfrac1e",
  },
];

/** Egy függvény zérushelyei előjelváltás-kereséssel az [a;b] szakaszon. */
function zerushelyek(fn, a, b, kihagy = []) {
  const db = 1600;
  const ki = [];
  let elozoX = null;
  let elozoY = null;
  for (let i = 0; i <= db; i++) {
    const x = a + ((b - a) * i) / db;
    if (kihagy.some((k) => Math.abs(x - k) < (b - a) / db)) {
      elozoX = null;
      elozoY = null;
      continue;
    }
    const y = fn(x);
    if (!Number.isFinite(y)) {
      elozoX = null;
      elozoY = null;
      continue;
    }
    if (Math.abs(y) < 1e-12) {
      // pontosan eltalált gyök (pl. x = 0 szimmetrikus tartományon)
      if (ki.length === 0 || Math.abs(x - ki[ki.length - 1]) > (b - a) * 0.005) ki.push(x);
    } else if (elozoY !== null && elozoY * y < 0) {
      let lo = elozoX;
      let hi = x;
      let ylo = elozoY;
      for (let k = 0; k < 60; k++) {
        const kz = (lo + hi) / 2;
        const yk = fn(kz);
        if (ylo * yk <= 0) hi = kz;
        else {
          lo = kz;
          ylo = yk;
        }
      }
      const gyok = (lo + hi) / 2;
      if (ki.length === 0 || Math.abs(gyok - ki[ki.length - 1]) > (b - a) * 0.005) ki.push(gyok);
    }
    elozoX = x;
    elozoY = y;
  }
  return ki;
}

/** Előjeltáblázat sorai: [{ tol, ig, jel }]. */
function elojelTabla(fn, a, b, hatarok) {
  const pontok = [a, ...hatarok, b].sort((p, q) => p - q);
  const sorok = [];
  for (let i = 0; i < pontok.length - 1; i++) {
    const kozep = (pontok[i] + pontok[i + 1]) / 2;
    const y = fn(kozep);
    if (!Number.isFinite(y)) continue;
    sorok.push({ tol: pontok[i], ig: pontok[i + 1], jel: y > 0 ? 1 : -1 });
  }
  return sorok;
}

function Mini({ cim, szin, fn, xMin, xMax, yMin, yMax, pontok, fuggoleges, vizszintes, egyenesek }) {
  return (
    <div>
      <p className="mb-0.5 text-[11px] font-bold tracking-[0.14em] uppercase" style={{ color: szin }}>
        {cim}
      </p>
      <FvRajz
        xMin={xMin}
        xMax={xMax}
        yMin={yMin}
        yMax={yMax}
        magassag={172}
        gorbek={[{ fn, szin, vastag: 2.4 }]}
        pontok={pontok}
        fuggoleges={fuggoleges}
        vizszintes={vizszintes}
        egyenesek={egyenesek}
        className="abra w-full select-none"
      />
    </div>
  );
}

export default function DerFuggvenyvizsgalo() {
  const [i, setI] = useState(0);
  const F = FVEK[i];

  const { stac, infl, tabla1, tabla2 } = useMemo(() => {
    const kihagy = F.fuggoleges;
    const [tTol, tIg] = F.tablaX ?? F.x;
    const s = zerushelyek(F.der, tTol, tIg, kihagy);
    const inf = zerushelyek(F.der2, tTol, tIg, kihagy);
    return {
      stac: s,
      infl: inf,
      tabla1: elojelTabla(F.der, tTol, tIg, [...s, ...kihagy]),
      tabla2: elojelTabla(F.der2, tTol, tIg, [...inf, ...kihagy]),
    };
  }, [F]);

  const stacTipus = (x) => {
    const d2 = F.der2(x);
    if (!Number.isFinite(d2) || Math.abs(d2) < 1e-7) return "?";
    return d2 < 0 ? "maximum" : "minimum";
  };

  const fPontok = [
    ...stac.map((x) => ({ x, y: F.fn(x), szin: NAR, r: 5 })),
    ...infl.map((x) => ({ x, y: F.fn(x), szin: LILA, r: 4.5 })),
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="racs-vilagos space-y-1 border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <Mini
            cim="f — maga a függvény"
            szin={TEAL}
            fn={F.fn}
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y[0]}
            yMax={F.y[1]}
            pontok={fPontok}
            fuggoleges={F.fuggoleges.map((x) => ({ x, szin: "#dc2626" }))}
            vizszintes={F.vizszintes.map((y) => ({ y, szin: "#dc2626" }))}
            egyenesek={F.ferde ? [{ m: F.ferde.m, b: F.ferde.b, szin: "#dc2626", szaggatott: true, vastag: 1.4 }] : []}
          />
          <Mini
            cim="f ′ — a meredekség"
            szin={NAR}
            fn={F.der}
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y1[0]}
            yMax={F.y1[1]}
            pontok={stac.map((x) => ({ x, y: 0, szin: NAR, r: 5 }))}
            fuggoleges={F.fuggoleges.map((x) => ({ x, szin: "#dc2626" }))}
            vizszintes={[{ y: 0, szin: "#94a3b8", szaggatott: true }]}
            egyenesek={[]}
          />
          <Mini
            cim="f ″ — a görbület"
            szin={LILA}
            fn={F.der2}
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y2[0]}
            yMax={F.y2[1]}
            pontok={infl.map((x) => ({ x, y: 0, szin: LILA, r: 5 }))}
            fuggoleges={F.fuggoleges.map((x) => ({ x, szin: "#dc2626" }))}
            vizszintes={[{ y: 0, szin: "#94a3b8", szaggatott: true }]}
            egyenesek={[]}
          />
          <p className="pt-1 text-center text-[11.5px] text-petrol-400">
            A három kép egymás alatt: ahol f ′ metszi a tengelyt, ott f-nek vízszintes az érintője; ahol f ″ előjelet
            vált, ott f inflexiós.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Vizsgált függvény</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FVEK.map((k, j) => (
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

          <div className="szamok mt-3 space-y-1 text-[13.5px]">
            <div style={{ color: TEAL }}>
              <M>{F.f}</M>
            </div>
            <div style={{ color: NAR }}>
              <M>{F.d1}</M>
            </div>
            <div style={{ color: LILA }}>
              <M>{F.d2}</M>
            </div>
          </div>

          <div className="mt-4 space-y-1.5 text-[12.5px] text-petrol-700">
            <p>
              <span className="font-semibold text-petrol-900">Értelmezési tartomány:</span>{" "}
              <span className="szamok">
                <M>{F.dom}</M>
              </span>
            </p>
            <p>
              <span className="font-semibold text-petrol-900">Paritás:</span> {F.paritas}
            </p>
            <p>
              <span className="font-semibold text-petrol-900">Határértékek:</span>{" "}
              <span className="szamok">
                <M>{F.hatar}</M>
              </span>
            </p>
            <p>
              <span className="font-semibold text-petrol-900">Aszimptoták:</span>{" "}
              {F.vizszintes.length > 0 && <span className="szamok">y = {sz(F.vizszintes[0], 0)} (vízszintes)</span>}
              {F.fuggoleges.length > 0 && (
                <span className="szamok">
                  {F.vizszintes.length > 0 ? " · " : ""}x = {sz(F.fuggoleges[0], 0)} (függőleges)
                </span>
              )}
              {F.ferde && <span className="szamok"> · {F.ferde.latex} (ferde)</span>}
              {F.vizszintes.length === 0 && F.fuggoleges.length === 0 && !F.ferde && "nincs"}
            </p>
            <p>
              <span className="font-semibold text-petrol-900">Értékkészlet:</span>{" "}
              <span className="szamok">
                <M>{F.ek}</M>
              </span>
            </p>
          </div>

          {/* f' előjeltáblázat */}
          <div className="mt-4 overflow-hidden rounded-xl border border-naracs-200">
            <div className="bg-naracs-50 px-3 py-1.5 text-[10.5px] font-bold tracking-[0.14em] text-naracs-800 uppercase">
              f ′ előjele — monotonitás
            </div>
            <table className="w-full text-[12.5px]">
              <tbody>
                {tabla1.map((s, j) => (
                  <tr key={j} className="border-t border-naracs-100">
                    <td className="szamok px-3 py-1.5 text-petrol-700">
                      {sz(s.tol, 2)} … {sz(s.ig, 2)}
                    </td>
                    <td className="px-2 py-1.5 text-center font-bold" style={{ color: s.jel > 0 ? "#15803d" : "#dc2626" }}>
                      {s.jel > 0 ? "+" : "−"}
                    </td>
                    <td className="px-3 py-1.5 text-petrol-800">{s.jel > 0 ? "szigorúan nő" : "szigorúan csökken"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* f'' előjeltáblázat */}
          <div className="mt-3 overflow-hidden rounded-xl border border-violet-200">
            <div className="bg-violet-50 px-3 py-1.5 text-[10.5px] font-bold tracking-[0.14em] text-violet-800 uppercase">
              f ″ előjele — konvexitás
            </div>
            <table className="w-full text-[12.5px]">
              <tbody>
                {tabla2.map((s, j) => (
                  <tr key={j} className="border-t border-violet-100">
                    <td className="szamok px-3 py-1.5 text-petrol-700">
                      {sz(s.tol, 2)} … {sz(s.ig, 2)}
                    </td>
                    <td className="px-2 py-1.5 text-center font-bold" style={{ color: s.jel > 0 ? "#15803d" : "#dc2626" }}>
                      {s.jel > 0 ? "+" : "−"}
                    </td>
                    <td className="px-3 py-1.5 text-petrol-800">{s.jel > 0 ? "konvex" : "konkáv"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 rounded-xl border border-petrol-200 bg-petrol-50 px-4 py-3 text-[13px] text-petrol-800">
            <p className="font-semibold text-petrol-900">Nevezetes pontok</p>
            {stac.length === 0 && infl.length === 0 && <p className="mt-1">Nincs stacionárius és inflexiós pont.</p>}
            {stac.map((x) => (
              <p key={`s${x}`} className="szamok mt-1">
                <span style={{ color: NAR }}>●</span> Lokális {stacTipus(x)}: ({sz(x, 3)}; {sz(F.fn(x), 3)})
              </p>
            ))}
            {infl.map((x) => (
              <p key={`i${x}`} className="szamok mt-1">
                <span style={{ color: LILA }}>●</span> Inflexió: ({sz(x, 3)}; {sz(F.fn(x), 3)})
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
