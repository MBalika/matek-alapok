"use client";

import { useEffect, useMemo, useState } from "react";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const SZ = 560;
const MA = 380;
const BAL = 48;
const JOBB = 22;
const FENT = 18;
const LENT = 34;

const TIPUSOK = {
  gyok: {
    cimke: "aₙ₊₁ = √(p + aₙ)",
    latex: (p) => `a_{n+1} = \\sqrt{${szK(p, 1)} + a_n}`,
    f: (p) => (x) => Math.sqrt(Math.max(0, p + x)),
    fix: (p) => (1 + Math.sqrt(1 + 4 * p)) / 2,
    egyenlet: (p) => `A = \\sqrt{${szK(p, 1)}+A} \\ \\Rightarrow\\ A^2 - A - ${szK(p, 1)} = 0`,
    pCimke: "p",
    pMin: 0.5,
    pMax: 12,
    pLepes: 0.5,
    magyarazat:
      "A fixpont-egyenlet két gyöke közül csak a pozitív jöhet szóba, mert a sorozat minden tagja pozitív. A p = 2 eset a KF‑5 feladat: a fixpont 2.",
  },
  heron: {
    cimke: "aₙ₊₁ = ½(aₙ + c⁄aₙ)",
    latex: (c) => `a_{n+1} = \\frac12\\left(a_n + \\frac{${szK(c, 1)}}{a_n}\\right)`,
    f: (c) => (x) => (x <= 1e-9 ? NaN : 0.5 * (x + c / x)),
    fix: (c) => Math.sqrt(c),
    egyenlet: (c) => `A = \\frac12\\left(A + \\frac{${szK(c, 1)}}{A}\\right) \\ \\Rightarrow\\ A^2 = ${szK(c, 1)}`,
    pCimke: "c",
    pMin: 1,
    pMax: 12,
    pLepes: 0.5,
    magyarazat:
      "Ez a Newton–Héron-módszer a négyzetgyök kiszámítására: a konvergencia annyira gyors, hogy négy lépés után már hat tizedesjegy stimmel.",
  },
};

export default function SorRekurzioFelfedezo() {
  const [tipus, setTipus] = useState("gyok");
  const [p, setP] = useState(2);
  const [a1, setA1] = useState(1);
  const lepesek = 8;
  const [mutat, setMutat] = useState(8);
  const [jatszik, setJatszik] = useState(false);

  const T = TIPUSOK[tipus];
  const f = useMemo(() => T.f(p), [T, p]);
  const fix = T.fix(p);

  const sor = useMemo(() => {
    const t = [a1];
    for (let k = 0; k < lepesek; k++) {
      const kov = f(t[t.length - 1]);
      t.push(Number.isFinite(kov) ? kov : t[t.length - 1]);
    }
    return t;
  }, [a1, lepesek, f]);

  useEffect(() => {
    if (!jatszik) return undefined;
    setMutat(0);
    let k = 0;
    const id = setInterval(() => {
      k += 1;
      setMutat(k);
      if (k >= lepesek) {
        clearInterval(id);
        setJatszik(false);
      }
    }, 520);
    return () => clearInterval(id);
  }, [jatszik, lepesek]);

  const xMax = Math.max(fix * 1.6, a1 * 1.25, 2.2);
  const yMax = xMax;
  const px = (x) => BAL + (x / xMax) * (SZ - BAL - JOBB);
  const py = (y) => MA - LENT - (y / yMax) * (MA - FENT - LENT);

  // f görbéje
  const gorbe = [];
  for (let i = 0; i <= 200; i++) {
    const x = (i / 200) * xMax;
    const y = f(x);
    if (Number.isFinite(y) && y <= yMax * 1.05) gorbe.push(`${px(x).toFixed(1)},${py(Math.min(y, yMax)).toFixed(1)}`);
  }

  // pókháló lépések
  const vonalak = [];
  for (let k = 0; k < Math.min(mutat, lepesek); k++) {
    const x = sor[k];
    const y = sor[k + 1];
    vonalak.push({ kulcs: `f${k}`, x1: px(x), y1: py(k === 0 ? 0 : x), x2: px(x), y2: py(y) });
    vonalak.push({ kulcs: `v${k}`, x1: px(x), y1: py(y), x2: px(y), y2: py(y) });
  }

  const teljesult = Math.abs(sor[Math.min(mutat, lepesek)] - fix) < 1e-6;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            {/* tengelyek */}
            <line x1={BAL} y1={MA - LENT} x2={SZ - JOBB + 4} y2={MA - LENT} stroke="#64748b" strokeWidth="1.25" />
            <line x1={BAL} y1={MA - LENT} x2={BAL} y2={FENT - 6} stroke="#64748b" strokeWidth="1.25" />
            <text x={SZ - JOBB + 2} y={MA - LENT + 17} textAnchor="end" fontSize="12" fontStyle="italic" fill="#1d3c48">
              x
            </text>
            <text x={BAL - 34} y={FENT + 4} fontSize="12" fontStyle="italic" fill="#1d3c48">
              y
            </text>
            {Array.from({ length: Math.floor(xMax) + 1 }, (_, k) => k).map((k) => (
              <g key={k}>
                <line x1={px(k)} y1={MA - LENT} x2={px(k)} y2={MA - LENT + 4} stroke="#64748b" strokeWidth="1" />
                <text x={px(k)} y={MA - LENT + 18} textAnchor="middle" fontSize="10.5" fill="#94a3b8">
                  {k}
                </text>
                {k > 0 && (
                  <text x={BAL - 7} y={py(k) + 4} textAnchor="end" fontSize="10.5" fill="#94a3b8">
                    {k}
                  </text>
                )}
              </g>
            ))}

            {/* y = x */}
            <line x1={px(0)} y1={py(0)} x2={px(Math.min(xMax, yMax))} y2={py(Math.min(xMax, yMax))} stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="5 4" />
            <text x={px(xMax * 0.86)} y={py(xMax * 0.86) - 8} fontSize="11.5" fill="#64748b">
              y = x
            </text>

            {/* y = f(x) */}
            {gorbe.length > 1 && <polyline points={gorbe.join(" ")} fill="none" stroke="#0f766e" strokeWidth="2.2" />}
            <text x={px(xMax * 0.24)} y={py(f(xMax * 0.24)) - 11} fontSize="11.5" fontWeight="650" fill="#0f766e">
              y = f(x)
            </text>

            {/* fixpont */}
            <line x1={px(fix)} y1={MA - LENT} x2={px(fix)} y2={py(fix)} stroke="#e2590a" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx={px(fix)} cy={py(fix)} r="6" fill="#e2590a" stroke="white" strokeWidth="1.8" />
            <text x={px(fix) + 10} y={py(fix) + 18} fontSize="11.5" fontWeight="650" fill="#e2590a">
              A = {sz(fix, 4)}
            </text>

            {/* pókháló */}
            {vonalak.map((v) => (
              <line key={v.kulcs} x1={v.x1} y1={v.y1} x2={v.x2} y2={v.y2} stroke="#7c3aed" strokeWidth="1.6" opacity="0.85" />
            ))}
            {sor.slice(0, Math.min(mutat, lepesek) + 1).map((x, k) => (
              <g key={`p${k}`}>
                <circle cx={px(x)} cy={MA - LENT} r="3.4" fill="#7c3aed" />
                {k <= 2 && (
                  <text
                    x={px(x)}
                    y={MA - LENT - 8 - k * 14}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="650"
                    fill="#7c3aed"
                    style={{ paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    a{["₁", "₂", "₃"][k]}
                  </text>
                )}
              </g>
            ))}

            <circle cx={px(a1)} cy={MA - LENT} r="6" fill="white" stroke="#7c3aed" strokeWidth="2.5" />
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Pókháló-ábra: függőlegesen a görbéig (ez az f alkalmazása), vízszintesen az y = x egyenesig (ez a „legyen ez az új
            x”). A lépcső a fixpont felé fut.
          </p>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-1.5">
            {Object.entries(TIPUSOK).map(([kulcs, t]) => (
              <button
                key={kulcs}
                type="button"
                onClick={() => {
                  setTipus(kulcs);
                  setP(kulcs === "gyok" ? 2 : 2);
                  setA1(kulcs === "gyok" ? 1 : 2);
                  setMutat(lepesek);
                }}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  tipus === kulcs ? "bg-petrol-700 text-white" : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {t.cimke}
              </button>
            ))}
          </div>

          <div className="szamok mt-3 text-[15px] text-petrol-900">
            <M>{T.latex(p)}</M>
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka
              cimke={T.pCimke}
              ertek={p}
              min={T.pMin}
              max={T.pMax}
              lepes={T.pLepes}
              tizedes={1}
              onChange={(v) => {
                setP(v);
                setMutat(lepesek);
              }}
            />
            <Csuszka
              cimke="Kezdőérték, a₁"
              ertek={a1}
              min={tipus === "heron" ? 0.5 : 0}
              max={6}
              lepes={0.25}
              tizedes={2}
              onChange={(v) => {
                setA1(v);
                setMutat(lepesek);
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => setJatszik(true)}
            disabled={jatszik}
            className="mt-3 rounded-lg bg-naracs-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-naracs-600 disabled:opacity-60"
          >
            ▶ Lépések lejátszása
          </button>

          <div className="finom-gorgeto mt-4 max-h-44 overflow-y-auto rounded-xl bg-petrol-50 p-3">
            <table className="szamok w-full text-[12.5px]">
              <thead className="text-[11px] font-semibold text-petrol-500">
                <tr>
                  <th className="pb-1 text-left font-semibold">n</th>
                  <th className="pb-1 text-right font-semibold">aₙ</th>
                  <th className="pb-1 text-right font-semibold">|aₙ − A|</th>
                </tr>
              </thead>
              <tbody>
                {sor.slice(0, Math.min(mutat, lepesek) + 1).map((x, k) => (
                  <tr key={k} className="border-t border-petrol-200">
                    <td className="py-0.5 text-left text-petrol-600">{k + 1}</td>
                    <td className="py-0.5 text-right text-petrol-900">{sz(x, 6)}</td>
                    <td className="py-0.5 text-right text-petrol-500">{sz(Math.abs(x - fix), 6)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3 text-[13px] leading-relaxed text-naracs-900">
            <p className="szamok">
              <M>{T.egyenlet(p)}</M>
            </p>
            <p className="mt-1">
              A pozitív gyök <span className="szamok font-semibold">A = {sz(fix, 6)}</span>
              {teljesult ? " — a sorozat gépi pontossággal el is érte." : "."}
            </p>
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            <strong>Vigyázz a sorrenddel:</strong> a fixpont-egyenlet felírása csak akkor jogos, ha már tudjuk, hogy a sorozat
            konvergens (monoton + korlátos). {T.magyarazat}
          </p>
        </div>
      </div>
    </div>
  );
}
