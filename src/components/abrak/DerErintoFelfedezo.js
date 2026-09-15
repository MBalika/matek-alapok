"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz, { fvSkala } from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";

/* A rajzterület aránya a FvRajz margói után: 500 × 330 képpont. */
const ARANY = 330 / 500;

const FVEK = [
  {
    cimke: "x²",
    latex: "f(x) = x^2",
    derLatex: "f'(x) = 2x",
    fn: (x) => x * x,
    der: (x) => 2 * x,
    x: [-3.2, 3.2],
    y: [-3, 9],
    x0: 3,
    hol: "A (3; 9) pontban f′(3) = 6, tehát az érintő y = 6x − 9 — pont a jegyzet 1. példája.",
  },
  {
    cimke: "x³ − 2x",
    latex: "f(x) = x^3-2x",
    derLatex: "f'(x) = 3x^2-2",
    fn: (x) => x * x * x - 2 * x,
    der: (x) => 3 * x * x - 2,
    x: [-2.4, 2.4],
    y: [-4, 4],
    x0: 1,
    hol: "Az x₀ = 1 helyen f(1) = −1 és f′(1) = 1: az érintő y = x − 2, a normális y = −x (a KF‑2 feladata).",
  },
  {
    cimke: "ln x",
    latex: "f(x) = \\ln x",
    derLatex: "f'(x) = \\frac1x",
    fn: (x) => (x > 0 ? Math.log(x) : NaN),
    der: (x) => (x > 0 ? 1 / x : NaN),
    x: [-0.4, 5.2],
    y: [-3, 3],
    x0: 1,
    hol: "Az 1-ben az érintő y = x − 1: innen látszik, hogy kis t-re ln(1 + t) ≈ t.",
  },
  {
    cimke: "sin x",
    latex: "f(x) = \\sin x",
    derLatex: "f'(x) = \\cos x",
    fn: Math.sin,
    der: Math.cos,
    x: [-6.3, 6.3],
    y: [-2.2, 2.2],
    x0: 0,
    hol: "A 0-ban az érintő y = x — ezért használható kis szögekre a sin x ≈ x közelítés.",
  },
  {
    cimke: "eˣ",
    latex: "f(x) = e^x",
    derLatex: "f'(x) = e^x",
    fn: Math.exp,
    der: Math.exp,
    x: [-3, 2.2],
    y: [-2, 8],
    x0: 0,
    hol: "A 0-ban az érintő y = x + 1 — ez a lineáris közelítés, és egyben az eˣ ≥ 1 + x egyenlőtlenség érintője.",
  },
];

export default function DerErintoFelfedezo() {
  const [i, setI] = useState(1);
  const [x0, setX0] = useState(FVEK[1].x0);
  const [normalis, setNormalis] = useState(true);
  const [azonosLeptek, setAzonosLeptek] = useState(false);
  const svgRef = useRef(null);
  const huzasRef = useRef(false);

  const F = FVEK[i];
  const y0n = F.fn(x0);
  const mn = F.der(x0);

  let yMin = F.y[0];
  let yMax = F.y[1];
  if (azonosLeptek && Number.isFinite(y0n)) {
    const fel = ((F.x[1] - F.x[0]) * ARANY) / 2;
    yMin = y0n - fel;
    yMax = y0n + fel;
  }
  const S = fvSkala({ xMin: F.x[0], xMax: F.x[1], yMin, yMax });

  const valt = (j) => {
    setI(j);
    setX0(FVEK[j].x0);
  };

  const pozicio = useCallback(
    (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 560;
      const ujX = Math.max(F.x[0] + 0.1, Math.min(F.x[1] - 0.1, S.xBol(mx)));
      setX0(Math.round(ujX * 20) / 20);
    },
    [F, S],
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

  const y0 = y0n;
  const m = mn;
  const ervenyes = Number.isFinite(y0) && Number.isFinite(m);
  const vanNormalis = ervenyes && Math.abs(m) > 1e-9;
  const mN = vanNormalis ? -1 / m : NaN;

  const egyenesek = [];
  if (ervenyes) egyenesek.push({ m, b: y0 - m * x0, szin: NAR, vastag: 2.6 });
  if (normalis && vanNormalis) egyenesek.push({ m: mN, b: y0 - mN * x0, szin: LILA, vastag: 2, szaggatott: true });

  /* A tengelymetszetek az érintőn. */
  const yMetszet = ervenyes ? y0 - m * x0 : NaN;
  const xMetszet = ervenyes && Math.abs(m) > 1e-9 ? x0 - y0 / m : NaN;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            svgRef={svgRef}
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={yMin}
            yMax={yMax}
            gorbek={[{ fn: F.fn, szin: TEAL, cimke: F.cimke, vastag: 2.8 }]}
            egyenesek={egyenesek}
            pontok={ervenyes ? [{ x: x0, y: y0, szin: NAR, cimke: "P₀", dx: 10, dy: -10 }] : []}
            className="abra w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              huzasRef.current = true;
              pozicio(e);
            }}
          >
            {(Sk) =>
              ervenyes && (
                <g>
                  <circle cx={Sk.px(x0)} cy={Sk.py(y0)} r="11" fill={NAR} opacity="0.16" />
                  <text
                    x={52}
                    y={34}
                    fontSize="12"
                    fontWeight="700"
                    style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    — érintő
                  </text>
                  {normalis && vanNormalis && (
                    <text
                      x={52}
                      y={52}
                      fontSize="12"
                      fontWeight="700"
                      style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      — normális
                    </text>
                  )}
                </g>
              )
            }
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            {azonosLeptek
              ? "Azonos lépték: most tényleg derékszöget zár be az érintő és a normális."
              : "A két tengely léptéke különbözik, ezért a merőlegesség nem látszik derékszögnek — kapcsold be az azonos léptéket!"}
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Függvény</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {FVEK.map((k, j) => (
              <button
                key={k.cimke}
                type="button"
                onClick={() => valt(j)}
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

          <div className="szamok mt-3 space-y-1 text-[14px] text-petrol-900">
            <M>{F.latex}</M>
            <div className="text-petrol-600">
              <M>{F.derLatex}</M>
            </div>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">Az érintési hely, x₀</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {sz(x0, 2)}
              </span>
            </span>
            <input
              type="range"
              min={F.x[0] + 0.1}
              max={F.x[1] - 0.1}
              step={0.05}
              value={x0}
              onChange={(e) => setX0(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <div className="mt-3 flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setNormalis((v) => !v)}
              className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-violet-700 ring-1 ring-violet-200 transition hover:bg-violet-50"
            >
              {normalis ? "Normális elrejtése" : "Normális megmutatása"}
            </button>
            <button
              type="button"
              onClick={() => setAzonosLeptek((v) => !v)}
              className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium ring-1 transition ${
                azonosLeptek
                  ? "bg-petrol-700 text-white ring-petrol-700"
                  : "bg-white text-petrol-600 ring-petrol-200 hover:bg-petrol-50"
              }`}
            >
              Azonos lépték
            </button>
          </div>

          {ervenyes ? (
            <>
              <div className="mt-4 rounded-xl border border-naracs-200 bg-naracs-50 p-4">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-naracs-700 uppercase">Az érintő</p>
                <div className="szamok finom-gorgeto mt-1.5 space-y-1 overflow-x-auto text-[13.5px] text-naracs-900">
                  <div>
                    <M>{`y = f'(x_0)(x-x_0)+f(x_0)`}</M>
                  </div>
                  <div>
                    <M>{`y = ${szK(m, 3)}\\,(x ${x0 >= 0 ? "-" : "+"} ${szK(Math.abs(x0), 2)}) ${
                      y0 >= 0 ? "+" : "-"
                    } ${szK(Math.abs(y0), 3)}`}</M>
                  </div>
                  <div>
                    <M>{`y = ${szK(m, 3)}x ${yMetszet >= 0 ? "+" : "-"} ${szK(Math.abs(yMetszet), 3)}`}</M>
                  </div>
                </div>
              </div>

              <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 p-4">
                <p className="text-[10.5px] font-bold tracking-[0.16em] text-violet-700 uppercase">A normális</p>
                {vanNormalis ? (
                  <div className="szamok finom-gorgeto mt-1.5 space-y-1 overflow-x-auto text-[13.5px] text-violet-900">
                    <div>
                      <M>{`y = -\\frac{1}{f'(x_0)}(x-x_0)+f(x_0)`}</M>
                    </div>
                    <div>
                      <M>{`y = ${szK(mN, 3)}\\,(x ${x0 >= 0 ? "-" : "+"} ${szK(Math.abs(x0), 2)}) ${
                        y0 >= 0 ? "+" : "-"
                      } ${szK(Math.abs(y0), 3)}`}</M>
                    </div>
                  </div>
                ) : (
                  <p className="mt-1.5 text-[13px] text-violet-900">
                    Itt f′(x₀) = 0, az érintő vízszintes — a normális <strong>függőleges</strong>, egyenlete x ={" "}
                    {sz(x0, 2)}. Meredekségről ilyenkor nem beszélhetünk.
                  </p>
                )}
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[12.5px]">
                <div className="rounded-xl border border-petrol-200 bg-white px-3 py-2">
                  <p className="text-petrol-500">Az érintő y-metszete</p>
                  <p className="szamok text-[14px] font-semibold text-petrol-900">{sz(yMetszet, 3)}</p>
                </div>
                <div className="rounded-xl border border-petrol-200 bg-white px-3 py-2">
                  <p className="text-petrol-500">Az érintő x-metszete</p>
                  <p className="szamok text-[14px] font-semibold text-petrol-900">
                    {Number.isFinite(xMetszet) ? sz(xMetszet, 3) : "nincs"}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-[13px] text-rose-900">
              Ezen a helyen a függvény nincs értelmezve — húzd a pontot az értelmezési tartományba.
            </p>
          )}

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{F.hol}</p>
        </div>
      </div>
    </div>
  );
}
