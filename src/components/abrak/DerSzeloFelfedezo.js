"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import FvRajz, { fvSkala } from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";

const FVEK = [
  {
    cimke: "x²",
    latex: "f(x) = x^2",
    fn: (x) => x * x,
    der: (x) => 2 * x,
    derLatex: "f'(x) = 2x",
    x: [-3, 3],
    y: [-1.2, 9.2],
    x0: 1,
    magyarazat: "A különbségi hányados pontosan 2x₀ + h — a h eltűnése látszik a számokból is.",
  },
  {
    cimke: "sin x",
    latex: "f(x) = \\sin x",
    fn: Math.sin,
    der: Math.cos,
    derLatex: "f'(x) = \\cos x",
    x: [-3.4, 3.4],
    y: [-1.6, 1.6],
    x0: 0.6,
    magyarazat: "A meredekség ott a legnagyobb, ahol a szinusz átmegy a nullán, és nulla a hullámhegyeken.",
  },
  {
    cimke: "√x",
    latex: "f(x) = \\sqrt{x}",
    fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    der: (x) => (x > 0 ? 1 / (2 * Math.sqrt(x)) : NaN),
    derLatex: "f'(x) = \\frac{1}{2\\sqrt{x}}",
    x: [-0.4, 5],
    y: [-0.7, 2.7],
    x0: 1,
    magyarazat: "A 0-hoz közeledve a meredekség minden határon túl nő: ott függőleges az érintő.",
  },
  {
    cimke: "|x|",
    latex: "f(x) = \\left|x\\right|",
    fn: Math.abs,
    der: (x) => (x > 0 ? 1 : x < 0 ? -1 : NaN),
    derLatex: "f'(x) = \\operatorname{sgn} x \\quad (x \\ne 0)",
    x: [-3, 3],
    y: [-0.8, 3.2],
    x0: 0,
    magyarazat: "Állítsd x₀-t pontosan 0-ra: a jobb oldali hányados 1, a bal oldali −1 — nincs derivált.",
  },
  {
    cimke: "x³",
    latex: "f(x) = x^3",
    fn: (x) => x * x * x,
    der: (x) => 3 * x * x,
    derLatex: "f'(x) = 3x^2",
    x: [-2.2, 2.2],
    y: [-6, 6],
    x0: 0.8,
    magyarazat: "A 0-ban a derivált 0, mégsincs szélsőérték — a görbe csak „megpihen”, aztán tovább nő.",
  },
];

export default function DerSzeloFelfedezo() {
  const [i, setI] = useState(0);
  const [x0, setX0] = useState(FVEK[0].x0);
  const [logH, setLogH] = useState(0.0); // h = 10^logH
  const [oldal, setOldal] = useState(1); // +1 jobb, −1 bal
  const svgRef = useRef(null);
  const huzasRef = useRef(false);

  const F = FVEK[i];
  const h = oldal * Math.round(Math.pow(10, logH) * 1000) / 1000;
  const S = fvSkala({ xMin: F.x[0], xMax: F.x[1], yMin: F.y[0], yMax: F.y[1] });

  const valt = (j) => {
    setI(j);
    setX0(FVEK[j].x0);
    setLogH(0);
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

  const y0 = F.fn(x0);
  const x1 = x0 + h;
  const y1 = F.fn(x1);
  const ervenyes = Number.isFinite(y0) && Number.isFinite(y1);
  const kulonbsegi = ervenyes ? (y1 - y0) / h : NaN;
  const derivalt = F.der(x0);
  const nincsDer = !Number.isFinite(derivalt);

  const gorbek = [{ fn: F.fn, szin: TEAL, cimke: F.cimke, vastag: 2.8 }];
  const egyenesek = [];
  if (Number.isFinite(derivalt)) {
    egyenesek.push({ m: derivalt, b: y0 - derivalt * x0, szin: NAR, vastag: 2.4 });
  }
  if (ervenyes && Math.abs(h) > 1e-6) {
    egyenesek.push({ m: kulonbsegi, b: y0 - kulonbsegi * x0, szin: LILA, vastag: 2, szaggatott: true });
  }

  const pontok = [{ x: x0, y: y0, szin: NAR, cimke: "P" }];
  if (ervenyes && Math.abs(h) > 1e-6) pontok.push({ x: x1, y: y1, szin: LILA, cimke: "Q" });

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
            egyenesek={egyenesek}
            pontok={pontok}
            className="abra w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              huzasRef.current = true;
              pozicio(e);
            }}
          >
            {(Sk) => (
              <g>
                {/* Δx és Δy jelölése */}
                {ervenyes && Math.abs(h) > 0.02 && (
                  <>
                    <line
                      x1={Sk.px(x0)}
                      y1={Sk.py(y0)}
                      x2={Sk.px(x1)}
                      y2={Sk.py(y0)}
                      stroke={SZURKE}
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                    />
                    <line
                      x1={Sk.px(x1)}
                      y1={Sk.py(y0)}
                      x2={Sk.px(x1)}
                      y2={Sk.py(y1)}
                      stroke={SZURKE}
                      strokeWidth="1.6"
                      strokeDasharray="4 3"
                    />
                    <text
                      x={(Sk.px(x0) + Sk.px(x1)) / 2}
                      y={Sk.py(y0) + 15}
                      textAnchor="middle"
                      fontSize="11.5"
                      fontWeight="700"
                      style={{ fill: SZURKE, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      Δx = {sz(h, 2)}
                    </text>
                    <text
                      x={Sk.px(x1) + (h > 0 ? 7 : -7)}
                      y={(Sk.py(y0) + Sk.py(y1)) / 2}
                      textAnchor={h > 0 ? "start" : "end"}
                      fontSize="11.5"
                      fontWeight="700"
                      style={{ fill: SZURKE, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                    >
                      Δy = {sz(y1 - y0, 2)}
                    </text>
                  </>
                )}
                {/* fogópont */}
                <circle
                  cx={Sk.px(x0)}
                  cy={Sk.py(Number.isFinite(y0) ? y0 : 0)}
                  r="11"
                  fill={NAR}
                  opacity="0.16"
                  style={{ cursor: "ew-resize" }}
                />
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a narancs pontot a görbén, és told a h csúszkát nulla felé. A lila szaggatott a szelő, a narancs az
            érintő.
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

          <div className="szamok mt-3 text-[15px] text-petrol-900">
            <M>{F.latex}</M>
          </div>

          <div className="mt-4 space-y-3">
            <Csuszka
              cimke="Az érintési pont, x₀"
              ertek={x0}
              min={F.x[0] + 0.1}
              max={F.x[1] - 0.1}
              lepes={0.05}
              tizedes={2}
              onChange={setX0}
            />
            <Csuszka
              cimke="A lépés nagysága, |Δx|"
              ertek={Math.abs(h)}
              min={0.01}
              max={2}
              lepes={0.001}
              tizedes={3}
              onChange={(v) => setLogH(Math.log10(Math.max(0.01, v)))}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[2, 1, 0.5, 0.1, 0.01].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setLogH(Math.log10(v))}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {sz(v, 2)}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setOldal((o) => -o)}
              className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-violet-700 ring-1 ring-violet-200 transition hover:bg-violet-50"
            >
              {oldal > 0 ? "→ jobbról" : "← balról"}
            </button>
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Különbségi hányados</p>
            <div className="szamok mt-2 text-[13.5px] text-petrol-800">
              <M>
                {`\\frac{f(${szK(x0, 2)} ${h >= 0 ? "+" : "-"} ${szK(Math.abs(h), 3)}) - f(${szK(x0, 2)})}{${
                  h >= 0 ? "" : "-"
                }${szK(Math.abs(h), 3)}} = ${ervenyes ? szK(kulonbsegi, 4) : "\\text{nem értelmes}"}`}
              </M>
            </div>
          </div>

          <div
            className={`mt-3 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${
              nincsDer ? "border-rose-200 bg-rose-50 text-rose-900" : "border-naracs-200 bg-naracs-50 text-naracs-900"
            }`}
          >
            {nincsDer ? (
              <>
                <span className="font-semibold">Itt nincs derivált.</span> A jobb oldali különbségi hányados{" "}
                <span className="szamok font-semibold">
                  {sz((F.fn(x0 + 0.0005) - F.fn(x0)) / 0.0005, 2)}
                </span>
                , a bal oldali{" "}
                <span className="szamok font-semibold">
                  {sz((F.fn(x0 - 0.0005) - F.fn(x0)) / -0.0005, 2)}
                </span>{" "}
                — a kettő nem egyenlő, tehát a határérték nem létezik.
              </>
            ) : (
              <>
                <span className="szamok font-semibold">
                  f′({sz(x0, 2)}) = {sz(derivalt, 4)}
                </span>
                <br />
                Eltérés a szelőtől:{" "}
                <span className="szamok font-semibold">{ervenyes ? sz(Math.abs(kulonbsegi - derivalt), 4) : "–"}</span>.
                Ha a lépést tizedére csökkented, ez az eltérés is nagyjából tizedére esik.
              </>
            )}
          </div>

          <div className="szamok mt-3 text-[13px] text-petrol-600">
            <M>{F.derLatex}</M>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-petrol-500">{F.magyarazat}</p>
        </div>
      </div>
    </div>
  );
}
