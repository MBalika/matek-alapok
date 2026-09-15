"use client";

import { useEffect, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

const fakt = (k) => {
  let p = 1;
  for (let i = 2; i <= k; i++) p *= i;
  return p;
};

const FVEK = [
  {
    cimke: "sin x",
    latex: "\\sin x",
    fn: Math.sin,
    egy: (k) => (k % 2 === 1 ? ((k - 1) / 2) % 2 === 0 ? 1 / fakt(k) : -1 / fakt(k) : 0),
    sor: "x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\frac{x^7}{7!}+\\dots",
    x: [-9.5, 9.5],
    y: [-2.6, 2.6],
    R: null,
    uzenet: "A szinusz sora az egész számegyenesen konvergens — csak egyre több tag kell, minél messzebb vagy a nullától.",
  },
  {
    cimke: "cos x",
    latex: "\\cos x",
    fn: Math.cos,
    egy: (k) => (k % 2 === 0 ? (k / 2) % 2 === 0 ? 1 / fakt(k) : -1 / fakt(k) : 0),
    sor: "1-\\frac{x^2}{2!}+\\frac{x^4}{4!}-\\frac{x^6}{6!}+\\dots",
    x: [-9.5, 9.5],
    y: [-2.6, 2.6],
    R: null,
    uzenet: "Csak páros hatványok szerepelnek — a koszinusz páros függvény, és ezt a Maclaurin-polinom örökli.",
  },
  {
    cimke: "eˣ",
    latex: "e^x",
    fn: Math.exp,
    egy: (k) => 1 / fakt(k),
    sor: "1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\dots",
    x: [-4, 3],
    y: [-3, 14],
    R: null,
    uzenet: "x = 1-nél a részletösszegek az e számhoz tartanak: T₅(1) = 163/60 ≈ 2,71667 (a hiba 0,0016).",
  },
  {
    cimke: "ln(1+x)",
    latex: "\\ln(1+x)",
    fn: (x) => (x > -1 ? Math.log(1 + x) : NaN),
    egy: (k) => (k === 0 ? 0 : (k % 2 === 1 ? 1 : -1) / k),
    sor: "x-\\frac{x^2}{2}+\\frac{x^3}{3}-\\frac{x^4}{4}+\\dots",
    x: [-1.6, 2.4],
    y: [-3, 2],
    R: 1,
    uzenet: "A konvergenciasugár 1: az x > 1 tartományban a polinomok elszállnak, hiába növeled a fokszámot.",
  },
  {
    cimke: "1/(1−x)",
    latex: "\\frac{1}{1-x}",
    fn: (x) => 1 / (1 - x),
    egy: () => 1,
    sor: "1+x+x^2+x^3+\\dots",
    x: [-2.4, 2.4],
    y: [-4, 7],
    R: 1,
    uzenet: "Ez a mértani sor. |x| < 1-en tökéletes, az 1-nél viszont pólus van — a sor ott menthetetlenül divergál.",
  },
  {
    cimke: "arctg x",
    latex: "\\operatorname{arctg} x",
    fn: Math.atan,
    egy: (k) => (k % 2 === 1 ? (((k - 1) / 2) % 2 === 0 ? 1 / k : -1 / k) : 0),
    sor: "x-\\frac{x^3}{3}+\\frac{x^5}{5}-\\frac{x^7}{7}+\\dots",
    x: [-2.4, 2.4],
    y: [-2.6, 2.6],
    R: 1,
    uzenet: "Szintén 1 a sugár, pedig az arctg mindenütt szép és korlátos — a konvergencia a komplex síkon dől el.",
  },
];

/** Az n-edrendű Maclaurin-polinom értéke Horner-módszerrel. */
function taylor(F, n, x) {
  let s = 0;
  for (let k = n; k >= 0; k--) s = s * x + F.egy(k);
  return s;
}

/** A polinom LaTeX-alakja (a nem nulla tagok). */
function polinomLatex(F, n) {
  const tagok = [];
  for (let k = 0; k <= n; k++) {
    const c = F.egy(k);
    if (Math.abs(c) < 1e-14) continue;
    const jel = c > 0 ? (tagok.length === 0 ? "" : "+") : "-";
    const abs = Math.abs(c);
    const hatv = k === 0 ? "" : k === 1 ? "x" : `x^{${k}}`;
    let szam;
    const nevezo = Math.round(1 / abs);
    if (Math.abs(abs * nevezo - 1) < 1e-9 && nevezo !== 1) szam = `\\frac{${hatv || "1"}}{${nevezo}}`;
    else if (Math.abs(abs - 1) < 1e-9) szam = hatv || "1";
    else szam = `${szK(abs, 4)}${hatv}`;
    tagok.push(`${jel}${szam}`);
  }
  return tagok.length === 0 ? "0" : tagok.join("");
}

export default function DerTaylorFelfedezo() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(3);
  const [epit, setEpit] = useState(false);
  const idozito = useRef(null);
  const F = FVEK[i];

  useEffect(() => {
    if (!epit) return undefined;
    idozito.current = setInterval(() => {
      setN((v) => {
        if (v >= 12) {
          setEpit(false);
          return 12;
        }
        return v + 1;
      });
    }, 620);
    return () => clearInterval(idozito.current);
  }, [epit]);

  const Tn = (x) => taylor(F, n, x);
  const hiba = (x) => {
    const e = F.fn(x) - Tn(x);
    return Number.isFinite(e) ? Math.abs(e) : NaN;
  };

  /* korábbi fokszámok halványan */
  const elozoek = [];
  for (let k = Math.max(0, n - 4); k < n; k++) {
    elozoek.push({
      fn: (x) => taylor(F, k, x),
      szin: LILA,
      vastag: 1.2,
      opacitas: 0.18 + 0.12 * (k - Math.max(0, n - 4)),
    });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y[0]}
            yMax={F.y[1]}
            gorbek={[
              ...elozoek,
              { fn: F.fn, szin: TEAL, cimke: F.cimke, vastag: 3 },
              { fn: Tn, szin: NAR, vastag: 2.4 },
            ]}
            pontok={[{ x: 0, y: F.fn(0), szin: "#1d3c48", r: 4 }]}
            fuggoleges={F.R ? [{ x: F.R, szin: "#dc2626" }, { x: -F.R, szin: "#dc2626" }] : []}
            className="abra w-full select-none"
          >
            {(S) => (
              <g>
                <text
                  x={524}
                  y={38}
                  textAnchor="end"
                  fontSize="12.5"
                  fontWeight="700"
                  style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  T{n}(x)
                </text>
                {F.R && (
                  <text
                    x={S.px(F.R) + 5}
                    y={S.margo.fel + 12}
                    fontSize="11"
                    fontWeight="700"
                    style={{ fill: "#dc2626", paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    R = 1
                  </text>
                )}
              </g>
            )}
          </FvRajz>

          <div className="mt-1">
            <p className="mb-0.5 text-[11px] font-bold tracking-[0.14em] text-rose-700 uppercase">
              A hiba nagysága: |f(x) − T{n}(x)|
            </p>
            <FvRajz
              xMin={F.x[0]}
              xMax={F.x[1]}
              yMin={0}
              yMax={1}
              magassag={150}
              gorbek={[{ fn: hiba, szin: "#dc2626", vastag: 2.2 }]}
              fuggoleges={F.R ? [{ x: F.R, szin: "#dc2626" }, { x: -F.R, szin: "#dc2626" }] : []}
              className="abra w-full select-none"
            />
          </div>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A nulla közelében a hiba szinte eltűnik; a fejlesztési ponttól távolodva gyorsan nő.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Függvény</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FVEK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => {
                  setI(j);
                  setEpit(false);
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

          <div className="szamok mt-3 text-[14px] text-petrol-700">
            <M>{`${F.latex} = ${F.sor}`}</M>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">A polinom fokszáma, n</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {n}
              </span>
            </span>
            <input
              type="range"
              min={0}
              max={12}
              step={1}
              value={n}
              onChange={(e) => {
                setEpit(false);
                setN(Number(e.target.value));
              }}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <button
            type="button"
            onClick={() => {
              if (epit) setEpit(false);
              else {
                setN(0);
                setEpit(true);
              }
            }}
            className="mt-3 rounded-lg bg-naracs-500 px-4 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600"
          >
            {epit ? "Állj" : "Építsd fel! ▶"}
          </button>

          <div className="mt-4 overflow-x-auto rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">A polinom</p>
            <div className="szamok finom-gorgeto mt-2 overflow-x-auto text-[13px] text-petrol-800">
              <M>{`T_{${n}}(x) = ${polinomLatex(F, n)}`}</M>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[12px]">
            {[0.5, 1, 2].map((p) => {
              const e = Math.abs(F.fn(p) - Tn(p));
              return (
                <div key={p} className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
                  <p className="text-petrol-500">hiba x = {sz(p, 1)}</p>
                  <p
                    className="szamok text-[13.5px] font-semibold"
                    style={{ color: Number.isFinite(e) ? (e < 0.01 ? "#15803d" : e < 0.5 ? "#e2590a" : "#dc2626") : "#94a3b8" }}
                  >
                    {Number.isFinite(e) ? (e < 1e-6 ? "< 10⁻⁶" : sz(e, e < 0.01 ? 6 : 4)) : "–"}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3 text-[13px] leading-relaxed text-naracs-900">
            <p>
              <strong>n = 1</strong> éppen az <strong>érintő</strong>: a Taylor-polinom az érintő általánosítása
              magasabb fokra. A <M>{"k"}</M>-adik együttható mindig{" "}
              <span className="szamok">
                <M>{"\\frac{f^{(k)}(0)}{k!}"}</M>
              </span>
              .
            </p>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{F.uzenet}</p>
        </div>
      </div>
    </div>
  );
}
