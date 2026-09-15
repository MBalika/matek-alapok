"use client";

import { useMemo, useState } from "react";
import FvRajz from "./FvRajz";
import { forditKifejezes } from "./SorKifejezes";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

function szamma(s, alap = 0) {
  const v = Number(String(s).replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(v) ? v : alap;
}

function Mezo({ cimke, ertek, onChange, hely }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[12px] font-medium text-petrol-600">
        {cimke}
      </span>
      <input
        type="text"
        inputMode="decimal"
        value={ertek}
        placeholder={hely}
        onChange={(e) => onChange(e.target.value)}
        className="szamok w-full rounded-lg border border-petrol-200 bg-white px-3 py-2 text-[14px] text-petrol-900 outline-none focus:border-petrol-400 focus:ring-2 focus:ring-petrol-100"
      />
    </label>
  );
}

function Ered({ cimke, children }) {
  return (
    <div className="rounded-lg border border-petrol-100 bg-petrol-50/60 px-3.5 py-2.5">
      <p className="text-[10.5px] font-bold tracking-wider text-petrol-500 uppercase">
        {cimke}
      </p>
      <div className="szamok mt-1 text-[14px] text-petrol-900">{children}</div>
    </div>
  );
}

/* ==================== 1. Függvényvizsgáló ==================== */

const MINTAK = [
  ["(√(x+4)−2)/x", "(sqrt(x+4)-2)/x", "0"],
  ["sin x / x", "sin(x)/x", "0"],
  ["(x²−1)/(x−1)", "(x^2-1)/(x-1)", "1"],
  ["ln(x+2)", "ln(x+2)", "-2"],
  ["x·sin x", "x*sin(x)", "0"],
  ["1/(x−1)", "1/(x-1)", "1"],
];

const FELSO = {
  "-6": "⁻⁶",
  "-1": "⁻¹",
  1: "¹",
  "-5": "⁻⁵",
  "-4": "⁻⁴",
  "-3": "⁻³",
  "-2": "⁻²",
  2: "²",
  3: "³",
  4: "⁴",
  5: "⁵",
  6: "⁶",
  7: "⁷",
  8: "⁸",
  9: "⁹",
};

/** 10^k alakú szám olvasható kiírása (10², 10⁻³ …). */
function tizesHatvany(x) {
  const k = Math.round(Math.log10(Math.abs(x)));
  return `10${FELSO[String(k)] ?? `^${k}`}`;
}

/** Hol értelmezett a képlet: maximális szakaszok a [−10; 10]-en. */
function ertelmezesiSzakaszok(fn, xMin = -10, xMax = 10, db = 2000) {
  const szakaszok = [];
  let kezd = null;
  for (let i = 0; i <= db; i++) {
    const x = xMin + ((xMax - xMin) * i) / db;
    let y;
    try {
      y = fn(x);
    } catch {
      y = NaN;
    }
    const jo = Number.isFinite(y);
    if (jo && kezd === null) kezd = x;
    if (!jo && kezd !== null) {
      szakaszok.push([kezd, xMin + ((xMax - xMin) * (i - 1)) / db]);
      kezd = null;
    }
  }
  if (kezd !== null) szakaszok.push([kezd, xMax]);
  return szakaszok.filter(([a, b]) => b - a > (xMax - xMin) / db / 2);
}

function paritasTeszt(fn) {
  const probak = [0.37, 0.9, 1.4, 2.3, 3.1, 4.7];
  let paros = true;
  let paratlan = true;
  let ervenyes = 0;
  probak.forEach((x) => {
    const p = fn(x);
    const m = fn(-x);
    if (!Number.isFinite(p) || !Number.isFinite(m)) {
      if (Number.isFinite(p) !== Number.isFinite(m)) {
        paros = false;
        paratlan = false;
      }
      return;
    }
    ervenyes += 1;
    const skala = Math.max(1, Math.abs(p), Math.abs(m));
    if (Math.abs(p - m) > 1e-7 * skala) paros = false;
    if (Math.abs(p + m) > 1e-7 * skala) paratlan = false;
  });
  if (ervenyes < 3) return "nem eldönthető ezen a tartományon";
  if (paros && paratlan) return "páros ÉS páratlan (azonosan nulla)";
  if (paros) return "páros — a grafikon az y tengelyre szimmetrikus";
  if (paratlan) return "páratlan — a grafikon az origóra szimmetrikus";
  return "egyik sem";
}

export function FvVizsgaloKalk() {
  const [keplet, setKeplet] = useState("(sqrt(x+4)-2)/x");
  const [x0szoveg, setX0] = useState("0");
  const [abTol, setAbTol] = useState("-6");
  const [abIg, setAbIg] = useState("6");

  const f = useMemo(() => forditKifejezes(keplet, ["x"]), [keplet]);
  const x0 = szamma(x0szoveg, 0);
  const tol = szamma(abTol, -6);
  const ig = Math.max(tol + 0.5, szamma(abIg, 6));

  const szakaszok = useMemo(
    () => (f.ok ? ertelmezesiSzakaszok(f.fn) : []),
    [f],
  );
  const paritas = useMemo(() => (f.ok ? paritasTeszt(f.fn) : ""), [f]);

  const kozelites = useMemo(() => {
    if (!f.ok) return [];
    return [1, 2, 3, 4, 5, 6].map((k) => {
      const h = Math.pow(10, -k);
      return { h, bal: f.fn(x0 - h), jobb: f.fn(x0 + h) };
    });
  }, [f, x0]);

  const vegtelen = useMemo(() => {
    if (!f.ok) return null;
    return {
      p: [1e2, 1e4, 1e6, 1e8].map((x) => ({ x, y: f.fn(x) })),
      m: [-1e2, -1e4, -1e6, -1e8].map((x) => ({ x, y: f.fn(x) })),
    };
  }, [f]);

  const tabla = useMemo(() => {
    if (!f.ok) return [];
    const t = [];
    for (let k = 0; k <= 10; k++) {
      const x = tol + ((ig - tol) * k) / 10;
      t.push({ x, y: f.fn(x) });
    }
    return t;
  }, [f, tol, ig]);

  const utolso = kozelites[kozelites.length - 1];
  const egyezik =
    utolso &&
    Number.isFinite(utolso.bal) &&
    Number.isFinite(utolso.jobb) &&
    Math.abs(utolso.bal - utolso.jobb) <
      Math.max(1e-4, Math.abs(utolso.jobb) * 1e-3);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid gap-5 p-5 lg:grid-cols-[1fr_1.35fr]">
        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Bemenet
          </p>
          <div className="mt-3 space-y-3">
            <Mezo
              cimke="f(x) képlete (x a változó)"
              ertek={keplet}
              onChange={setKeplet}
              hely="(sqrt(x+4)-2)/x"
            />
            <div className="grid grid-cols-3 gap-2">
              <Mezo cimke="x₀" ertek={x0szoveg} onChange={setX0} hely="0" />
              <Mezo
                cimke="ábra-tól"
                ertek={abTol}
                onChange={setAbTol}
                hely="-6"
              />
              <Mezo cimke="ábra-ig" ertek={abIg} onChange={setAbIg} hely="6" />
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {MINTAK.map(([nev, k, x]) => (
              <button
                key={nev}
                type="button"
                onClick={() => {
                  setKeplet(k);
                  setX0(x);
                }}
                className="szamok rounded-lg bg-white px-2 py-1 text-[11.5px] text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {nev}
              </button>
            ))}
          </div>
          {!f.ok && (
            <p className="mt-3 rounded-lg bg-rose-50 px-3 py-2 text-[12.5px] text-rose-700">
              {f.hiba}
            </p>
          )}
          <p className="mt-3 text-[11.5px] leading-relaxed text-petrol-400">
            Használható: sqrt, ln, lg, exp, sin, cos, tg, ctg, arcsin, arccos,
            arctg, sh, ch, th, abs, sgn, pi, e. A hatvány jele{" "}
            <span className="szamok">^</span>.
          </p>

          {f.ok && (
            <div className="racs-vilagos mt-4 rounded-xl border border-[color:var(--keret)] p-2">
              <FvRajz
                xMin={tol}
                xMax={ig}
                magassag={260}
                gorbek={[{ fn: f.fn, szin: "#0f766e", vastag: 2.4, db: 900 }]}
                fuggoleges={[{ x: x0, szin: "#7c3aed" }]}
              />
            </div>
          )}
        </div>

        <div>
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
            Eredmények
          </p>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <Ered cimke="Értelmezve (becslés, [−10; 10])">
              {szakaszok.length === 0
                ? "sehol"
                : szakaszok
                    .map(([a, b]) => `[${sz(a, 2)}; ${sz(b, 2)}]`)
                    .join(" ∪ ")}
            </Ered>
            <Ered cimke="Paritás (numerikus teszt)">{paritas}</Ered>
          </div>

          <p className="mt-4 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Határérték-becslés az x₀ = {sz(x0, 3)} helyen
          </p>
          <div className="finom-gorgeto mt-2 overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="text-[10.5px] text-petrol-500 uppercase">
                <tr>
                  <th className="pb-1 text-left font-semibold">h</th>
                  <th className="pb-1 text-left font-semibold">f(x₀ − h)</th>
                  <th className="pb-1 text-left font-semibold">f(x₀ + h)</th>
                </tr>
              </thead>
              <tbody className="szamok text-petrol-800">
                {kozelites.map((k) => (
                  <tr key={k.h} className="border-t border-petrol-100">
                    <td className="py-1">{tizesHatvany(k.h)}</td>
                    <td className="py-1">
                      {Number.isFinite(k.bal) ? sz(k.bal, 7) : "—"}
                    </td>
                    <td className="py-1">
                      {Number.isFinite(k.jobb) ? sz(k.jobb, 7) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {utolso && (
            <p
              className={`mt-2 rounded-lg px-3 py-2 text-[12.5px] ${
                egyezik
                  ? "bg-emerald-50 text-emerald-800"
                  : "bg-naracs-50 text-naracs-800"
              }`}
            >
              {egyezik
                ? `A bal és a jobb oldali közelítés egybeesik — a határérték kb. ${sz(utolso.jobb, 6)}.`
                : "A bal és a jobb oldali közelítés NEM esik egybe (vagy valamelyik oldalon nincs értelmezve) — itt nincs kétoldali határérték."}
            </p>
          )}

          <p className="mt-4 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Határérték a végtelenben
          </p>
          {vegtelen && (
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <Ered cimke="x → +∞">
                {vegtelen.p.map((p) => (
                  <div key={p.x}>
                    x = {tizesHatvany(p.x)} →{" "}
                    {Number.isFinite(p.y) ? sz(p.y, 6) : "—"}
                  </div>
                ))}
              </Ered>
              <Ered cimke="x → −∞">
                {vegtelen.m.map((p) => (
                  <div key={p.x}>
                    x = −{tizesHatvany(-p.x)} →{" "}
                    {Number.isFinite(p.y) ? sz(p.y, 6) : "—"}
                  </div>
                ))}
              </Ered>
            </div>
          )}

          <p className="mt-4 text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Értéktáblázat
          </p>
          <div className="finom-gorgeto mt-2 overflow-x-auto">
            <table className="w-full text-[12.5px]">
              <thead className="text-[10.5px] text-petrol-500 uppercase">
                <tr>
                  <th className="pb-1 text-left font-semibold">x</th>
                  {tabla.map((r) => (
                    <th
                      key={r.x}
                      className="szamok pb-1 text-right font-normal text-petrol-700"
                    >
                      {sz(r.x, 1)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="szamok text-petrol-800">
                <tr className="border-t border-petrol-100">
                  <td className="py-1 text-[10.5px] text-petrol-500 uppercase">
                    f(x)
                  </td>
                  {tabla.map((r) => (
                    <td key={r.x} className="py-1 text-right">
                      {Number.isFinite(r.y) ? sz(r.y, 2) : "—"}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-[11.5px] leading-relaxed text-petrol-400">
            A numerikus becslés <em>nem</em> bizonyítás: a lebegőpontos
            aritmetika 10⁻⁷ alatt már megbízhatatlan (nézd meg a gyöktelenítés
            nélküli alakot!), és egyetlen kilyukasztott pontot könnyű átugrani.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ==================== 2. Nevezetes határértékek ==================== */

const NEVEZETESEK = [
  {
    id: "sin",
    cimke: "sin(ax) / (bx)",
    latex: (a, b) => `\\lim_{x\\to 0}\\frac{\\sin(${a}x)}{${b}x}`,
    pontos: (a, b) => a / b,
    pontosLatex: (a, b) => `\\frac{${a}}{${b}}`,
    fn: (a, b) => (x) => Math.sin(a * x) / (b * x),
    hol: "0",
    minta: [1e-3, 1e-4, 1e-5, 1e-6],
    magyarazat:
      "Bővíts úgy, hogy a szinusz argumentuma és a nevező pontosan ugyanaz legyen: sin(ax)/(bx) = (a/b)·sin(ax)/(ax).",
  },
  {
    id: "e",
    cimke: "(1 + a/x)^(bx)",
    latex: (a, b) =>
      `\\lim_{x\\to \\infty}\\left(1+\\frac{${a}}{x}\\right)^{${b}x}`,
    pontos: (a, b) => Math.exp(a * b),
    pontosLatex: (a, b) => `e^{${a * b}}`,
    fn: (a, b) => (x) => Math.pow(1 + a / x, b * x),
    hol: "inf",
    minta: [1e3, 1e5, 1e7, 1e9],
    magyarazat:
      "Az x/a a „kicsi” reciproka: (1 + 1/(x/a))^(x/a) → e, a maradék kitevő ab, tehát az eredmény e^(ab).",
  },
  {
    id: "exp",
    cimke: "(e^(ax) − 1) / (bx)",
    latex: (a, b) => `\\lim_{x\\to 0}\\frac{e^{${a}x}-1}{${b}x}`,
    pontos: (a, b) => a / b,
    pontosLatex: (a, b) => `\\frac{${a}}{${b}}`,
    fn: (a, b) => (x) => (Math.exp(a * x) - 1) / (b * x),
    hol: "0",
    minta: [1e-3, 1e-4, 1e-5, 1e-6],
    magyarazat:
      "(e^t − 1)/t → 1 a t = ax helyettesítéssel, a maradék szorzó a/b.",
  },
  {
    id: "ln",
    cimke: "ln(1 + ax) / (bx)",
    latex: (a, b) => `\\lim_{x\\to 0}\\frac{\\ln(1+${a}x)}{${b}x}`,
    pontos: (a, b) => a / b,
    pontosLatex: (a, b) => `\\frac{${a}}{${b}}`,
    fn: (a, b) => (x) => Math.log(1 + a * x) / (b * x),
    hol: "0",
    minta: [1e-3, 1e-4, 1e-5, 1e-6],
    magyarazat:
      "ln(1+t)/t → 1 a t = ax helyettesítéssel; a maradék szorzó a/b.",
  },
  {
    id: "cos",
    cimke: "(1 − cos ax) / (bx²)",
    latex: (a, b) => `\\lim_{x\\to 0}\\frac{1-\\cos(${a}x)}{${b}x^2}`,
    pontos: (a, b) => (a * a) / (2 * b),
    pontosLatex: (a, b) =>
      `\\frac{${a}^2}{2\\cdot${b}} = \\frac{${a * a}}{${2 * b}}`,
    fn: (a, b) => (x) => (1 - Math.cos(a * x)) / (b * x * x),
    hol: "0",
    minta: [1e-2, 1e-3, 1e-4, 1e-5],
    magyarazat:
      "1 − cos t = 2 sin²(t/2), innen (1 − cos ax)/x² → a²/2, majd osztva b-vel.",
  },
];

export function FvNevezetesKalk() {
  const [a, setA] = useState("3");
  const [b, setB] = useState("2");
  const av = szamma(a, 1) || 1;
  const bv = szamma(b, 1) || 1;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="p-5">
        <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-600 uppercase">
          Paraméterek
        </p>
        <div className="mt-3 grid max-w-sm grid-cols-2 gap-3">
          <Mezo cimke="a" ertek={a} onChange={setA} hely="5" />
          <Mezo cimke="b" ertek={b} onChange={setB} hely="3" />
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {[
            ["3", "2"],
            ["5", "3"],
            ["1", "2"],
            ["2", "1"],
          ].map(([x, y]) => (
            <button
              key={`${x}-${y}`}
              type="button"
              onClick={() => {
                setA(x);
                setB(y);
              }}
              className="szamok rounded-lg bg-white px-2.5 py-1 text-[12px] text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
            >
              a = {x}, b = {y}
            </button>
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {NEVEZETESEK.map((n) => {
            const pontos = n.pontos(av, bv);
            const f = n.fn(av, bv);
            return (
              <div
                key={n.id}
                className="rounded-xl border border-petrol-100 bg-petrol-50/50 px-4 py-3"
              >
                <div className="grid gap-3 sm:grid-cols-[1.1fr_1fr]">
                  <div>
                    <div className="szamok text-[14.5px] text-petrol-900">
                      <M>{`${n.latex(av, bv)} = ${n.pontosLatex(av, bv)} = ${szK(pontos, 5)}`}</M>
                    </div>
                    <p className="mt-1.5 text-[12.5px] leading-relaxed text-petrol-600">
                      {n.magyarazat}
                    </p>
                  </div>
                  <div className="rounded-lg border border-petrol-100 bg-white px-3 py-2">
                    <p className="text-[10.5px] font-bold tracking-wider text-petrol-500 uppercase">
                      Numerikus közelítés
                    </p>
                    <div className="szamok mt-1 space-y-0.5 text-[12.5px] text-petrol-800">
                      {n.minta.map((x) => {
                        const y = f(x);
                        return (
                          <div key={x} className="flex justify-between gap-2">
                            <span className="text-petrol-500">
                              x = {tizesHatvany(x)}
                            </span>
                            <span>
                              {Number.isFinite(y)
                                ? sz(y, Math.abs(y) > 100 ? 2 : 7)
                                : "—"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[11.5px] leading-relaxed text-petrol-400">
          Figyeld meg az utolsó sorokat: az <M>{"1-\\cos"}</M> típusnál a
          numerikus érték 10⁻⁵ alatt már „elromlik”, mert két majdnem egyenlő
          szám különbségét osztjuk egy nagyon kis számmal. Ez a{" "}
          <strong>kiejtéses hiba</strong> — pontosan ezért nem helyettesítheti a
          számológép a levezetést.
        </p>
      </div>
    </div>
  );
}
