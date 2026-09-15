"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz, { fvSkala } from "./FvRajz";
import { teruletUt } from "./HoSzamol";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#64748b";

/* A pontos primitív függvényt képlettel adjuk meg: így az F(x) görbe hibátlan. */
const FVEK = [
  {
    cimke: "sin x",
    fLatex: "f(t)=\\sin t",
    FLatex: "T(x)=\\int_0^x \\sin t\\,dt = 1-\\cos x",
    fn: Math.sin,
    F: (x) => 1 - Math.cos(x),
    a: 0,
    x: [-0.4, 6.6],
    yF: [-1.3, 1.3],
    yT: [-0.3, 2.4],
    megjegyzes:
      "π-nél T(π) = 2 — ez a jegyzet 5. példája. π után f negatív, ezért T csökkenni kezd: a terület „fogy”.",
  },
  {
    cimke: "x²",
    fLatex: "f(t)=t^2",
    FLatex: "T(x)=\\int_0^x t^2\\,dt = \\frac{x^3}{3}",
    fn: (x) => x * x,
    F: (x) => (x * x * x) / 3,
    a: 0,
    x: [-0.3, 3.2],
    yF: [-0.5, 9.5],
    yT: [-0.5, 9.5],
    megjegyzes:
      "T(1) = 1/3 — pontosan az, amit a 2. fejezetben alsó és felső összegekkel küzdöttünk ki. T meredeksége x²: a 3-ban már 9, ezért olyan meredek a görbe vége.",
  },
  {
    cimke: "1/t",
    fLatex: "f(t)=\\frac1t",
    FLatex: "T(x)=\\int_1^x \\frac{dt}{t} = \\ln x",
    fn: (x) => (x > 0 ? 1 / x : NaN),
    F: (x) => (x > 0 ? Math.log(x) : NaN),
    a: 1,
    x: [0.05, 5.4],
    yF: [-0.2, 3.2],
    yT: [-1.2, 2],
    megjegyzes:
      "Itt az integrálfüggvény maga a természetes logaritmus: ln 2 ≈ 0,693 az 1-től 2-ig gyűlő terület (6. példa). Ez a logaritmus „terület-definíciója”.",
  },
  {
    cimke: "x − 1",
    fLatex: "f(t)=t-1",
    FLatex: "T(x)=\\int_0^x (t-1)\\,dt = \\frac{x^2}{2}-x",
    fn: (x) => x - 1,
    F: (x) => (x * x) / 2 - x,
    a: 0,
    x: [-0.4, 3.4],
    yF: [-1.6, 2.5],
    yT: [-1, 1.4],
    megjegyzes:
      "Előjeles terület! A 0 és 1 között f negatív, tehát T csökken, és 1-nél éri el a minimumát — ott T′ = f = 0. Utána f pozitív, T nő. A „T′ = f” tétel itt a legszemléletesebb.",
  },
];

export default function HoIntegralfuggveny() {
  const [i, setI] = useState(0);
  const [x, setX] = useState(2);
  const svgRef = useRef(null);
  const huzas = useRef(false);
  const F = FVEK[i];

  const valt = (j) => {
    setI(j);
    setX(FVEK[j].a + (FVEK[j].x[1] - FVEK[j].a) * 0.5);
  };

  const S = fvSkala({ xMin: F.x[0], xMax: F.x[1], yMin: F.yF[0], yMax: F.yF[1], magassag: 230 });

  const pozicio = useCallback(
    (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 560;
      const uj = Math.max(F.x[0] + 0.12, Math.min(F.x[1] - 0.05, S.xBol(mx)));
      setX(Math.round(uj * 50) / 50);
    },
    [F, S],
  );

  useEffect(() => {
    const mozgas = (e) => {
      if (huzas.current) pozicio(e);
    };
    const vege = () => {
      huzas.current = false;
    };
    window.addEventListener("pointermove", mozgas);
    window.addEventListener("pointerup", vege);
    return () => {
      window.removeEventListener("pointermove", mozgas);
      window.removeEventListener("pointerup", vege);
    };
  }, [pozicio]);

  const fx = F.fn(x);
  const Tx = F.F(x) - F.F(F.a);
  const balOldal = Math.min(F.a, x);
  const jobbOldal = Math.max(F.a, x);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          {/* fent: f és a felhalmozott terület */}
          <FvRajz
            svgRef={svgRef}
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.yF[0]}
            yMax={F.yF[1]}
            magassag={230}
            gorbek={[{ fn: F.fn, szin: TEAL, vastag: 2.6 }]}
            tengelyCimkek={{ x: "t", y: "f" }}
            className="abra w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              huzas.current = true;
              pozicio(e);
            }}
          >
            {(Sk) => (
              <g>
                <path
                  d={teruletUt(Sk, () => 0, F.fn, balOldal, jobbOldal)}
                  fill={NAR}
                  fillOpacity="0.2"
                  stroke="none"
                />
                <line
                  x1={Sk.px(x)}
                  y1={Sk.margo.fel}
                  x2={Sk.px(x)}
                  y2={Sk.margo.fel + Sk.h}
                  stroke={LILA}
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                <circle cx={Sk.px(x)} cy={Sk.py(fx)} r="5.5" fill={LILA} stroke="white" strokeWidth="1.6" />
                <text
                  x={Sk.px(x) + 8}
                  y={Sk.py(fx) - 8}
                  fontSize="12"
                  fontWeight="650"
                  style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  f(x) = {sz(fx, 3)}
                </text>
                <text
                  x={Sk.px((balOldal + jobbOldal) / 2)}
                  y={Sk.py(0) + (Tx >= 0 ? -10 : 16)}
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  T(x) = {sz(Tx, 3)}
                </text>
              </g>
            )}
          </FvRajz>

          {/* lent: az integrálfüggvény */}
          <FvRajz
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.yT[0]}
            yMax={F.yT[1]}
            magassag={230}
            gorbek={[
              {
                fn: (v) => F.F(v) - F.F(F.a),
                szin: NAR,
                vastag: 2.8,
                tol: F.x[0],
                ig: x,
              },
              {
                fn: (v) => F.F(v) - F.F(F.a),
                szin: SZURKE,
                vastag: 1.4,
                szaggatott: true,
                opacitas: 0.6,
              },
            ]}
            tengelyCimkek={{ x: "x", y: "T" }}
            className="abra w-full select-none"
          >
            {(Sk) => (
              <g>
                <line
                  x1={Sk.px(x)}
                  y1={Sk.margo.fel}
                  x2={Sk.px(x)}
                  y2={Sk.margo.fel + Sk.h}
                  stroke={LILA}
                  strokeWidth="1.6"
                  strokeDasharray="5 4"
                />
                {/* az érintő meredeksége itt épp f(x) */}
                {Number.isFinite(fx) && (
                  <line
                    x1={Sk.px(x - 0.55)}
                    y1={Sk.py(Tx - 0.55 * fx)}
                    x2={Sk.px(x + 0.55)}
                    y2={Sk.py(Tx + 0.55 * fx)}
                    stroke={TEAL}
                    strokeWidth="2.4"
                  />
                )}
                <circle cx={Sk.px(x)} cy={Sk.py(Tx)} r="5.5" fill={NAR} stroke="white" strokeWidth="1.6" />
                <text
                  x={Sk.px(x) + 9}
                  y={Sk.py(Tx) + 16}
                  fontSize="11.5"
                  fontWeight="650"
                  style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                >
                  meredekség = {sz(fx, 3)}
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a felső ábrán az x-et. Fent a felhalmozott (előjeles) terület, lent ugyanez számként — és a
            teal érintő meredeksége pontosan f(x).
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Függvény</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FVEK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => valt(j)}
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

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">A felső határ, x</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {sz(x, 2)}
              </span>
            </span>
            <input
              type="range"
              min={F.x[0] + 0.12}
              max={F.x[1] - 0.05}
              step={0.02}
              value={x}
              onChange={(e) => setX(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <div className="szamok mt-4 space-y-2 rounded-xl bg-petrol-50 p-4 text-[13.5px] text-petrol-800">
            <div>
              <M>{F.fLatex}</M>
            </div>
            <div className="finom-gorgeto overflow-x-auto">
              <M>{F.FLatex}</M>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
              <p className="text-[11px] text-naracs-700">T(x) — a felhalmozott terület</p>
              <p className="szamok text-[15px] font-semibold text-naracs-900">{sz(Tx, 4)}</p>
            </div>
            <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
              <p className="text-[11px] text-petrol-500">T ′(x) = f(x)</p>
              <p className="szamok text-[15px] font-semibold text-petrol-900">{sz(fx, 4)}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-[13px] leading-relaxed text-emerald-900">
            Ha <M>{"x"}</M>-et egy csöppet megnöveled, a terület egy <M>{"f(x)\\,\\Delta x"}</M> méretű csíkkal
            nő. Ezért a <strong>terület növekedési sebessége</strong> épp a görbe magassága:{" "}
            <M>{"T'(x)=f(x)"}</M>. Ez a Newton–Leibniz-tétel egész titka.
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{F.megjegyzes}</p>
        </div>
      </div>
    </div>
  );
}
