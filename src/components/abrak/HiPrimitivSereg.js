"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz, { fvSkala } from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const SZURKE = "#94a3b8";

/* A négy bemutatott pár: f és egy primitív függvénye. */
const PAROK = [
  {
    cimke: "x² − 1",
    fLatex: "f(x) = x^2-1",
    FLatex: "F(x) = \\frac{x^3}{3}-x+C",
    f: (x) => x * x - 1,
    F: (x) => (x * x * x) / 3 - x,
    x: [-2.6, 2.6],
    y: [-3.4, 3.4],
    x0: 1,
    megjegyzes:
      "Ahol f negatív (−1 és 1 között), ott minden F csökken; ahol f nulla, ott minden F-nek vízszintes az érintője.",
  },
  {
    cimke: "cos x",
    fLatex: "f(x) = \\cos x",
    FLatex: "F(x) = \\sin x + C",
    f: Math.cos,
    F: Math.sin,
    x: [-6.4, 6.4],
    y: [-3.4, 3.4],
    x0: 0.6,
    megjegyzes:
      "A koszinusz zérushelyein (±π/2, ±3π/2) van a szinuszgörbék csúcsa — a sereg minden tagjának ugyanott.",
  },
  {
    cimke: "2x",
    fLatex: "f(x) = 2x",
    FLatex: "F(x) = x^2 + C",
    f: (x) => 2 * x,
    F: (x) => x * x,
    x: [-2.6, 2.6],
    y: [-3.4, 3.4],
    x0: 0.8,
    megjegyzes:
      "Egybevágó parabolák, csak függőlegesen eltolva. A 0-ban mindegyiknek vízszintes az érintője, hiszen f(0) = 0.",
  },
  {
    cimke: "1/x",
    fLatex: "f(x) = \\frac1x \\quad (x>0)",
    FLatex: "F(x) = \\ln x + C",
    f: (x) => (x > 0 ? 1 / x : NaN),
    F: (x) => (x > 0 ? Math.log(x) : NaN),
    x: [-0.3, 5.2],
    y: [-3.4, 3.4],
    x0: 1,
    megjegyzes:
      "Csak a pozitív ágat rajzoltuk. A negatív ágon a konstans ettől függetlenül választható — ezért írunk ln|x|-et.",
  },
];

/* A megrajzolt sereg konstansai. */
const KONSTANSOK = [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2];

export default function HiPrimitivSereg() {
  const [i, setI] = useState(0);
  const [C, setC] = useState(0);
  const [x0, setX0] = useState(PAROK[0].x0);
  const [erintok, setErintok] = useState(true);
  const svgRef = useRef(null);
  const huzasRef = useRef(false);

  const P = PAROK[i];
  const S = fvSkala({ xMin: P.x[0], xMax: P.x[1], yMin: P.y[0], yMax: P.y[1] });

  const valt = (j) => {
    setI(j);
    setX0(PAROK[j].x0);
    setC(0);
  };

  const pozicio = useCallback(
    (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 560;
      const uj = Math.max(P.x[0] + 0.15, Math.min(P.x[1] - 0.15, S.xBol(mx)));
      setX0(Math.round(uj * 20) / 20);
    },
    [P, S],
  );

  useEffect(() => {
    const mozgas = (e) => {
      if (huzasRef.current) pozicio(e);
    };
    const vege = () => {
      huzasRef.current = false;
    };
    window.addEventListener("pointermove", mozgas);
    window.addEventListener("pointerup", vege);
    return () => {
      window.removeEventListener("pointermove", mozgas);
      window.removeEventListener("pointerup", vege);
    };
  }, [pozicio]);

  const m = P.f(x0);
  const FKiemelt = P.F(x0) + C;
  const ervenyes = Number.isFinite(m) && Number.isFinite(FKiemelt);

  const gorbek = [
    { fn: (x) => P.f(x), szin: TEAL, vastag: 2.6, szaggatott: true, cimke: "f" },
    ...KONSTANSOK.filter((c) => Math.abs(c - C) > 1e-9).map((c) => ({
      fn: (x) => P.F(x) + c,
      szin: SZURKE,
      vastag: 1.4,
      opacitas: 0.75,
    })),
    { fn: (x) => P.F(x) + C, szin: NAR, vastag: 3 },
  ];

  /* Az érintőszakaszok fél hossza adatban mérve. */
  const fel = (P.x[1] - P.x[0]) * 0.11;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            svgRef={svgRef}
            xMin={P.x[0]}
            xMax={P.x[1]}
            yMin={P.y[0]}
            yMax={P.y[1]}
            gorbek={gorbek}
            pontok={ervenyes ? [{ x: x0, y: FKiemelt, szin: NAR, r: 5 }] : []}
            className="abra w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              huzasRef.current = true;
              pozicio(e);
            }}
          >
            {(Sk) => (
              <g>
                {/* az x₀ helyén függőleges vonal */}
                {ervenyes && (
                  <line
                    x1={Sk.px(x0)}
                    y1={Sk.margo.fel}
                    x2={Sk.px(x0)}
                    y2={Sk.margo.fel + Sk.h}
                    stroke="#cbd5e1"
                    strokeWidth="1.1"
                    strokeDasharray="4 3"
                  />
                )}
                {/* párhuzamos érintőszakaszok a sereg minden tagján */}
                {erintok &&
                  ervenyes &&
                  KONSTANSOK.map((c) => {
                    const y = P.F(x0) + c;
                    if (!Number.isFinite(y)) return null;
                    const y1 = y - m * fel;
                    const y2 = y + m * fel;
                    if (y1 < P.y[0] - 1 || y2 > P.y[1] + 1) return null;
                    const kiemelt = Math.abs(c - C) < 1e-9;
                    return (
                      <line
                        key={`e${c}`}
                        x1={Sk.px(x0 - fel)}
                        y1={Sk.py(y1)}
                        x2={Sk.px(x0 + fel)}
                        y2={Sk.py(y2)}
                        stroke={kiemelt ? NAR : "#7c3aed"}
                        strokeWidth={kiemelt ? 2.6 : 1.6}
                        opacity={kiemelt ? 1 : 0.65}
                        strokeLinecap="round"
                      />
                    );
                  })}
                {/* f(x₀) leolvasása */}
                {ervenyes && (
                  <>
                    <circle cx={Sk.px(x0)} cy={Sk.py(m)} r="4" fill={TEAL} stroke="white" strokeWidth="1.4" />
                    <text
                      x={Sk.px(x0) + 9}
                      y={Sk.py(m) + 14}
                      fontSize="12"
                      fontWeight="650"
                      style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      f(x₀) = {sz(m, 2)}
                    </text>
                  </>
                )}
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd az egeret a képen: az x₀ hely mozog. Szaggatott teal: f. Szürke és narancs: a primitív függvények
            serege.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Az integrandus</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PAROK.map((p, j) => (
              <button
                key={p.cimke}
                type="button"
                onClick={() => valt(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {p.cimke}
              </button>
            ))}
          </div>

          <div className="szamok mt-3 space-y-1 text-[14px] text-petrol-900">
            <M>{P.fLatex}</M>
            <div className="text-naracs-700">
              <M>{P.FLatex}</M>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka
              cimke="Az integrációs konstans, C"
              ertek={C}
              min={-2}
              max={2}
              lepes={0.5}
              tizedes={1}
              onChange={setC}
            />
            <Csuszka
              cimke="A leolvasás helye, x₀"
              ertek={x0}
              min={P.x[0] + 0.15}
              max={P.x[1] - 0.15}
              lepes={0.05}
              tizedes={2}
              onChange={setX0}
            />
          </div>

          <button
            type="button"
            onClick={() => setErintok((v) => !v)}
            className={`mt-3 rounded-lg px-2.5 py-1.5 text-[12px] font-medium ring-1 transition ${
              erintok
                ? "bg-violet-600 text-white ring-violet-600"
                : "bg-white text-violet-700 ring-violet-200 hover:bg-violet-50"
            }`}
          >
            {erintok ? "Érintők elrejtése" : "Érintők megmutatása"}
          </button>

          {ervenyes ? (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
              <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">A leolvasás</p>
              <div className="szamok mt-1.5 space-y-1 text-[13.5px] text-emerald-900">
                <div>
                  <M>{`f(${szK(x0, 2)}) = ${szK(m, 3)}`}</M>
                </div>
                <div>
                  <M>{`F'(${szK(x0, 2)}) = ${szK(m, 3)} \\quad \\text{(minden C esetén!)}`}</M>
                </div>
                <div className="text-emerald-800">
                  <M>{`F(${szK(x0, 2)}) = ${szK(FKiemelt, 3)}`}</M>
                </div>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-emerald-900">
                A <strong>C</strong> csúszkát tolva a görbe fel-le mozog, az érintő meredeksége viszont{" "}
                <strong>nem változik</strong>: a sereg minden tagjának ugyanaz a deriváltja, éppen{" "}
                <span className="szamok">f(x₀)</span>.
              </p>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-900">
              Ezen a helyen a függvény nincs értelmezve — húzd az x₀-t az értelmezési tartományba.
            </p>
          )}

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{P.megjegyzes}</p>
        </div>
      </div>
    </div>
  );
}
