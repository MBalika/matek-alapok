"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const LILA = "#7c3aed";
const NAR = "#e2590a";

const GORBEK = [
  {
    cimke: "ch x (láncgörbe)",
    latex: "y=\\operatorname{ch} x",
    fn: Math.cosh,
    a: -Math.log(3),
    b: Math.log(3),
    aLatex: "-\\ln 3",
    bLatex: "\\ln 3",
    x: [-1.6, 1.6],
    y: [-0.3, 2.4],
    pontos: 8 / 3,
    pontosLatex: "\\frac83 \\approx 2{,}667",
    megjegyzes:
      "A 22. példa: 1 + sh²x = ch²x miatt a gyök eltűnik, és az ívhossz 2·sh(ln 3) = 8/3. A láncgörbe a szabadon lógó kábel alakja.",
  },
  {
    cimke: "x² (parabolaív)",
    latex: "y=x^2",
    fn: (x) => x * x,
    a: 0,
    b: 1,
    aLatex: "0",
    bLatex: "1",
    x: [-0.2, 1.25],
    y: [-0.15, 1.2],
    pontos: (2 * Math.sqrt(5) + Math.log(2 + Math.sqrt(5))) / 4,
    pontosLatex: "\\frac14\\left(2\\sqrt5+\\ln\\left(2+\\sqrt5\\right)\\right)\\approx 1{,}4789",
    megjegyzes:
      "A 23. példa. Józansági próba: a végpontokat összekötő húr √2 ≈ 1,414 hosszú, az ívnek ennél kicsivel hosszabbnak kell lennie — és 1,4789 valóban az.",
  },
  {
    cimke: "⅔·x·√x",
    latex: "y=\\frac23 x^{3/2}",
    fn: (x) => (x >= 0 ? (2 / 3) * Math.pow(x, 1.5) : NaN),
    a: 0,
    b: 3,
    aLatex: "0",
    bLatex: "3",
    x: [-0.3, 3.4],
    y: [-0.4, 3.8],
    pontos: 14 / 3,
    pontosLatex: "\\frac{14}{3}\\approx 4{,}667",
    megjegyzes:
      "A gyakorlófeladatok 10. példája: f′ = √x, tehát 1 + f′² = 1 + x — a gyök alatt szép kifejezés áll. Ez nem véletlen: a vizsgafeladatokat így tervezik.",
  },
  {
    cimke: "sin x",
    latex: "y=\\sin x",
    fn: Math.sin,
    a: 0,
    b: Math.PI,
    aLatex: "0",
    bLatex: "\\pi",
    x: [-0.3, 3.45],
    y: [-0.3, 1.35],
    pontos: 3.8201977890277,
    pontosLatex: "\\approx 3{,}8202 \\ \\text{(nem elemi!)}",
    megjegyzes:
      "Itt a √(1 + cos²x) integrálja nem fejezhető ki elemi függvényekkel (elliptikus integrál). A szám mégis létezik, és numerikusan bármilyen pontosan megkapható — pontosan ezért van szükség numerikus integrálásra.",
  },
];

export default function HoIvhosszFelfedezo() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(4);
  const G = GORBEK[i];

  const pontokLista = [];
  for (let k = 0; k <= n; k++) {
    const x = G.a + ((G.b - G.a) * k) / n;
    pontokLista.push({ x, y: G.fn(x) });
  }
  let huros = 0;
  for (let k = 0; k < n; k++) {
    huros += Math.hypot(
      pontokLista[k + 1].x - pontokLista[k].x,
      pontokLista[k + 1].y - pontokLista[k].y,
    );
  }
  const hiba = G.pontos - huros;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={G.x[0]}
            xMax={G.x[1]}
            yMin={G.y[0]}
            yMax={G.y[1]}
            gorbek={[{ fn: G.fn, szin: TEAL, vastag: 2.6, tol: G.a, ig: G.b }]}
            className="abra w-full select-none"
          >
            {(S) => (
              <g>
                <polyline
                  points={pontokLista.map((p) => `${S.px(p.x)},${S.py(p.y)}`).join(" ")}
                  fill="none"
                  stroke={LILA}
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                />
                {pontokLista.map((p, k) => (
                  <circle key={k} cx={S.px(p.x)} cy={S.py(p.y)} r={n > 20 ? 1.8 : 3.2} fill={LILA} />
                ))}
                {/* az első húr Pitagorasz-háromszöge */}
                {n <= 8 && (
                  <g>
                    <line
                      x1={S.px(pontokLista[0].x)}
                      y1={S.py(pontokLista[0].y)}
                      x2={S.px(pontokLista[1].x)}
                      y2={S.py(pontokLista[0].y)}
                      stroke={NAR}
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                    />
                    <line
                      x1={S.px(pontokLista[1].x)}
                      y1={S.py(pontokLista[0].y)}
                      x2={S.px(pontokLista[1].x)}
                      y2={S.py(pontokLista[1].y)}
                      stroke={NAR}
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                    />
                    <text
                      x={(S.px(pontokLista[0].x) + S.px(pontokLista[1].x)) / 2}
                      y={S.py(pontokLista[0].y) + 15}
                      fontSize="11.5"
                      fontWeight="650"
                      textAnchor="middle"
                      style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      Δx
                    </text>
                    <text
                      x={S.px(pontokLista[1].x) + 6}
                      y={(S.py(pontokLista[0].y) + S.py(pontokLista[1].y)) / 2}
                      fontSize="11.5"
                      fontWeight="650"
                      style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      Δy
                    </text>
                  </g>
                )}
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            {n} húr · a töröttvonal hossza {sz(huros, 5)} · a pontos ívhossz {sz(G.pontos, 5)}
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Görbe</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {GORBEK.map((k, j) => (
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

          <div className="mt-4">
            <Csuszka
              cimke="A húrok száma, n"
              ertek={n}
              min={1}
              max={40}
              lepes={1}
              tizedes={0}
              onChange={setN}
            />
          </div>

          <div className="szamok mt-4 space-y-1.5 rounded-xl bg-petrol-50 p-4 text-[13.5px] text-petrol-800">
            <div>
              <M>{`${G.latex},\\quad ${G.aLatex} \\le x \\le ${G.bLatex}`}</M>
            </div>
            <div className="flex items-baseline justify-between border-t border-petrol-200 pt-1.5">
              <span>töröttvonal (n húr)</span>
              <span className="font-semibold" style={{ color: LILA }}>
                {sz(huros, 5)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span>pontos ívhossz</span>
              <span className="font-semibold" style={{ color: TEAL }}>
                {sz(G.pontos, 5)}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span>eltérés</span>
              <span className="font-semibold text-petrol-900">{sz(hiba, 5)}</span>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">
              A képlet és a pontos érték
            </p>
            <div className="szamok finom-gorgeto mt-1.5 space-y-1 overflow-x-auto text-[13px] text-naracs-900">
              <div>
                <M>{"\\Delta s = \\sqrt{\\Delta x^2+\\Delta y^2} = \\sqrt{1+f'(\\xi)^2}\\,\\Delta x"}</M>
              </div>
              <div>
                <M>{`s = \\int_{${G.aLatex}}^{${G.bLatex}}\\sqrt{1+f'(x)^2}\\,dx = ${G.pontosLatex}`}</M>
              </div>
            </div>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{G.megjegyzes}</p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-petrol-500">
            A töröttvonal <strong>mindig rövidebb</strong> az ívnél (a húr a legrövidebb út), ezért az eltérés
            sosem negatív — és n növelésével nullához tart.
          </p>
        </div>
      </div>
    </div>
  );
}
