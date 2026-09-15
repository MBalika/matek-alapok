"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

/**
 * Arkusz-felfedező: a sin / cos / tg görbe, kiemelt főággal; az y értéket
 * csúszka állítja, és megjelenik az arkuszérték (a főágon), valamint a
 * többi megoldás halványan. Mellette a derékszögű háromszög, amelyből a
 * cos(arcsin y) = √(1−y²) típusú összetételek leolvashatók.
 */

const TIPUSOK = [
  {
    id: "sin",
    cimke: "sin x",
    fn: Math.sin,
    inv: Math.asin,
    fLatex: "\\sin x",
    invLatex: "\\arcsin",
    agTol: -Math.PI / 2,
    agIg: Math.PI / 2,
    yMin: -1.6,
    yMax: 1.6,
    yTol: -0.99,
    yIg: 0.99,
    // a többi megoldás: pi - x0 + 2kpi, x0 + 2kpi
    osszes: (x0) => [
      x0 - 2 * Math.PI,
      Math.PI - x0 - 2 * Math.PI,
      x0,
      Math.PI - x0,
      x0 + 2 * Math.PI,
    ],
    megoldasLatex: (x0) =>
      `x = ${szK(x0, 4)} + 2k\\pi \\quad \\text{vagy} \\quad x = \\pi - (${szK(x0, 4)}) + 2k\\pi`,
    agLatex: "\\left[-\\tfrac{\\pi}{2};\\ \\tfrac{\\pi}{2}\\right]",
  },
  {
    id: "cos",
    cimke: "cos x",
    fn: Math.cos,
    inv: Math.acos,
    fLatex: "\\cos x",
    invLatex: "\\arccos",
    agTol: 0,
    agIg: Math.PI,
    yMin: -1.6,
    yMax: 1.6,
    yTol: -0.99,
    yIg: 0.99,
    osszes: (x0) => [-x0, x0, 2 * Math.PI - x0, x0 - 2 * Math.PI, x0 + 2 * Math.PI],
    megoldasLatex: (x0) => `x = \\pm(${szK(x0, 4)}) + 2k\\pi`,
    agLatex: "[0;\\ \\pi]",
  },
  {
    id: "tg",
    cimke: "tg x",
    fn: Math.tan,
    inv: Math.atan,
    fLatex: "\\operatorname{tg} x",
    invLatex: "\\operatorname{arctg}",
    agTol: -Math.PI / 2 + 0.001,
    agIg: Math.PI / 2 - 0.001,
    yMin: -4,
    yMax: 4,
    yTol: -3.5,
    yIg: 3.5,
    osszes: (x0) => [x0 - 2 * Math.PI, x0 - Math.PI, x0, x0 + Math.PI, x0 + 2 * Math.PI],
    megoldasLatex: (x0) => `x = ${szK(x0, 4)} + k\\pi \\quad (\\text{nem } 2k\\pi!)`,
    agLatex: "\\left(-\\tfrac{\\pi}{2};\\ \\tfrac{\\pi}{2}\\right)",
  },
];

const XMIN = -7;
const XMAX = 7;

export default function FvArkuszFelfedezo() {
  const [i, setI] = useState(0);
  const [y, setY] = useState(0.5);
  const t = TIPUSOK[i];

  const yBiztos = Math.max(t.yTol, Math.min(t.yIg, y));
  const x0 = t.inv(yBiztos);
  const megoldasok = t.osszes(x0).filter((x) => x > XMIN + 0.05 && x < XMAX - 0.05);

  const valt = (j) => {
    setI(j);
    const uj = TIPUSOK[j];
    setY(Math.max(uj.yTol, Math.min(uj.yIg, y)));
  };

  // a cos(arcsin y) / sin(arccos y) háromszög adatai
  const masik = Math.sqrt(Math.max(0, 1 - yBiztos * yBiztos));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={XMIN}
            xMax={XMAX}
            yMin={t.yMin}
            yMax={t.yMax}
            magassag={360}
            gorbek={[
              { fn: t.fn, szin: "#94a3b8", vastag: 1.6, opacitas: 0.75 },
              { fn: t.fn, tol: t.agTol, ig: t.agIg, szin: "#0f766e", vastag: 3.4 },
            ]}
            vizszintes={[{ y: yBiztos, szin: "#e2590a" }]}
            pontok={[
              ...megoldasok
                .filter((x) => Math.abs(x - x0) > 1e-6)
                .map((x) => ({ x, y: yBiztos, szin: "#94a3b8", r: 4, ures: true })),
              {
                x: x0,
                y: yBiztos,
                szin: "#e2590a",
                cimke: `${t.invLatex === "\\arcsin" ? "arcsin" : t.invLatex === "\\arccos" ? "arccos" : "arctg"} = ${sz(x0, 3)}`,
                dx: 10,
                dy: -10,
              },
            ]}
          >
            {(S) => (
              <g>
                <rect
                  x={S.px(Math.max(XMIN, t.agTol))}
                  y={S.margo.fel}
                  width={S.px(Math.min(XMAX, t.agIg)) - S.px(Math.max(XMIN, t.agTol))}
                  height={S.h}
                  fill="#0f766e"
                  opacity="0.07"
                />
                <text
                  x={S.px(Math.min(XMAX, t.agIg)) - 6}
                  y={S.margo.fel + 14}
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="end"
                  style={{
                    fill: "#0f766e",
                    paintOrder: "stroke",
                    stroke: "white",
                    strokeWidth: 3.5,
                  }}
                >
                  főág
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A kiemelt zöld szakasz a leszűkítés (a főág); az üres körök a többi megoldás.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Melyik függvény?
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TIPUSOK.map((k, j) => (
              <button
                key={k.id}
                type="button"
                onClick={() => valt(j)}
                className={`rounded-lg px-3 py-1.5 text-[12px] font-medium transition ${
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
              cimke="Az egyenlet jobb oldala, y"
              ertek={yBiztos}
              min={t.yTol}
              max={t.yIg}
              lepes={0.01}
              tizedes={2}
              onChange={setY}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[0.5, Math.sqrt(2) / 2, Math.sqrt(3) / 2, -0.5].map((v, k) => (
              <button
                key={k}
                type="button"
                onClick={() => setY(Math.max(t.yTol, Math.min(t.yIg, v)))}
                className="szamok rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {["1/2", "√2/2", "√3/2", "−1/2"][k]}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">
              Az arkuszfüggvény EGY számot ad
            </p>
            <div className="szamok mt-1.5 text-[14px] text-naracs-900">
              <M>{`${t.invLatex}(${szK(yBiztos, 3)}) = ${szK(x0, 4)}`}</M>
            </div>
            <p className="mt-1 text-[12px] text-naracs-800">
              Értékkészlete: <M>{t.agLatex}</M> — ezen kívül soha nem ad értéket.
            </p>
          </div>

          <div className="mt-3 rounded-xl bg-petrol-50 px-4 py-3">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              Az EGYENLET összes megoldása
            </p>
            <div className="szamok mt-1.5 text-[13.5px] text-petrol-900">
              <M>{`${t.fLatex} = ${szK(yBiztos, 3)}`}</M>
            </div>
            <div className="szamok mt-1 text-[13.5px] text-petrol-900">
              <M>{t.megoldasLatex(x0)}</M>
            </div>
          </div>

          <div className="racs-vilagos mt-3 rounded-xl border border-[color:var(--keret)] p-3">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              A háromszög-trükk
            </p>
            <svg viewBox="0 0 360 172" className="abra mt-1 w-full select-none">
              <text x="8" y="16" fontSize="11.5" fill="#64748b">
                átfogó 1 · szemközti |y| · a másik befogó √(1−y²)
              </text>
              <polygon
                points="30,140 290,140 290,52"
                fill="#0f766e"
                fillOpacity="0.08"
                stroke="#1d3c48"
                strokeWidth="1.8"
              />
              <path d="M 279 140 L 279 129 L 290 129" fill="none" stroke="#64748b" strokeWidth="1.3" />
              <path
                d="M 66 140 A 36 36 0 0 0 63.8 127.8"
                fill="none"
                stroke="#e2590a"
                strokeWidth="1.5"
              />
              <text x="72" y="133" fontSize="12.5" fontWeight="650" fill="#e2590a">
                α
              </text>
              <text x="158" y="88" fontSize="12.5" fontWeight="650" fill="#1d3c48" textAnchor="middle">
                1
              </text>
              <text x="300" y="100" fontSize="12.5" fontWeight="650" fill="#0f766e">
                {sz(Math.abs(yBiztos), 3)}
              </text>
              <text x="160" y="158" fontSize="12.5" fontWeight="650" fill="#7c3aed" textAnchor="middle">
                {sz(masik, 3)}
              </text>
            </svg>
            <p className="mt-1 text-[12.5px] leading-relaxed text-petrol-700">
              Ha <M>{"\\alpha = \\arcsin y"}</M>, akkor <M>{"\\sin\\alpha = y"}</M>, és mivel{" "}
              <M>{"-\\tfrac{\\pi}{2}\\le\\alpha\\le\\tfrac{\\pi}{2}"}</M>, a koszinusza{" "}
              <strong>nemnegatív</strong>:
            </p>
            <div className="szamok mt-1 text-[13.5px] text-petrol-900">
              <M>{`\\cos(\\arcsin ${szK(yBiztos, 3)}) = \\sqrt{1-(${szK(yBiztos, 3)})^2} = ${szK(masik, 4)}`}</M>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
