"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { forditKifejezes } from "./SorKifejezes";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

/**
 * Értelmezési tartomány felfedező: nyolc előre megadott függvény, a tiltott
 * x-helyek pirossal az x tengelyen, és a D_f / R_f intervallum-jelöléssel.
 * Saját képlet is beírható — ekkor a D_f numerikusan (hol NaN) becsült.
 */

const PELDAK = [
  {
    cimke: "1/(x−1)",
    latex: "f(x) = \\dfrac{1}{x-1}",
    fn: (x) => 1 / (x - 1),
    xMin: -4,
    xMax: 6,
    yMin: -6,
    yMax: 6,
    tiltott: [{ tol: 1, ig: 1 }],
    fuggoleges: [{ x: 1 }],
    D: "D_f = \\mathbb{R}\\setminus\\{1\\}",
    R: "R_f = \\mathbb{R}\\setminus\\{0\\}",
    ok: "nevező",
    indok:
      "A nevező nem lehet nulla, ezért x ≠ 1. Az értékkészletből a 0 esik ki: egy tört csak akkor nulla, ha a számlálója az — itt viszont a számláló állandó 1.",
  },
  {
    cimke: "√(4−x²)",
    latex: "f(x) = \\sqrt{4-x^2}",
    fn: (x) => Math.sqrt(4 - x * x),
    xMin: -5,
    xMax: 5,
    yMin: -1.2,
    yMax: 3.2,
    tiltott: [
      { tol: -5, ig: -2 },
      { tol: 2, ig: 5 },
    ],
    D: "D_f = [-2;\\ 2]",
    R: "R_f = [0;\\ 2]",
    ok: "páros gyök",
    indok:
      "A négyzetgyök alatt nemnegatív szám kell: 4 − x² ≥ 0, azaz |x| ≤ 2. A grafikon egy félkör — a teljes kör nem volna függvény.",
  },
  {
    cimke: "ln(x+2)",
    latex: "f(x) = \\ln(x+2)",
    fn: (x) => Math.log(x + 2),
    xMin: -4,
    xMax: 6,
    yMin: -4,
    yMax: 2.5,
    tiltott: [{ tol: -4, ig: -2 }],
    fuggoleges: [{ x: -2 }],
    D: "D_f = (-2;\\ +\\infty)",
    R: "R_f = \\mathbb{R}",
    ok: "logaritmus",
    indok:
      "A logaritmus argumentuma szigorúan pozitív: x + 2 > 0, tehát x > −2. Figyelj a szigorú egyenlőtlenségre: a −2 NINCS benne.",
  },
  {
    cimke: "arcsin(x/2)",
    latex: "f(x) = \\arcsin\\dfrac{x}{2}",
    fn: (x) => Math.asin(x / 2),
    xMin: -5,
    xMax: 5,
    yMin: -2.2,
    yMax: 2.2,
    tiltott: [
      { tol: -5, ig: -2 },
      { tol: 2, ig: 5 },
    ],
    D: "D_f = [-2;\\ 2]",
    R: "R_f = \\left[-\\tfrac{\\pi}{2};\\ \\tfrac{\\pi}{2}\\right]",
    ok: "arkusz",
    indok:
      "Az arkusz szinusz csak a [−1; 1] intervallumon értelmezett, ezért −1 ≤ x/2 ≤ 1, azaz |x| ≤ 2. Az értékkészlet a főág: −π/2 és π/2 között.",
  },
  {
    cimke: "1/√(x²−1)",
    latex: "f(x) = \\dfrac{1}{\\sqrt{x^2-1}}",
    fn: (x) => 1 / Math.sqrt(x * x - 1),
    xMin: -4,
    xMax: 4,
    yMin: -0.6,
    yMax: 5,
    tiltott: [{ tol: -1, ig: 1 }],
    fuggoleges: [{ x: -1 }, { x: 1 }],
    D: "D_f = (-\\infty;\\ -1)\\cup(1;\\ +\\infty)",
    R: "R_f = (0;\\ +\\infty)",
    ok: "gyök ÉS nevező",
    indok:
      "Két tiltás egyszerre: a gyök alatt nemnegatív kell (x² − 1 ≥ 0), a nevező pedig nem lehet nulla (x² − 1 ≠ 0). A kettő együtt: x² − 1 > 0, vagyis |x| > 1 — a ±1 is kiesik!",
  },
  {
    cimke: "tg x",
    latex: "f(x) = \\operatorname{tg} x",
    fn: (x) => Math.tan(x),
    xMin: -5,
    xMax: 5,
    yMin: -5,
    yMax: 5,
    tiltott: [
      { tol: -Math.PI / 2 - 0.001, ig: -Math.PI / 2 + 0.001 },
      { tol: Math.PI / 2 - 0.001, ig: Math.PI / 2 + 0.001 },
      { tol: -3 * Math.PI / 2 - 0.001, ig: -3 * Math.PI / 2 + 0.001 },
      { tol: 3 * Math.PI / 2 - 0.001, ig: 3 * Math.PI / 2 + 0.001 },
    ],
    fuggoleges: [
      { x: Math.PI / 2 },
      { x: -Math.PI / 2 },
      { x: (3 * Math.PI) / 2 },
      { x: (-3 * Math.PI) / 2 },
    ],
    D: "D_f = \\left\\{x : x \\ne \\tfrac{\\pi}{2}+k\\pi\\right\\}",
    R: "R_f = \\mathbb{R}",
    ok: "nevező (cos x = 0)",
    indok:
      "A tg x = sin x / cos x tört, tehát a cos x = 0 helyek kiesnek: x = π/2 + kπ. Ezeken a helyeken a függvény NEM szakadásos — egyszerűen nincs értelmezve.",
  },
  {
    cimke: "|x|",
    latex: "f(x) = |x|",
    fn: (x) => Math.abs(x),
    xMin: -4,
    xMax: 4,
    yMin: -1,
    yMax: 4,
    tiltott: [],
    D: "D_f = \\mathbb{R}",
    R: "R_f = [0;\\ +\\infty)",
    ok: "nincs tiltás",
    indok:
      "Semmi nem korlátoz: nincs nevező, gyök, logaritmus vagy arkusz. Az abszolútérték páros függvény, ezért a grafikon az y tengelyre szimmetrikus.",
  },
  {
    cimke: "sgn x",
    latex: "f(x) = \\operatorname{sgn} x",
    fn: (x) => Math.sign(x),
    xMin: -4,
    xMax: 4,
    yMin: -2,
    yMax: 2,
    tiltott: [],
    D: "D_f = \\mathbb{R}",
    R: "R_f = \\{-1;\\ 0;\\ 1\\}",
    ok: "nincs tiltás",
    indok:
      "Az előjelfüggvény mindenhol értelmezve van (a 0-ban is, ott az értéke 0), de az értékkészlete mindössze három elem. Jó példa arra, hogy az értékkészlet nem feltétlenül intervallum.",
  },
];

/** Numerikus D_f-becslés: hol véges a függvényérték a [−10; 10] tartományon. */
function tartomanyBecsles(fn, xMin, xMax, db = 1600) {
  const jo = [];
  for (let i = 0; i <= db; i++) {
    const x = xMin + ((xMax - xMin) * i) / db;
    let y;
    try {
      y = fn(x);
    } catch {
      y = NaN;
    }
    jo.push(Number.isFinite(y));
  }
  const szakaszok = [];
  let kezd = null;
  for (let i = 0; i <= db; i++) {
    const x = xMin + ((xMax - xMin) * i) / db;
    if (jo[i] && kezd === null) kezd = x;
    if (!jo[i] && kezd !== null) {
      szakaszok.push([kezd, xMin + ((xMax - xMin) * (i - 1)) / db]);
      kezd = null;
    }
  }
  if (kezd !== null) szakaszok.push([kezd, xMax]);
  return szakaszok.filter(([a, b]) => b - a > (xMax - xMin) / db / 2);
}

export default function FvErtelmezesFelfedezo() {
  const [i, setI] = useState(0);
  const [sajat, setSajat] = useState(false);
  const [szoveg, setSzoveg] = useState("ln(x+2)/(x-1)");

  const p = PELDAK[i];
  const forditas = useMemo(() => forditKifejezes(szoveg, ["x"]), [szoveg]);
  const sajatSzakaszok = useMemo(
    () => (sajat && forditas.ok ? tartomanyBecsles(forditas.fn, -10, 10) : []),
    [sajat, forditas],
  );

  const gorbek = sajat
    ? forditas.ok
      ? [{ fn: forditas.fn, szin: "#0f766e", vastag: 2.6 }]
      : []
    : [{ fn: p.fn, szin: "#0f766e", vastag: 2.6 }];

  const xMin = sajat ? -10 : p.xMin;
  const xMax = sajat ? 10 : p.xMax;
  const yMin = sajat ? -8 : p.yMin;
  const yMax = sajat ? 8 : p.yMax;

  // a tiltott sávok (kimaradó x-tartományok) a saját képletnél a szakaszok komplementere
  const tiltottSavok = sajat
    ? (() => {
        const ki = [];
        let elozo = xMin;
        sajatSzakaszok.forEach(([a, b]) => {
          if (a > elozo + 1e-6) ki.push({ tol: elozo, ig: a });
          elozo = b;
        });
        if (elozo < xMax - 1e-6) ki.push({ tol: elozo, ig: xMax });
        return ki;
      })()
    : p.tiltott;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            xMin={xMin}
            xMax={xMax}
            yMin={yMin}
            yMax={yMax}
            gorbek={gorbek}
            fuggoleges={sajat ? [] : (p.fuggoleges ?? [])}
          >
            {(S) => (
              <g>
                {tiltottSavok.map((t, k) => {
                  const x1 = S.px(Math.max(t.tol, xMin));
                  const x2 = S.px(Math.min(t.ig, xMax));
                  const y0 = S.py(Math.max(yMin, Math.min(0, yMax)));
                  return (
                    <g key={`t${k}`}>
                      <rect
                        x={Math.min(x1, x2)}
                        y={S.margo.fel}
                        width={Math.max(2.5, Math.abs(x2 - x1))}
                        height={S.h}
                        fill="#dc2626"
                        opacity="0.07"
                      />
                      <line
                        x1={x1}
                        y1={y0}
                        x2={x2}
                        y2={y0}
                        stroke="#dc2626"
                        strokeWidth="4"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    </g>
                  );
                })}
                <text
                  x={S.margo.bal + 6}
                  y={S.margo.fel + 14}
                  fontSize="11.5"
                  fontWeight="650"
                  fill="#dc2626"
                >
                  {tiltottSavok.length > 0 ? "piros: itt NINCS értelmezve" : "mindenhol értelmezve"}
                </text>
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A vastag piros szakaszok az x tengelyen azok a helyek, ahol a képlet értelmetlen.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Válassz függvényt
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {PELDAK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => {
                  setI(j);
                  setSajat(false);
                }}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  !sajat && i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {k.cimke}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSajat(true)}
              className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                sajat
                  ? "bg-naracs-500 text-white"
                  : "bg-white text-naracs-700 ring-1 ring-naracs-300 hover:bg-naracs-50"
              }`}
            >
              saját képlet
            </button>
          </div>

          {sajat ? (
            <div className="mt-4">
              <label className="block">
                <span className="mb-1 block text-[12px] font-medium text-petrol-600">
                  f(x) képlete (sqrt, ln, arcsin, tg, abs, sgn, pi, e)
                </span>
                <input
                  type="text"
                  value={szoveg}
                  onChange={(e) => setSzoveg(e.target.value)}
                  placeholder="ln(x+2)/(x-1)"
                  className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400 focus:ring-2 focus:ring-petrol-100"
                />
              </label>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {["ln(x+2)/(x-1)", "sqrt(4-x^2)/ln(x+1)", "1/(x^2-4)", "arcsin(x/3)"].map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSzoveg(m)}
                    className="szamok rounded-lg bg-white px-2 py-1 text-[11.5px] text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
                  >
                    {m}
                  </button>
                ))}
              </div>
              {!forditas.ok && (
                <p className="mt-2 rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] text-rose-700">
                  {forditas.hiba}
                </p>
              )}
              {forditas.ok && (
                <div className="mt-3 rounded-xl bg-petrol-50 p-4">
                  <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
                    Numerikus becslés a [−10; 10] szakaszon
                  </p>
                  <p className="szamok mt-1.5 text-[13.5px] text-petrol-900">
                    {sajatSzakaszok.length === 0
                      ? "Sehol nem értelmezett ezen a szakaszon."
                      : sajatSzakaszok
                          .map(([a, b]) => `[${sz(a, 2)}; ${sz(b, 2)}]`)
                          .join(" ∪ ")}
                  </p>
                  <p className="mt-2 text-[12px] leading-relaxed text-petrol-500">
                    Ez csak <em>becslés</em>: a gép 1600 helyen próbálja ki a képletet. Egyetlen kilyukasztott
                    pontot (például a <M>{"\\frac{\\sin x}{x}"}</M> nullát) könnyen átugorhat. A pontos
                    választ mindig a négy tiltás végiggondolásával kapod.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="szamok mt-4 text-[16px] text-petrol-900">
                <M>{p.latex}</M>
              </div>
              <div className="mt-4 space-y-2">
                <div className="rounded-xl border border-petrol-200 bg-petrol-50 px-4 py-2.5">
                  <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
                    Értelmezési tartomány
                  </p>
                  <div className="szamok mt-1 text-[14.5px] text-petrol-900">
                    <M>{p.D}</M>
                  </div>
                </div>
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                  <p className="text-[10.5px] font-bold tracking-[0.16em] text-emerald-700 uppercase">
                    Értékkészlet
                  </p>
                  <div className="szamok mt-1 text-[14.5px] text-emerald-900">
                    <M>{p.R}</M>
                  </div>
                </div>
              </div>
              <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">
                  Mi korlátoz? — {p.ok}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-naracs-900">{p.indok}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
