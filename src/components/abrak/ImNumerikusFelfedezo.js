"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";
import { osztopontok, simpson, trapez, pontosIntegral } from "./ImNumerika";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

const FUGGVENYEK = [
  {
    cimke: "1/x",
    latex: "\\frac1x",
    fn: (x) => 1 / x,
    a: 1,
    b: 2,
    yMin: 0,
    yMax: 1.25,
    pontosLatex: "\\ln 2",
    megjegyzes: "A tananyag klasszikus tesztpéldája: van elemi primitív függvénye, tehát a hiba pontosan mérhető.",
  },
  {
    cimke: "e^(−x²)",
    latex: "e^{-x^2}",
    fn: (x) => Math.exp(-x * x),
    a: 0,
    b: 1,
    yMin: 0,
    yMax: 1.2,
    pontosLatex: "0{,}746824\\dots",
    megjegyzes: "Ennek nincs elemi primitív függvénye — numerikus módszer nélkül meg sem tudnánk közelíteni.",
  },
  {
    cimke: "sin x",
    latex: "\\sin x",
    fn: (x) => Math.sin(x),
    a: 0,
    b: Math.PI,
    yMin: 0,
    yMax: 1.2,
    pontosLatex: "2",
    megjegyzes: "Konkáv görbe: itt a trapézszabály alulbecsül (a húr a görbe alatt fut).",
  },
  {
    cimke: "√(1+x³)",
    latex: "\\sqrt{1+x^3}",
    fn: (x) => Math.sqrt(1 + x * x * x),
    a: 0,
    b: 2,
    yMin: 0,
    yMax: 3.4,
    pontosLatex: "3{,}241273\\dots",
    megjegyzes: "Ívhosszszámításnál bukkan fel ilyen alak — elemi primitív függvénye nincs.",
  },
];

const MODOK = [
  { id: "trapez", nev: "Trapézok" },
  { id: "simpson", nev: "Parabolaívek" },
  { id: "mindketto", nev: "Mindkettő" },
];

export default function ImNumerikusFelfedezo() {
  const [i, setI] = useState(0);
  const [n, setN] = useState(4);
  const [mod, setMod] = useState("trapez");
  const F = FUGGVENYEK[i];

  const h = (F.b - F.a) / n;
  const xs = useMemo(() => osztopontok(F.a, F.b, n), [F, n]);
  const ys = xs.map(F.fn);

  const pontos = useMemo(() => pontosIntegral(F.fn, F.a, F.b, 4000), [F]);
  const T = trapez(F.fn, F.a, F.b, n);
  const S = simpson(F.fn, F.a, F.b, n);

  const hibasor = useMemo(() => {
    const ki = [];
    for (let k = 2; k <= 64; k *= 2) {
      ki.push({
        n: k,
        T: Math.abs(trapez(F.fn, F.a, F.b, k) - pontos),
        S: Math.abs(simpson(F.fn, F.a, F.b, k) - pontos),
      });
    }
    return ki;
  }, [F, pontos]);

  /* ---- a hibagrafikon (log–log) ---- */
  const GSZ = 560;
  const GMA = 186;
  const gbal = 58;
  const gjobb = 500;
  const gfel = 26;
  const gle = 148;
  const uMin = Math.log10(2);
  const uMax = Math.log10(64);
  const vMin = -13;
  const vMax = 0;
  const gx = (u) => gbal + ((u - uMin) / (uMax - uMin)) * (gjobb - gbal);
  const gy = (v) => gle - ((v - vMin) / (vMax - vMin)) * (gle - gfel);
  const logHiba = (e) => Math.max(vMin, Math.log10(Math.max(e, 1e-16)));
  const vonal = (kulcs) =>
    hibasor.map((s, k) => `${k ? "L" : "M"}${gx(Math.log10(s.n)).toFixed(1)},${gy(logHiba(s[kulcs])).toFixed(1)}`).join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={F.a - (F.b - F.a) * 0.08}
            xMax={F.b + (F.b - F.a) * 0.16}
            yMin={F.yMin}
            yMax={F.yMax}
            magassag={300}
            gorbek={[{ fn: F.fn, szin: TEAL, vastag: 2.8 }]}
          >
            {(Sk) => (
              <g clipPath="url(#fv-vago)">
                {(mod === "trapez" || mod === "mindketto") &&
                  xs.slice(0, -1).map((x, k) => (
                    <polygon
                      key={`t${k}`}
                      points={[
                        [Sk.px(x), Sk.py(0)],
                        [Sk.px(x), Sk.py(ys[k])],
                        [Sk.px(xs[k + 1]), Sk.py(ys[k + 1])],
                        [Sk.px(xs[k + 1]), Sk.py(0)],
                      ]
                        .map((p) => `${p[0].toFixed(1)},${p[1].toFixed(1)}`)
                        .join(" ")}
                      fill={NAR}
                      fillOpacity="0.14"
                      stroke={NAR}
                      strokeWidth="1.4"
                    />
                  ))}
                {(mod === "simpson" || mod === "mindketto") &&
                  Array.from({ length: Math.floor(n / 2) }, (_, k) => {
                    const i0 = 2 * k;
                    const x0 = xs[i0];
                    const x1 = xs[i0 + 1];
                    const x2 = xs[i0 + 2];
                    const y0 = ys[i0];
                    const y1 = ys[i0 + 1];
                    const y2 = ys[i0 + 2];
                    // parabola a három ponton, a középső pontban origóval
                    const A = (y0 - 2 * y1 + y2) / (2 * h * h);
                    const B = (y2 - y0) / (2 * h);
                    const par = (x) => {
                      const t = x - x1;
                      return A * t * t + B * t + y1;
                    };
                    let d = "";
                    for (let q = 0; q <= 24; q++) {
                      const x = x0 + ((x2 - x0) * q) / 24;
                      d += `${q ? "L" : "M"}${Sk.px(x).toFixed(1)},${Sk.py(par(x)).toFixed(1)} `;
                    }
                    return (
                      <g key={`s${k}`}>
                        <path
                          d={`M${Sk.px(x0).toFixed(1)},${Sk.py(0).toFixed(1)} ${d.replace(/^M/, "L")} L${Sk.px(x2).toFixed(
                            1,
                          )},${Sk.py(0).toFixed(1)} Z`}
                          fill={LILA}
                          fillOpacity="0.1"
                        />
                        <path d={d} fill="none" stroke={LILA} strokeWidth="1.8" />
                      </g>
                    );
                  })}
                {xs.map((x, k) => (
                  <g key={`p${k}`}>
                    <line
                      x1={Sk.px(x)}
                      y1={Sk.py(0)}
                      x2={Sk.px(x)}
                      y2={Sk.py(ys[k])}
                      stroke="#94a3b8"
                      strokeWidth="0.8"
                      strokeDasharray="3 3"
                    />
                    {n <= 16 && <circle cx={Sk.px(x)} cy={Sk.py(ys[k])} r="3.2" fill={TEAL} stroke="white" strokeWidth="1.1" />}
                  </g>
                ))}
              </g>
            )}
          </FvRajz>

          {/* hibagrafikon */}
          <svg viewBox={`0 0 ${GSZ} ${GMA}`} className="abra w-full select-none">
            <text x={gbal} y={16} fontSize="11.5" fontWeight="650" fill="#1d3c48">
              A hiba az osztópontok számának függvényében (log–log)
            </text>
            {[0, -3, -6, -9, -12].map((v) => (
              <g key={v}>
                <line x1={gbal} y1={gy(v)} x2={gjobb} y2={gy(v)} stroke="#e2e8f0" strokeWidth="0.8" />
                <text x={gbal - 6} y={gy(v) + 3.5} fontSize="10" fill="#64748b" textAnchor="end">
                  10{v === 0 ? "⁰" : v === -3 ? "⁻³" : v === -6 ? "⁻⁶" : v === -9 ? "⁻⁹" : "⁻¹²"}
                </text>
              </g>
            ))}
            {hibasor.map((s) => (
              <text key={s.n} x={gx(Math.log10(s.n))} y={gle + 14} fontSize="10" fill="#64748b" textAnchor="middle">
                {s.n}
              </text>
            ))}
            <line x1={gbal} y1={gle} x2={gjobb} y2={gle} stroke="#475569" strokeWidth="1.1" />
            <line x1={gbal} y1={gle} x2={gbal} y2={gfel - 4} stroke="#475569" strokeWidth="1.1" />
            <text x={gjobb + 8} y={gle - 6} fontSize="10.5" fontStyle="italic" fill="#64748b">
              n
            </text>
            <path d={vonal("T")} fill="none" stroke={NAR} strokeWidth="2.2" />
            <path d={vonal("S")} fill="none" stroke={LILA} strokeWidth="2.2" />
            {hibasor.map((s) => (
              <g key={`m${s.n}`}>
                <circle cx={gx(Math.log10(s.n))} cy={gy(logHiba(s.T))} r="3.2" fill={NAR} />
                <circle cx={gx(Math.log10(s.n))} cy={gy(logHiba(s.S))} r="3.2" fill={LILA} />
              </g>
            ))}
            <text x={gjobb - 2} y={gy(logHiba(hibasor[hibasor.length - 1].T)) - 9} fontSize="11.5" fontWeight="650" fill={NAR} textAnchor="end">
              trapéz (h²)
            </text>
            <text
              x={gjobb - 2}
              y={Math.min(gle - 6, gy(logHiba(hibasor[hibasor.length - 1].S)) + 16)}
              fontSize="11.5"
              fontWeight="650"
              fill={LILA}
              textAnchor="end"
            >
              Simpson (h⁴)
            </text>
            <text x={GSZ / 2} y={GMA - 8} fontSize="11" fill="#64748b" textAnchor="middle">
              A lila egyenes meredeksége kétszer akkora — ez a negyedrendű pontosság.
            </text>
          </svg>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Függvény</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FUGGVENYEK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => setI(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j ? "bg-petrol-700 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
          </div>

          <div className="szamok mt-3 text-[15px] text-petrol-900">
            <M>{`\\int_{${F.a === 0 ? "0" : F.a === 1 ? "1" : F.a}}^{${
              Math.abs(F.b - Math.PI) < 1e-9 ? "\\pi" : F.b
            }} ${F.latex}\\,dx`}</M>
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka
              cimke="Részintervallumok száma, n (páros)"
              ertek={n}
              min={2}
              max={40}
              lepes={2}
              tizedes={0}
              onChange={setN}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {MODOK.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMod(m.id)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  mod === m.id ? "bg-naracs-500 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {m.nev}
              </button>
            ))}
          </div>

          <div className="szamok mt-4 rounded-xl bg-petrol-50 px-4 py-3 text-[13px] text-petrol-700">
            h = {sz(h, 5)} · osztópontok száma: {n + 1}
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-petrol-100">
            <table className="szamok w-full text-[12.5px]">
              <thead className="bg-petrol-50 text-petrol-500">
                <tr>
                  <th className="px-3 py-1.5 text-left font-semibold">Módszer</th>
                  <th className="px-3 py-1.5 text-right font-semibold">Közelítés</th>
                  <th className="px-3 py-1.5 text-right font-semibold">Hiba</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                <tr className="border-t border-petrol-100">
                  <td className="px-3 py-1.5 text-naracs-700">Trapéz</td>
                  <td className="px-3 py-1.5 text-right">{sz(T, 6)}</td>
                  <td className="px-3 py-1.5 text-right">{sz(T - pontos, 6)}</td>
                </tr>
                <tr className="border-t border-petrol-100">
                  <td className="px-3 py-1.5 text-violet-700">Simpson</td>
                  <td className="px-3 py-1.5 text-right">{sz(S, 6)}</td>
                  <td className="px-3 py-1.5 text-right">{sz(S - pontos, 6)}</td>
                </tr>
                <tr className="border-t border-petrol-100 bg-emerald-50/60">
                  <td className="px-3 py-1.5 font-semibold text-emerald-800">Pontos</td>
                  <td className="px-3 py-1.5 text-right font-semibold">{sz(pontos, 6)}</td>
                  <td className="px-3 py-1.5 text-right">—</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[13px] leading-relaxed text-petrol-700">
            A pontos érték <M>{F.pontosLatex}</M>. {F.megjegyzes}
          </p>

          <p className="mt-2 text-[12.5px] text-petrol-500">
            A Simpson-hiba jellemzően {Math.abs(S - pontos) > 1e-14 ? Math.round(Math.abs(T - pontos) / Math.abs(S - pontos)) : "több ezer"}
            -szer kisebb, mint a trapézhiba — ugyanabból az <span className="szamok">{n + 1}</span> függvényértékből.
          </p>
        </div>
      </div>
    </div>
  );
}
