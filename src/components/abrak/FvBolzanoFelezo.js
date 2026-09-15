"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import FvRajz from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

/**
 * Bolzano-tétel és intervallumfelezés: a gyök befogása lépésenként.
 * A folytonosság garantálja, hogy van gyök; a felezés meg is találja.
 */

const FELADATOK = [
  {
    id: "harmad",
    cimke: "x³ − 6x + 2",
    latex: "f(x) = x^3-6x+2",
    fn: (x) => x * x * x - 6 * x + 2,
    a: 0,
    b: 1,
    xMin: -0.15,
    xMax: 1.15,
    yMin: -3.6,
    yMax: 2.6,
    gyok: 0.33988685,
  },
  {
    id: "otod",
    cimke: "x⁵ − 3x + 1",
    latex: "f(x) = x^5-3x+1",
    fn: (x) => Math.pow(x, 5) - 3 * x + 1,
    a: 0,
    b: 1,
    xMin: -0.15,
    xMax: 1.15,
    yMin: -1.6,
    yMax: 1.4,
    gyok: 0.33473,
  },
  {
    id: "exp",
    cimke: "eˣ − 3x",
    latex: "f(x) = e^{x}-3x",
    fn: (x) => Math.exp(x) - 3 * x,
    a: 0,
    b: 1,
    xMin: -0.15,
    xMax: 1.15,
    yMin: -0.6,
    yMax: 1.3,
    gyok: 0.6190612,
  },
];

function lepesek(fn, a0, b0, db) {
  const sor = [];
  let a = a0;
  let b = b0;
  let fa = fn(a);
  for (let k = 1; k <= db; k++) {
    const c = (a + b) / 2;
    const fc = fn(c);
    const balra = fa * fc < 0; // a gyök az [a; c] felében van
    sor.push({ k, a, b, c, fc, balra });
    if (balra) {
      b = c;
    } else {
      a = c;
      fa = fc;
    }
  }
  return sor;
}

const MAX = 8;

/** Rövid alak: legfeljebb 5 tizedes, a fölösleges nullák nélkül. */
function rov(v) {
  const s = sz(v, 5);
  return s.includes(",") ? s.replace(/0+$/, "").replace(/,$/, "") : s;
}

export default function FvBolzanoFelezo() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(0);
  const [fut, setFut] = useState(false);
  const f = FELADATOK[i];
  const ora = useRef(null);

  const sor = useMemo(() => lepesek(f.fn, f.a, f.b, MAX), [f]);

  useEffect(() => {
    if (!fut) return undefined;
    ora.current = setInterval(() => {
      setN((v) => {
        if (v >= MAX) {
          setFut(false);
          return v;
        }
        return v + 1;
      });
    }, 900);
    return () => clearInterval(ora.current);
  }, [fut]);

  const aktualis = n === 0 ? { a: f.a, b: f.b } : { a: sor[n - 1].balra ? sor[n - 1].a : sor[n - 1].c, b: sor[n - 1].balra ? sor[n - 1].c : sor[n - 1].b };
  const kozep = (aktualis.a + aktualis.b) / 2;

  const valt = (j) => {
    setI(j);
    setN(0);
    setFut(false);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={f.xMin}
            xMax={f.xMax}
            yMin={f.yMin}
            yMax={f.yMax}
            magassag={360}
            gorbek={[{ fn: f.fn, szin: "#0f766e", vastag: 2.8 }]}
            pontok={[
              { x: f.a, y: f.fn(f.a), szin: "#7c3aed", cimke: `f(${sz(f.a, 0)}) = ${sz(f.fn(f.a), 2)}`, dx: 8 },
              { x: f.b, y: f.fn(f.b), szin: "#7c3aed", cimke: `f(${sz(f.b, 0)}) = ${sz(f.fn(f.b), 2)}`, dx: -110, dy: 18 },
              ...(n > 0
                ? [{ x: sor[n - 1].c, y: sor[n - 1].fc, szin: "#e2590a", r: 5 }]
                : []),
            ]}
          >
            {(S) => (
              <g>
                <rect
                  x={S.px(aktualis.a)}
                  y={S.margo.fel}
                  width={Math.max(2, S.px(aktualis.b) - S.px(aktualis.a))}
                  height={S.h}
                  fill="#e2590a"
                  opacity="0.14"
                />
                <line
                  x1={S.px(aktualis.a)}
                  y1={S.py(0)}
                  x2={S.px(aktualis.b)}
                  y2={S.py(0)}
                  stroke="#e2590a"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <text
                  x={Math.min(
                    S.margo.bal + S.w - 70,
                    Math.max(S.margo.bal + 70, (S.px(aktualis.a) + S.px(aktualis.b)) / 2),
                  )}
                  y={S.margo.fel + S.h - 10}
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  style={{
                    fill: "#e2590a",
                    paintOrder: "stroke",
                    stroke: "white",
                    strokeWidth: 3.5,
                  }}
                >
                  [{rov(aktualis.a)}; {rov(aktualis.b)}]
                </text>
                {n < MAX && (
                  <line
                    x1={S.px(kozep)}
                    y1={S.margo.fel}
                    x2={S.px(kozep)}
                    y2={S.margo.fel + S.h}
                    stroke="#7c3aed"
                    strokeWidth="1.4"
                    strokeDasharray="5 4"
                  />
                )}
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A narancs sáv a gyököt biztosan tartalmazó intervallum; a lila szaggatott a következő felezőpont.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Egyenlet
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FELADATOK.map((k, j) => (
              <button
                key={k.id}
                type="button"
                onClick={() => valt(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke} = 0
              </button>
            ))}
          </div>

          <div className="szamok mt-3 text-[15px] text-petrol-900">
            <M>{`${f.latex},\\quad [${f.a};\\ ${f.b}]`}</M>
          </div>

          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-[13px] leading-relaxed text-emerald-900">
            <span className="szamok font-semibold">
              f({sz(f.a, 0)}) = {sz(f.fn(f.a), 3)} és f({sz(f.b, 0)}) = {sz(f.fn(f.b), 3)}
            </span>
            <br />
            Ellentétes előjelűek, és a függvény folytonos → Bolzano tétele szerint{" "}
            <strong>van gyök</strong> az intervallumban.
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setN((v) => Math.min(MAX, v + 1))}
              disabled={n >= MAX}
              className="rounded-lg bg-naracs-500 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-naracs-600 disabled:opacity-40"
            >
              Felezés →
            </button>
            <button
              type="button"
              onClick={() => setFut((v) => !v)}
              className="rounded-lg bg-petrol-700 px-3.5 py-2 text-[13px] font-semibold text-white transition hover:bg-petrol-800"
            >
              {fut ? "❚❚ Szünet" : "▶ Automata"}
            </button>
            <button
              type="button"
              onClick={() => {
                setN(0);
                setFut(false);
              }}
              className="rounded-lg bg-white px-3.5 py-2 text-[13px] font-medium text-petrol-700 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              ↺ Elölről
            </button>
          </div>

          <div className="finom-gorgeto mt-4 overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="text-[10.5px] text-petrol-500 uppercase">
                <tr>
                  <th className="pb-1 text-left font-semibold">k</th>
                  <th className="pb-1 text-left font-semibold">[a; b]</th>
                  <th className="pb-1 text-left font-semibold">c</th>
                  <th className="pb-1 text-left font-semibold">f(c)</th>
                  <th className="pb-1 text-left font-semibold">merre</th>
                </tr>
              </thead>
              <tbody className="szamok text-petrol-800">
                {sor.slice(0, n).map((l) => (
                  <tr key={l.k} className="border-t border-petrol-100">
                    <td className="py-1">{l.k}</td>
                    <td className="py-1">
                      [{rov(l.a)}; {rov(l.b)}]
                    </td>
                    <td className="py-1">{rov(l.c)}</td>
                    <td className={`py-1 ${l.fc < 0 ? "text-rose-600" : "text-emerald-600"}`}>
                      {sz(l.fc, 5)}
                    </td>
                    <td className="py-1">{l.balra ? "bal fél" : "jobb fél"}</td>
                  </tr>
                ))}
                {n === 0 && (
                  <tr>
                    <td colSpan={5} className="py-3 text-[12.5px] text-petrol-400">
                      Nyomd meg a „Felezés” gombot.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 rounded-xl bg-petrol-50 px-4 py-3 text-[13px] leading-relaxed text-petrol-800">
            <p>
              A hossz <span className="szamok font-semibold">{rov(aktualis.b - aktualis.a)}</span>, a
              felezőpont <span className="szamok font-semibold">{rov(kozep)}</span>. A pontos gyök{" "}
              <span className="szamok font-semibold">{sz(f.gyok, 5)}</span>, tehát a hiba legfeljebb{" "}
              <span className="szamok font-semibold">{rov((aktualis.b - aktualis.a) / 2)}</span>.
            </p>
            <p className="mt-1.5 text-petrol-600">
              Minden lépés felezi az intervallumot: <M>{"n"}</M> lépés után a pontosság{" "}
              <M>{"\\frac{b-a}{2^{n+1}}"}</M>. Tíz lépés az ezredrészére szűkít — ez a numerikus
              gyökkeresés legegyszerűbb, de mindig működő módszere.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
