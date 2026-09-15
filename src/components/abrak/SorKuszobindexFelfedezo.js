"use client";

import { useMemo, useState } from "react";
import SorRajz from "./SorRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const SOROZATOK = [
  {
    cimke: "(2n+1)⁄(n+3)",
    latex: "a_n = \\frac{2n+1}{n+3}",
    fn: (n) => (2 * n + 1) / (n + 3),
    A: 2,
    elteres: "\\left|a_n - 2\\right| = \\left|\\frac{2n+1-2(n+3)}{n+3}\\right| = \\frac{5}{n+3}",
    megold: (eps) => `\\frac{5}{n+3} < \\varepsilon \\iff n > \\frac{5}{${szK(eps, 3)}} - 3 = ${szK(5 / eps - 3, 2)}`,
    sav: [0.4, 2.6],
  },
  {
    cimke: "1⁄n",
    latex: "a_n = \\frac1n",
    fn: (n) => 1 / n,
    A: 0,
    elteres: "\\left|a_n - 0\\right| = \\frac{1}{n}",
    megold: (eps) => `\\frac{1}{n} < \\varepsilon \\iff n > \\frac{1}{${szK(eps, 3)}} = ${szK(1 / eps, 2)}`,
    sav: [-0.35, 1.15],
  },
  {
    cimke: "n⁄(n+1)",
    latex: "a_n = \\frac{n}{n+1}",
    fn: (n) => n / (n + 1),
    A: 1,
    elteres: "\\left|a_n - 1\\right| = \\left|\\frac{n-(n+1)}{n+1}\\right| = \\frac{1}{n+1}",
    megold: (eps) => `\\frac{1}{n+1} < \\varepsilon \\iff n > \\frac{1}{${szK(eps, 3)}} - 1 = ${szK(1 / eps - 1, 2)}`,
    sav: [0.3, 1.6],
  },
  {
    cimke: "(−1)ⁿ⁄n",
    latex: "a_n = \\frac{(-1)^n}{n}",
    fn: (n) => (n % 2 === 0 ? 1 : -1) / n,
    A: 0,
    elteres: "\\left|a_n - 0\\right| = \\left|\\frac{(-1)^n}{n}\\right| = \\frac{1}{n}",
    megold: (eps) => `\\frac{1}{n} < \\varepsilon \\iff n > \\frac{1}{${szK(eps, 3)}} = ${szK(1 / eps, 2)}`,
    sav: [-1.15, 1.15],
  },
];

/**
 * A legkisebb olyan N egész, amelyre minden n > N esetén |aₙ − A| < ε.
 * A parányi relatív biztonsági sáv azért kell, hogy a lebegőpontos kerekítés
 * ne engedjen be egy tagot, amelynek az eltérése pontosan ε (pl. |a₂₂ − 2| = 0,2).
 */
function kuszobindex(fn, A, eps) {
  const hatar = eps * (1 - 1e-9);
  let N = 0;
  while (N < 200000 && !(Math.abs(fn(N + 1) - A) < hatar)) N += 1;
  return N;
}

export default function SorKuszobindexFelfedezo() {
  const [i, setI] = useState(0);
  const [logEps, setLogEps] = useState(-0.7); // 10^x, x ∈ [−2; −0,3]
  const s = SOROZATOK[i];
  const eps = Math.round(Math.pow(10, logEps) * 1000) / 1000;

  const N = useMemo(() => kuszobindex(s.fn, s.A, eps), [s, eps]);
  const nMax = Math.max(20, Math.min(600, Math.round(N * 1.45) + 8));
  const lepes = Math.max(1, Math.ceil(nMax / 150));
  const tagok = useMemo(() => {
    const t = [];
    for (let n = 1; n <= nMax; n += n <= 40 ? 1 : lepes) t.push({ n, ertek: s.fn(n) });
    return t;
  }, [s, nMax, lepes]);

  const savAlso = Math.min(s.sav[0], s.A - eps * 2.2);
  const savFelso = Math.max(s.sav[1], s.A + eps * 2.2);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <SorRajz
            tagok={tagok}
            A={s.A}
            eps={eps}
            kuszob={N}
            yMin={savAlso}
            yMax={savFelso}
            nMin={1}
            nMax={nMax}
            magassag={340}
            pontMeret={nMax > 120 ? 2.6 : nMax > 50 ? 3.4 : 4.4}
            szarral={false}
          />
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            A szürke pontok még kilógnak a sávból, a zöldek már véglegesen benne vannak. A szaggatott függőleges vonal a
            küszöbindex.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Sorozat</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {SOROZATOK.map((k, j) => (
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

          <div className="szamok mt-4 text-[15px] text-petrol-900">
            <M>{`${s.latex} \\ \\longrightarrow\\ ${s.A}`}</M>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">A megkövetelt pontosság, ε</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {sz(eps, 3)}
              </span>
            </span>
            <input
              type="range"
              min={-2}
              max={-0.301}
              step={0.01}
              value={logEps}
              onChange={(e) => setLogEps(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
            <span className="mt-1 block text-[11.5px] text-petrol-400">
              Logaritmikus csúszka: 0,5-től 0,01-ig. Húzd balra — a sáv szűkül, a küszöb jobbra csúszik.
            </span>
          </label>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[0.5, 0.2, 0.1, 0.05, 0.01].map((e) => (
              <button
                key={e}
                type="button"
                onClick={() => setLogEps(Math.log10(e))}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                ε = {sz(e, 2)}
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">A levezetés</p>
            <div className="szamok mt-2 space-y-1 text-[13.5px] text-petrol-800">
              <div>
                <M>{s.elteres}</M>
              </div>
              <div>
                <M>{s.megold(eps)}</M>
              </div>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3 text-[13.5px] leading-relaxed text-naracs-900">
            <span className="szamok font-semibold">
              N(<span style={{ fontStyle: "italic" }}>ε</span> = {sz(eps, 3)}) = {N}
            </span>
            <br />
            Az <M>{`n = ${N + 1}`}</M> indextől kezdve <strong>minden</strong> tag a sávban van:{" "}
            <span className="szamok">
              |a<sub>{N + 1}</sub> − A| = {sz(Math.abs(s.fn(N + 1) - s.A), 5)} &lt; {sz(eps, 3)}
            </span>
            {N >= 1 && (
              <>
                , míg <M>{`n = ${N}`}</M> még nem elég:{" "}
                <span className="szamok">
                  |a<sub>{N}</sub> − A| = {sz(Math.abs(s.fn(N) - s.A), 5)} ≥ {sz(eps, 3)}
                </span>
              </>
            )}
            .
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            A definíció nem azt kéri, hogy <em>egy</em> tag beessen a sávba, hanem hogy a küszöb után <strong>mind</strong>. Ezért
            kell mindig előbb az ε, és csak utána az N — az N függ az ε-tól.
          </p>
        </div>
      </div>
    </div>
  );
}
