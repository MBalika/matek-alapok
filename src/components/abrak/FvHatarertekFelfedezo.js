"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

/**
 * ε–δ felfedező: a felhasználó szűkíti az ε sávot, a komponens pedig
 * numerikusan megkeresi a hozzá tartozó legnagyobb δ-t. Ha nincs ilyen δ,
 * az azt jelenti, hogy a feltételezett A nem határérték.
 */

const PELDAK = [
  {
    cimke: "(x²−1)/(x−1)",
    latex: "f(x) = \\dfrac{x^2-1}{x-1}",
    fn: (x) => (x * x - 1) / (x - 1),
    x0: 1,
    A: 2,
    van: true,
    xMin: -1,
    xMax: 3,
    yMin: -0.5,
    yMax: 4.5,
    lyuk: true,
    magyarazat:
      "A függvény az x = 1 helyen NINCS értelmezve (0/0), a határértéke mégis létezik: egyszerűsítés után f(x) = x + 1, ami 2-höz tart. Ez a lyuk a grafikonon.",
    levezetes: "\\frac{x^2-1}{x-1} = \\frac{(x-1)(x+1)}{x-1} = x+1 \\longrightarrow 2",
  },
  {
    cimke: "sin x / x",
    latex: "f(x) = \\dfrac{\\sin x}{x}",
    fn: (x) => Math.sin(x) / x,
    x0: 0,
    A: 1,
    van: true,
    xMin: -10,
    xMax: 10,
    yMin: -0.5,
    yMax: 1.4,
    lyuk: true,
    magyarazat:
      "Az 1. nevezetes határérték. A 0-ban nincs értelmezve, de a rendőrelv szerint cos x < sin x / x < 1, tehát a határérték 1.",
    levezetes: "\\cos x < \\frac{\\sin x}{x} < 1 \\ \\Longrightarrow\\ \\lim_{x\\to0}\\frac{\\sin x}{x} = 1",
  },
  {
    cimke: "(√(x+4)−2)/x",
    latex: "f(x) = \\dfrac{\\sqrt{x+4}-2}{x}",
    fn: (x) => (Math.sqrt(x + 4) - 2) / x,
    x0: 0,
    A: 0.25,
    van: true,
    xMin: -3.5,
    xMax: 6,
    yMin: 0.1,
    yMax: 0.6,
    lyuk: true,
    magyarazat:
      "A KF‑4 első feladata. Gyöktelenítés után f(x) = 1/(√(x+4)+2), ami a 0-ban már behelyettesíthető: 1/4.",
    levezetes:
      "\\frac{\\sqrt{x+4}-2}{x} = \\frac{(x+4)-4}{x\\left(\\sqrt{x+4}+2\\right)} = \\frac{1}{\\sqrt{x+4}+2} \\longrightarrow \\frac14",
  },
  {
    cimke: "sgn x",
    latex: "f(x) = \\operatorname{sgn} x",
    fn: (x) => Math.sign(x),
    x0: 0,
    A: 0,
    van: false,
    xMin: -3,
    xMax: 3,
    yMin: -2,
    yMax: 2,
    magyarazat:
      "A bal oldali határérték −1, a jobb oldali +1 — a kettő különbözik, tehát NINCS határérték. Bármilyen A-t is tippelünk, ε < 1 esetén nem található hozzá δ.",
    levezetes:
      "\\lim_{x\\to 0-0}\\operatorname{sgn} x = -1 \\ne 1 = \\lim_{x\\to 0+0}\\operatorname{sgn} x",
  },
  {
    cimke: "sin(1/x)",
    latex: "f(x) = \\sin\\dfrac1x",
    fn: (x) => Math.sin(1 / x),
    x0: 0,
    A: 0,
    van: false,
    xMin: -0.7,
    xMax: 0.7,
    yMin: -1.6,
    yMax: 1.6,
    magyarazat:
      "A 0 minden környezetében végtelen sokszor felveszi a 0-t és az 1-et is. Az átviteli elv szerint tehát nincs határérték: az xₙ = 1/(nπ) mentén 0, az xₙ′ = 1/(π/2+2nπ) mentén 1 a függvényérték.",
    levezetes:
      "x_n = \\frac{1}{n\\pi}\\Rightarrow f(x_n)=0,\\qquad x_n' = \\frac{1}{\\frac{\\pi}{2}+2n\\pi}\\Rightarrow f(x_n')=1",
  },
];

/** A legnagyobb olyan δ (≤ deltaMax), amelyre 0 < |x−x₀| < δ esetén |f(x)−A| < ε. */
function deltaKereses(fn, x0, A, eps, deltaMax) {
  const jo = (d) => {
    const db = 260;
    for (let i = 1; i < db; i++) {
      const u = (d * i) / db;
      for (const x of [x0 - u, x0 + u]) {
        let y;
        try {
          y = fn(x);
        } catch {
          y = NaN;
        }
        if (!Number.isFinite(y)) continue; // ahol nincs értelmezve, arról nem szól a feltétel
        if (!(Math.abs(y - A) < eps)) return false;
      }
    }
    return true;
  };
  if (jo(deltaMax)) return deltaMax;
  let also = 0;
  let felso = deltaMax;
  for (let k = 0; k < 40; k++) {
    const kozep = (also + felso) / 2;
    if (jo(kozep)) also = kozep;
    else felso = kozep;
  }
  return also;
}

export default function FvHatarertekFelfedezo() {
  const [i, setI] = useState(0);
  const [logEps, setLogEps] = useState(-0.4);
  const p = PELDAK[i];
  const eps = Math.round(Math.pow(10, logEps) * 1000) / 1000;

  const deltaMax = Math.min(p.x0 - p.xMin, p.xMax - p.x0) * 0.9;
  const delta = useMemo(
    () => deltaKereses(p.fn, p.x0, p.A, eps, deltaMax),
    [p, eps, deltaMax],
  );
  const vanDelta = delta > deltaMax / 2000;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={p.xMin}
            xMax={p.xMax}
            yMin={p.yMin}
            yMax={p.yMax}
            magassag={360}
            gorbek={[{ fn: p.fn, szin: "#0f766e", vastag: 2.6, db: 1400 }]}
            pontok={
              p.lyuk
                ? [{ x: p.x0, y: p.A, szin: "#0f766e", ures: true, r: 5 }]
                : []
            }
          >
            {(S) => {
              const yFent = S.py(Math.min(p.yMax, p.A + eps));
              const yLent = S.py(Math.max(p.yMin, p.A - eps));
              const xBal = S.px(Math.max(p.xMin, p.x0 - delta));
              const xJobb = S.px(Math.min(p.xMax, p.x0 + delta));
              return (
                <g>
                  {/* ε-sáv */}
                  <rect
                    x={S.margo.bal}
                    y={yFent}
                    width={S.w}
                    height={Math.max(1, yLent - yFent)}
                    fill="#e2590a"
                    opacity="0.13"
                  />
                  <line
                    x1={S.margo.bal}
                    y1={S.py(p.A)}
                    x2={S.margo.bal + S.w}
                    y2={S.py(p.A)}
                    stroke="#e2590a"
                    strokeWidth="1.8"
                    strokeDasharray="6 4"
                  />
                  {/* δ-sáv */}
                  {vanDelta && (
                    <rect
                      x={Math.min(xBal, xJobb)}
                      y={S.margo.fel}
                      width={Math.max(1, Math.abs(xJobb - xBal))}
                      height={S.h}
                      fill="#7c3aed"
                      opacity="0.11"
                    />
                  )}
                  <line
                    x1={S.px(p.x0)}
                    y1={S.margo.fel}
                    x2={S.px(p.x0)}
                    y2={S.margo.fel + S.h}
                    stroke="#7c3aed"
                    strokeWidth="1.5"
                    strokeDasharray="5 4"
                  />
                  <text
                    x={S.margo.bal + 6}
                    y={yFent - 5}
                    fontSize="11.5"
                    fontWeight="650"
                    style={{
                      fill: "#e2590a",
                      paintOrder: "stroke",
                      stroke: "white",
                      strokeWidth: 3.5,
                    }}
                  >
                    A + ε
                  </text>
                  <text
                    x={S.px(p.x0)}
                    y={S.margo.fel + S.h + 24}
                    fontSize="11.5"
                    fontWeight="650"
                    fill="#7c3aed"
                    textAnchor="middle"
                  >
                    x₀ = {sz(p.x0, 0)}
                  </text>
                  {!vanDelta && (
                    <text
                      x={S.margo.bal + S.w - 6}
                      y={S.margo.fel + 14}
                      fontSize="12.5"
                      fontWeight="700"
                      textAnchor="end"
                      style={{
                        fill: "#dc2626",
                        paintOrder: "stroke",
                        stroke: "white",
                        strokeWidth: 3.5,
                      }}
                    >
                      ehhez az ε-hoz NINCS jó δ
                    </text>
                  )}
                </g>
              );
            }}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Narancs: az ε-sáv A körül. Lila: a hozzá talált δ-sáv x₀ körül.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Függvény
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PELDAK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => setI(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : `bg-white ring-1 ring-petrol-200 hover:bg-petrol-50 ${
                        k.van ? "text-petrol-600" : "text-rose-600"
                      }`
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="szamok mt-4 text-[15px] text-petrol-900">
            <M>{p.latex}</M>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">
                A megkövetelt pontosság, ε
              </span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {sz(eps, 3)}
              </span>
            </span>
            <input
              type="range"
              min={-2}
              max={-0.15}
              step={0.01}
              value={logEps}
              onChange={(e) => setLogEps(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
            <span className="mt-1 block text-[11.5px] text-petrol-400">
              Húzd balra: a sáv szűkül, a δ vele együtt zsugorodik — de létezik.
            </span>
          </label>

          <div
            className={`mt-4 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${
              vanDelta
                ? "border-emerald-200 bg-emerald-50 text-emerald-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            {vanDelta ? (
              <>
                <span className="szamok font-semibold">
                  ε = {sz(eps, 3)} → δ ≈ {sz(delta, 4)}
                </span>
                <br />
                Ha <M>{`0 < |x - ${szK(p.x0, 0)}| < ${szK(delta, 4)}`}</M>, akkor{" "}
                <M>{`|f(x) - ${szK(p.A, 2)}| < ${szK(eps, 3)}`}</M>. Ez minden ε-ra megy — tehát a
                határérték létezik, és <M>{szK(p.A, 2)}</M>.
              </>
            ) : (
              <>
                <span className="font-semibold">Ehhez az ε-hoz nincs jó δ.</span> Akármilyen szűk
                függőleges sávot veszünk x₀ körül, mindig akad benne olyan x, amelyre a függvényérték
                kilóg az ε-sávból. Az <M>{"A"}</M> tehát <strong>nem</strong> határérték — és más{" "}
                <M>{"A"}</M> sem volna jó.
              </>
            )}
          </div>

          <div className="mt-3 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              A levezetés
            </p>
            <div className="szamok mt-1.5 text-[13.5px] text-petrol-900">
              <M>{p.levezetes}</M>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-600">{p.magyarazat}</p>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            A sorrend itt is kötött, akárcsak a sorozatoknál: <strong>előbb az ε</strong>, és csak
            utána keresünk hozzá δ-t. A <M>{"0 < |x-x_0|"}</M> feltétel pedig kizárja magát az{" "}
            <M>{"x_0"}</M>-t — ezért lehet határértéke ott is, ahol a függvény nincs értelmezve.
          </p>
        </div>
      </div>
    </div>
  );
}
