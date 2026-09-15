"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz, { fvSkala } from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";

const FVEK = [
  {
    cimke: "x²",
    f: "f(x) = x^2",
    d: "f'(x) = 2x",
    fn: (x) => x * x,
    der: (x) => 2 * x,
    x: [-3, 3],
    y: [-6.5, 9.5],
    x0: 1.2,
    mit: "A derivált egyenes: a parabola meredeksége egyenletesen nő. A 0-ban vízszintes az érintő, és f′ ott metszi a tengelyt.",
  },
  {
    cimke: "x³ − 3x",
    f: "f(x) = x^3-3x",
    d: "f'(x) = 3x^2-3",
    fn: (x) => x * x * x - 3 * x,
    der: (x) => 3 * x * x - 3,
    x: [-2.6, 2.6],
    y: [-6, 8],
    x0: 0.5,
    mit: "Az f′ két zérushelye (±1) pontosan az f két szélsőértékhelye. Ahol f′ negatív, ott f csökken.",
  },
  {
    cimke: "sin x",
    f: "f(x) = \\sin x",
    d: "f'(x) = \\cos x",
    fn: Math.sin,
    der: Math.cos,
    x: [-6.4, 6.4],
    y: [-1.8, 1.8],
    x0: 0.8,
    mit: "A koszinusz nem más, mint a szinusz meredeksége: a hullámhegyeken 0, a nullátmeneteknél ±1.",
  },
  {
    cimke: "eˣ",
    f: "f(x) = e^x",
    d: "f'(x) = e^x",
    fn: Math.exp,
    der: Math.exp,
    x: [-2.6, 2.2],
    y: [-1.5, 9],
    x0: 0.6,
    mit: "A két görbe egybeesik: az eˣ az egyetlen olyan exponenciális, amelynek a deriváltja pontosan önmaga.",
  },
  {
    cimke: "ln x",
    f: "f(x) = \\ln x",
    d: "f'(x) = \\frac1x",
    fn: (x) => (x > 0 ? Math.log(x) : NaN),
    der: (x) => (x > 0 ? 1 / x : NaN),
    x: [-0.3, 5],
    y: [-3, 5],
    x0: 1,
    mit: "Az 1-ben a meredekség pontosan 1 — ezért érvényes kis t-re az ln(1+t) ≈ t közelítés.",
  },
  {
    cimke: "√x",
    f: "f(x) = \\sqrt{x}",
    d: "f'(x) = \\frac{1}{2\\sqrt{x}}",
    fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    der: (x) => (x > 0 ? 1 / (2 * Math.sqrt(x)) : NaN),
    x: [-0.3, 6],
    y: [-0.6, 3.4],
    x0: 1,
    mit: "A 0 közelében a derivált a végtelenbe szalad: ott függőleges az érintő, a 4-ben viszont már csak 0,25.",
  },
  {
    cimke: "1/x",
    f: "f(x) = \\frac1x",
    d: "f'(x) = -\\frac{1}{x^2}",
    fn: (x) => 1 / x,
    der: (x) => -1 / (x * x),
    x: [-3.2, 3.2],
    y: [-4.5, 4.5],
    x0: 1.4,
    mit: "A derivált mindenütt negatív: a hiperbola mindkét ágán szigorúan csökken (de nem az egész számegyenesen!).",
  },
  {
    cimke: "arctg x",
    f: "f(x) = \\operatorname{arctg} x",
    d: "f'(x) = \\frac{1}{1+x^2}",
    fn: Math.atan,
    der: (x) => 1 / (1 + x * x),
    x: [-5, 5],
    y: [-2, 2],
    x0: 0.8,
    mit: "A derivált harang alakú és mindig pozitív — az arctg szigorúan nő, de a meredeksége gyorsan nullához tart.",
  },
];

export default function DerTablazatFelfedezo() {
  const [i, setI] = useState(0);
  const [x0, setX0] = useState(FVEK[0].x0);
  const [derLathato, setDerLathato] = useState(true);
  const svgRef = useRef(null);
  const huzasRef = useRef(false);

  const F = FVEK[i];
  const S = fvSkala({ xMin: F.x[0], xMax: F.x[1], yMin: F.y[0], yMax: F.y[1] });

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
      const ujX = Math.max(F.x[0] + 0.08, Math.min(F.x[1] - 0.08, S.xBol(mx)));
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

  const y0 = F.fn(x0);
  const m = F.der(x0);
  const ervenyes = Number.isFinite(y0) && Number.isFinite(m);

  const gorbek = [{ fn: F.fn, szin: TEAL, cimke: "f", vastag: 2.8 }];
  if (derLathato) gorbek.push({ fn: F.der, szin: LILA, cimke: "f ′", vastag: 2.2 });

  const pontok = [];
  if (ervenyes) {
    // ha a derivált értéke (lila pont) fölötte van, a P felirat alulra kerül — így nem fedik egymást
    pontok.push({ x: x0, y: y0, szin: NAR, cimke: "P", dx: 9, dy: derLathato && m > y0 ? 18 : -9 });
    if (derLathato) pontok.push({ x: x0, y: m, szin: LILA, r: 4 });
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <FvRajz
            svgRef={svgRef}
            xMin={F.x[0]}
            xMax={F.x[1]}
            yMin={F.y[0]}
            yMax={F.y[1]}
            gorbek={gorbek}
            egyenesek={ervenyes ? [{ m, b: y0 - m * x0, szin: NAR, vastag: 2.4 }] : []}
            pontok={pontok}
            className="abra w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              huzasRef.current = true;
              pozicio(e);
            }}
          >
            {(Sk) =>
              ervenyes && (
                <g>
                  {derLathato && (
                    <line
                      x1={Sk.px(x0)}
                      y1={Sk.py(y0)}
                      x2={Sk.px(x0)}
                      y2={Sk.py(m)}
                      stroke={SZURKE}
                      strokeWidth="1.4"
                      strokeDasharray="4 3"
                    />
                  )}
                  <circle cx={Sk.px(x0)} cy={Sk.py(y0)} r="11" fill={NAR} opacity="0.16" />
                  {derLathato && (
                    <text
                      x={Sk.px(x0) + 9}
                      y={Sk.py(m) + 4}
                      fontSize="11.5"
                      fontWeight="700"
                      style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      f ′(x₀) = {sz(m, 2)}
                    </text>
                  )}
                </g>
              )
            }
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a narancs pontot. Az érintő <strong>meredeksége</strong> fent, ugyanez a szám <strong>magasságként</strong>{" "}
            a lila görbén.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Alapfüggvény</p>
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

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <div className="szamok text-[15px]" style={{ color: TEAL }}>
              <M>{F.f}</M>
            </div>
            <div className="szamok mt-2 text-[15px]" style={{ color: LILA }}>
              <M>{F.d}</M>
            </div>
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">Az érintési pont, x₀</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                {sz(x0, 2)}
              </span>
            </span>
            <input
              type="range"
              min={F.x[0] + 0.08}
              max={F.x[1] - 0.08}
              step={0.05}
              value={x0}
              onChange={(e) => setX0(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <button
            type="button"
            onClick={() => setDerLathato((v) => !v)}
            className="mt-3 rounded-lg bg-white px-3 py-1.5 text-[12px] font-medium text-violet-700 ring-1 ring-violet-200 transition hover:bg-violet-50"
          >
            {derLathato ? "A derivált görbe elrejtése" : "Mutasd a derivált görbét"}
          </button>

          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-petrol-200 bg-white px-3 py-2">
              <p className="text-[11px] text-petrol-500">f(x₀)</p>
              <p className="szamok text-[15px] font-semibold" style={{ color: TEAL }}>
                {ervenyes ? sz(y0, 3) : "–"}
              </p>
            </div>
            <div className="rounded-xl border border-petrol-200 bg-white px-3 py-2">
              <p className="text-[11px] text-petrol-500">f ′(x₀) = meredekség</p>
              <p className="szamok text-[15px] font-semibold" style={{ color: LILA }}>
                {ervenyes ? sz(m, 3) : "–"}
              </p>
            </div>
          </div>

          {ervenyes && (
            <div className="szamok mt-3 rounded-xl border border-naracs-200 bg-naracs-50 px-4 py-3 text-[13.5px] text-naracs-900">
              <M>{`y = ${szK(m, 3)}\\,(x - ${szK(x0, 2)}) ${y0 >= 0 ? "+" : "-"} ${szK(Math.abs(y0), 3)}`}</M>
            </div>
          )}

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{F.mit}</p>
        </div>
      </div>
    </div>
  );
}
