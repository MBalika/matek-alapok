"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FvRajz, { fvSkala } from "./FvRajz";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";

const FVEK = [
  {
    cimke: "x³ − 3x",
    latex: "f(x) = x^3-3x",
    fn: (x) => x * x * x - 3 * x,
    der: (x) => 3 * x * x - 3,
    x: [-2.6, 2.6],
    y: [-5, 5],
    a: -2,
    b: 2,
    sima: true,
    uzenet: "Szimmetrikus szakaszon a húr vízszintes — ilyenkor a Lagrange-tétel épp Rolle tétele, és két ξ is adódik.",
  },
  {
    cimke: "ln x",
    latex: "f(x) = \\ln x",
    fn: (x) => (x > 0 ? Math.log(x) : NaN),
    der: (x) => (x > 0 ? 1 / x : NaN),
    x: [-0.2, 5.4],
    y: [-2.2, 2.4],
    a: 1,
    b: 2.7,
    sima: true,
    uzenet: "Az [1; e] szakaszon a jegyzet feladata: f′(c) = 1/(e−1), tehát c = e − 1 ≈ 1,718 — tényleg 1 és e között.",
  },
  {
    cimke: "sin x",
    latex: "f(x) = \\sin x",
    fn: Math.sin,
    der: Math.cos,
    x: [-0.6, 6.9],
    y: [-1.7, 1.7],
    a: 0,
    b: 3.14,
    sima: true,
    uzenet: "A [0; π] szakaszon a húr vízszintes: a ξ a π/2, ahol a szinusznak maximuma van.",
  },
  {
    cimke: "√x",
    latex: "f(x) = \\sqrt{x}",
    fn: (x) => (x >= 0 ? Math.sqrt(x) : NaN),
    der: (x) => (x > 0 ? 1 / (2 * Math.sqrt(x)) : NaN),
    x: [-0.3, 6],
    y: [-0.6, 3],
    a: 0.2,
    b: 4,
    sima: true,
    uzenet: "Konkáv függvénynél a ξ mindig a szakasz bal feléhez közelebb esik: ott a legmeredekebb a görbe.",
  },
  {
    cimke: "|x| (töréssel)",
    latex: "f(x) = \\left|x\\right|",
    fn: Math.abs,
    der: (x) => (x > 0 ? 1 : x < 0 ? -1 : NaN),
    x: [-2.6, 2.6],
    y: [-0.8, 2.8],
    a: -1.5,
    b: 2,
    sima: false,
    uzenet:
      "Itt a tétel feltétele sérül: a 0-ban nincs derivált. Ha az intervallum tartalmazza a 0-t, hiába keresel ξ-t — nincs.",
  },
];

/** Azok a ξ ∈ (a;b) helyek, ahol f′(ξ) = m. Előjelváltás-keresés, majd felezés. */
function ksziKeres(der, a, b, m) {
  const g = (x) => der(x) - m;
  const db = 900;
  const talalt = [];
  let elozoX = null;
  let elozoG = null;
  for (let i = 0; i <= db; i++) {
    const x = a + ((b - a) * i) / db;
    const gx = g(x);
    if (!Number.isFinite(gx)) {
      elozoX = null;
      elozoG = null;
      continue;
    }
    if (Math.abs(gx) < 1e-12) {
      if (x > a + 1e-9 && x < b - 1e-9) talalt.push(x);
    } else if (elozoG !== null && elozoG * gx < 0) {
      let lo = elozoX;
      let hi = x;
      let glo = elozoG;
      for (let k = 0; k < 60; k++) {
        const kz = (lo + hi) / 2;
        const gk = g(kz);
        if (glo * gk <= 0) hi = kz;
        else {
          lo = kz;
          glo = gk;
        }
      }
      talalt.push((lo + hi) / 2);
    }
    elozoX = x;
    elozoG = gx;
  }
  // duplikátumok kiszűrése, és csak azok maradnak, ahol a derivált tényleg létezik és egyenlő m-mel
  // (a |x| töréspontján az előjelváltás-keresés „talál” egy helyet, pedig ott nincs is derivált)
  const ki = [];
  talalt.sort((p, q) => p - q);
  for (const v of talalt) {
    const dv = der(v);
    if (!Number.isFinite(dv) || Math.abs(dv - m) > 1e-4) continue;
    if (ki.length === 0 || Math.abs(v - ki[ki.length - 1]) > (b - a) * 0.01) ki.push(v);
  }
  return ki;
}

export default function DerLagrangeFelfedezo() {
  const [i, setI] = useState(0);
  const [a, setA] = useState(FVEK[0].a);
  const [b, setB] = useState(FVEK[0].b);
  const svgRef = useRef(null);
  const huzasRef = useRef(null); // "a" | "b" | null

  const F = FVEK[i];
  const S = fvSkala({ xMin: F.x[0], xMax: F.x[1], yMin: F.y[0], yMax: F.y[1] });

  const valt = (j) => {
    setI(j);
    setA(FVEK[j].a);
    setB(FVEK[j].b);
  };

  const pozicio = useCallback(
    (e, melyik) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * 560;
      let ujX = Math.max(F.x[0] + 0.05, Math.min(F.x[1] - 0.05, S.xBol(mx)));
      ujX = Math.round(ujX * 50) / 50;
      const cel = melyik ?? (Math.abs(ujX - a) < Math.abs(ujX - b) ? "a" : "b");
      if (cel === "a") setA(Math.min(ujX, b - 0.2));
      else setB(Math.max(ujX, a + 0.2));
      return cel;
    },
    [F, S, a, b],
  );

  useEffect(() => {
    const mozgas = (e) => {
      if (huzasRef.current) pozicio(e, huzasRef.current);
    };
    const vege = () => {
      huzasRef.current = null;
    };
    window.addEventListener("pointermove", mozgas);
    window.addEventListener("pointerup", vege);
    return () => {
      window.removeEventListener("pointermove", mozgas);
      window.removeEventListener("pointerup", vege);
    };
  }, [pozicio]);

  const fa = F.fn(a);
  const fb = F.fn(b);
  const ervenyes = Number.isFinite(fa) && Number.isFinite(fb) && b > a;
  const m = ervenyes ? (fb - fa) / (b - a) : NaN;
  const rolle = ervenyes && Math.abs(fb - fa) < 1e-6;

  const kszik = useMemo(() => (ervenyes ? ksziKeres(F.der, a, b, m) : []), [F, a, b, m, ervenyes]);

  const egyenesek = [];
  if (ervenyes) egyenesek.push({ x1: a, y1: fa, x2: b, y2: fb, szin: LILA, vastag: 2.6 });
  kszik.forEach((k) => {
    const yk = F.fn(k);
    const w = (F.x[1] - F.x[0]) * 0.16;
    egyenesek.push({ x1: k - w, y1: yk - m * w, x2: k + w, y2: yk + m * w, szin: NAR, vastag: 2.4 });
  });

  const pontok = [];
  if (ervenyes) {
    pontok.push({ x: a, y: fa, szin: LILA, cimke: "a", dx: -6, dy: 18 });
    pontok.push({ x: b, y: fb, szin: LILA, cimke: "b", dx: 4, dy: 18 });
  }
  kszik.forEach((k) => pontok.push({ x: k, y: F.fn(k), szin: NAR, r: 5.2 }));

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
            gorbek={[{ fn: F.fn, szin: TEAL, cimke: F.cimke, vastag: 2.8 }]}
            egyenesek={egyenesek}
            pontok={pontok}
            className="abra w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              huzasRef.current = pozicio(e) ?? null;
            }}
          >
            {(Sk) => (
              <g>
                {ervenyes && (
                  <>
                    <line
                      x1={Sk.px(a)}
                      y1={Sk.py(fa)}
                      x2={Sk.px(a)}
                      y2={Sk.margo.fel + Sk.h}
                      stroke={SZURKE}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <line
                      x1={Sk.px(b)}
                      y1={Sk.py(fb)}
                      x2={Sk.px(b)}
                      y2={Sk.margo.fel + Sk.h}
                      stroke={SZURKE}
                      strokeWidth="1"
                      strokeDasharray="3 3"
                    />
                    <circle cx={Sk.px(a)} cy={Sk.py(fa)} r="11" fill={LILA} opacity="0.16" />
                    <circle cx={Sk.px(b)} cy={Sk.py(fb)} r="11" fill={LILA} opacity="0.16" />
                  </>
                )}
                {kszik.map((k, j) => (
                  <text
                    key={j}
                    x={Sk.px(k)}
                    y={Sk.margo.fel + Sk.h - 6}
                    textAnchor="middle"
                    fontSize="12"
                    fontWeight="700"
                    style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    ξ{kszik.length > 1 ? (j === 0 ? "₁" : "₂") : ""} = {sz(k, 2)}
                  </text>
                ))}
              </g>
            )}
          </FvRajz>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd az <strong>a</strong> és <strong>b</strong> végpontot. A lila szakasz a húr, a narancs érintők
            párhuzamosak vele.
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

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="block">
              <span className="mb-1 flex items-baseline justify-between">
                <span className="text-[12.5px] font-medium text-petrol-600">a</span>
                <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12px] font-semibold text-petrol-800">
                  {sz(a, 2)}
                </span>
              </span>
              <input
                type="range"
                min={F.x[0] + 0.05}
                max={F.x[1] - 0.25}
                step={0.02}
                value={a}
                onChange={(e) => setA(Math.min(Number(e.target.value), b - 0.2))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
              />
            </label>
            <label className="block">
              <span className="mb-1 flex items-baseline justify-between">
                <span className="text-[12.5px] font-medium text-petrol-600">b</span>
                <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12px] font-semibold text-petrol-800">
                  {sz(b, 2)}
                </span>
              </span>
              <input
                type="range"
                min={F.x[0] + 0.25}
                max={F.x[1] - 0.05}
                step={0.02}
                value={b}
                onChange={(e) => setB(Math.max(Number(e.target.value), a + 0.2))}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
              />
            </label>
          </div>

          {ervenyes ? (
            <div className="mt-4 rounded-xl bg-petrol-50 p-4">
              <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">A húr meredeksége</p>
              <div className="szamok mt-1.5 text-[13.5px] text-petrol-800">
                <M>{`\\frac{f(b)-f(a)}{b-a} = \\frac{${szK(fb, 3)} - (${szK(fa, 3)})}{${szK(b, 2)} - (${szK(
                  a,
                  2,
                )})} = ${szK(m, 4)}`}</M>
              </div>
            </div>
          ) : (
            <p className="mt-4 text-[13px] text-rose-700">A szakasz kilóg az értelmezési tartományból.</p>
          )}

          <div
            className={`mt-3 rounded-xl border px-4 py-3 text-[13.5px] leading-relaxed ${
              kszik.length > 0
                ? "border-naracs-200 bg-naracs-50 text-naracs-900"
                : "border-rose-200 bg-rose-50 text-rose-900"
            }`}
          >
            {kszik.length > 0 ? (
              <>
                <span className="font-semibold">
                  {kszik.length === 1 ? "Egy ilyen hely van" : `${kszik.length} ilyen hely van`}:
                </span>{" "}
                <span className="szamok">
                  {kszik.map((k) => `ξ = ${sz(k, 4)}`).join(" · ")}
                </span>
                <br />
                Itt <span className="szamok">f′(ξ) = {sz(m, 4)}</span> — pontosan a húr meredeksége.
                {rolle && (
                  <>
                    {" "}
                    Mivel <span className="szamok">f(a) = f(b)</span>, ez most a <strong>Rolle-tétel</strong> esete:
                    vízszintes érintő.
                  </>
                )}
              </>
            ) : (
              <>
                <span className="font-semibold">Nincs ilyen ξ.</span> A tétel feltétele sérül: a{" "}
                {F.sima ? "szakasz kilóg az értelmezési tartományból" : "függvény a 0-ban nem differenciálható (csúcs)"}
                . A Lagrange-tétel <em>feltételekhez kötött</em> állítás — a következtetés csak akkor jár.
              </>
            )}
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{F.uzenet}</p>
        </div>
      </div>
    </div>
  );
}
