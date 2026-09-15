"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const ZOLD = "#15803d";
const SZURKE = "#64748b";

const SZ = 560;
const MA = 400;

/* ---------- a tartományok sokszögként (a súlypont a sokszög-képletből jön) ---------- */

function gorbeAlatt(fn, a, b, db = 160) {
  const p = [[a, 0]];
  for (let k = 0; k <= db; k++) {
    const x = a + ((b - a) * k) / db;
    p.push([x, Math.max(0, fn(x))]);
  }
  p.push([b, 0]);
  return p;
}

const TARTOMANYOK = [
  {
    cimke: "félkörlap",
    poly: (() => {
      const p = [];
      const R = 2;
      for (let k = 0; k <= 180; k++) {
        const t = (Math.PI * k) / 180;
        p.push([R * Math.cos(t), R * Math.sin(t)]);
      }
      return p;
    })(),
    kepletek: [
      "T=\\frac{R^2\\pi}{2}=2\\pi\\approx 6{,}283",
      "y_s=\\frac{4R}{3\\pi}=\\frac{8}{3\\pi}\\approx 0{,}849",
    ],
    magyarazat:
      "A 34. példa R = 2-vel: a félkörlap súlypontja a sugár 4/(3π) ≈ 42,4 %-ánál van, nem a felénél. Ezt a számot a statikában fejből illik tudni.",
  },
  {
    cimke: "sin-domb",
    poly: gorbeAlatt(Math.sin, 0, Math.PI),
    kepletek: ["T=\\int_0^\\pi \\sin x\\,dx = 2", "S=\\left(\\frac{\\pi}{2};\\ \\frac{\\pi}{8}\\right)"],
    magyarazat:
      "A 33. példa. Az xₛ = π/2 a szimmetriából is látszik; az yₛ = π/8 ≈ 0,393 viszont csak az ½∫f² nyomatékból jön ki — és jól mutatja, hogy a súlypont jóval a maximum (1) alatt van.",
  },
  {
    cimke: "háromszög",
    poly: [
      [0, 0],
      [3, 0],
      [3, 3],
    ],
    kepletek: ["T=\\frac{3\\cdot3}{2}=4{,}5", "S=\\left(2;\\ 1\\right)"],
    magyarazat:
      "A gyakorlófeladatok 14. példájának nagyított mása (y = x az x = 3-ig): a súlypont a csúcsok átlaga, vagyis (2; 1) — és ugyanez jön ki az integrálokból is.",
  },
  {
    cimke: "parabola-szelet",
    poly: gorbeAlatt((x) => 4 - x * x, -2, 2),
    kepletek: ["T=\\int_{-2}^{2}\\left(4-x^2\\right)dx=\\frac{32}{3}", "y_s=\\frac{8}{5}=1{,}6"],
    magyarazat:
      "Szimmetria miatt xₛ = 0. Az yₛ = 8/5 = 1,6, vagyis a magasság 40 %-a — a parabolaszelet „laposabb”, mint a háromszög.",
  },
  {
    cimke: "T-keresztmetszet",
    poly: [
      [-2, 0],
      [2, 0],
      [2, 3],
      [3.5, 3],
      [3.5, 4],
      [-3.5, 4],
      [-3.5, 3],
      [-2, 3],
    ],
    kepletek: ["T=4\\cdot3+7\\cdot1=19", "y_s=\\frac{12\\cdot1{,}5+7\\cdot3{,}5}{19}\\approx 2{,}237"],
    magyarazat:
      "Összetett keresztmetszet: két téglalapra bontjuk, és a nyomatékokat adjuk össze. Sy és Sx additív — épp ezért érdemes velük számolni, nem közvetlenül a súlypontokkal.",
  },
  {
    cimke: "L-keresztmetszet",
    poly: [
      [-2.5, 0],
      [2.5, 0],
      [2.5, 1.2],
      [-1.3, 1.2],
      [-1.3, 4],
      [-2.5, 4],
    ],
    kepletek: [
      "T=5\\cdot1{,}2+1{,}2\\cdot2{,}8=9{,}36",
      "x_s=\\frac{6\\cdot0+3{,}36\\cdot(-1{,}9)}{9{,}36}\\approx -0{,}682",
      "y_s=\\frac{6\\cdot0{,}6+3{,}36\\cdot2{,}6}{9{,}36}\\approx 1{,}318",
    ],
    magyarazat:
      "Az L-szelvény súlypontja a szelvényen KÍVÜL is eshetne (itt épp nem) — ez a legfontosabb tanulság: a súlypont nem a „közép”, hanem a nyomatékok hányadosa.",
  },
];

/** Sokszög területe és súlypontja (Gauss-képlet). */
function sokszogAdat(poly) {
  let A = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    const k = x1 * y2 - x2 * y1;
    A += k;
    cx += (x1 + x2) * k;
    cy += (y1 + y2) * k;
  }
  A /= 2;
  return { T: Math.abs(A), xs: cx / (6 * A), ys: cy / (6 * A) };
}

export default function HoSulypontFelfedezo() {
  const [i, setI] = useState(0);
  const T = TARTOMANYOK[i];
  const adat = sokszogAdat(T.poly);
  const [xp, setXp] = useState(-1.2);
  const svgRef = useRef(null);
  const huzas = useRef(false);

  /* képernyő-leképezés: a tartomány beleigazítva a rajzterületbe */
  const xs = T.poly.map((p) => p[0]);
  const ys = T.poly.map((p) => p[1]);
  const xMin = Math.min(...xs);
  const xMax = Math.max(...xs);
  const yMax = Math.max(...ys);
  const k = Math.min(320 / (xMax - xMin), 140 / (yMax || 1));
  const ox = SZ / 2 - ((xMin + xMax) / 2) * k;
  const oy = 262;
  const px = (x) => ox + x * k;
  const py = (y) => oy - y * k;

  const valt = (j) => {
    setI(j);
    const a = sokszogAdat(TARTOMANYOK[j].poly);
    setXp(Math.round((a.xs - 1.1) * 100) / 100);
  };

  const pozicio = useCallback(
    (e) => {
      const svg = svgRef.current;
      if (!svg) return;
      const r = svg.getBoundingClientRect();
      const mx = ((e.clientX - r.left) / r.width) * SZ;
      setXp(Math.round(((mx - ox) / k) * 100) / 100);
    },
    [ox, k],
  );

  useEffect(() => {
    const mozgas = (e) => {
      if (huzas.current) pozicio(e);
    };
    const vege = () => {
      huzas.current = false;
    };
    window.addEventListener("pointermove", mozgas);
    window.addEventListener("pointerup", vege);
    return () => {
      window.removeEventListener("pointermove", mozgas);
      window.removeEventListener("pointerup", vege);
    };
  }, [pozicio]);

  const el = adat.xs - xp;
  const egyensuly = Math.abs(el) < 0.06;
  const szog = egyensuly ? 0 : Math.tanh(el * 1.3) * 10; // fok, a képernyőn pozitív = óramutató szerint

  const polyStr = T.poly.map((p) => `${px(p[0]).toFixed(1)},${py(p[1]).toFixed(1)}`).join(" ");
  const forgat = `rotate(${szog.toFixed(2)} ${px(xp).toFixed(1)} ${py(0).toFixed(1)})`;

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg
            ref={svgRef}
            viewBox={`0 0 ${SZ} ${MA}`}
            className="abra w-full cursor-ew-resize touch-none select-none"
            onPointerDown={(e) => {
              huzas.current = true;
              pozicio(e);
            }}
          >
            {/* talaj */}
            <line x1={20} y1={oy + 58} x2={SZ - 20} y2={oy + 58} stroke={SZURKE} strokeWidth="2" />
            {Array.from({ length: 22 }, (_, j) => (
              <line
                key={j}
                x1={24 + j * 24}
                y1={oy + 58}
                x2={14 + j * 24}
                y2={oy + 68}
                stroke={SZURKE}
                strokeWidth="1"
              />
            ))}

            <g transform={forgat}>
              <polygon
                points={polyStr}
                fill={egyensuly ? ZOLD : TEAL}
                fillOpacity="0.18"
                stroke={egyensuly ? ZOLD : TEAL}
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              {/* a súlypont */}
              <circle cx={px(adat.xs)} cy={py(adat.ys)} r="6" fill={NAR} stroke="white" strokeWidth="1.8" />
              <line
                x1={px(adat.xs)}
                y1={py(adat.ys)}
                x2={px(adat.xs)}
                y2={py(0)}
                stroke={NAR}
                strokeWidth="1.2"
                strokeDasharray="4 3"
              />
              <text
                x={px(adat.xs) + 12}
                y={py(adat.ys) - 12}
                fontSize="12.5"
                fontWeight="700"
                style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
              >
                S ({sz(adat.xs, 2)}; {sz(adat.ys, 2)})
              </text>
            </g>

            {/* a tű */}
            <g>
              <polygon
                points={`${px(xp)},${py(0)} ${px(xp) - 9},${oy + 56} ${px(xp) + 9},${oy + 56}`}
                fill={egyensuly ? ZOLD : "#475569"}
              />
              <circle cx={px(xp)} cy={py(0)} r="4.5" fill="white" stroke={egyensuly ? ZOLD : "#475569"} strokeWidth="2.2" />
            </g>

            <text
              x={16}
              y={26}
              fontSize="12.5"
              fontWeight="700"
              style={{
                fill: egyensuly ? ZOLD : "#b91c1c",
                paintOrder: "stroke",
                stroke: "white",
                strokeWidth: 3.5,
              }}
            >
              {egyensuly
                ? "Egyensúly — a tű a súlypont alatt van."
                : `A test ${el > 0 ? "jobbra" : "balra"} billen: a tű nincs a súlypont alatt.`}
            </text>
            <text
              x={px(xp)}
              y={oy + 84}
              fontSize="11.5"
              fontWeight="650"
              textAnchor="middle"
              style={{ fill: "#475569", paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              tű: x = {sz(xp, 2)}
            </text>
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a tűt vízszintesen (vagy kattints a rajzra). Egyensúly csak az xₛ súlyponti abszcisszánál van.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Tartomány</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {TARTOMANYOK.map((t, j) => (
              <button
                key={t.cimke}
                type="button"
                onClick={() => valt(j)}
                className={`rounded-lg px-2.5 py-1.5 text-[12px] font-medium transition ${
                  i === j
                    ? "bg-petrol-700 text-white"
                    : "bg-white text-petrol-600 ring-1 ring-petrol-200 hover:bg-petrol-50"
                }`}
              >
                {t.cimke}
              </button>
            ))}
          </div>

          <label className="mt-4 block">
            <span className="mb-1 flex items-baseline justify-between">
              <span className="text-[12.5px] font-medium text-petrol-600">A tű helye</span>
              <span className="szamok rounded-md bg-petrol-100 px-2 py-0.5 text-[12.5px] font-semibold text-petrol-800">
                x = {sz(xp, 2)}
              </span>
            </span>
            <input
              type="range"
              min={Math.round((xMin - 0.5) * 10) / 10}
              max={Math.round((xMax + 0.5) * 10) / 10}
              step={0.02}
              value={xp}
              onChange={(e) => setXp(Number(e.target.value))}
              className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-petrol-100 accent-[color:var(--color-naracs-500)]"
            />
          </label>

          <button
            type="button"
            onClick={() => setXp(Math.round(adat.xs * 100) / 100)}
            className="mt-2 rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-emerald-700 ring-1 ring-emerald-200 transition hover:bg-emerald-50"
          >
            Tedd a súlypont alá
          </button>

          <div className="szamok mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
              <p className="text-[11px] text-petrol-500">Terület, T</p>
              <p className="text-[14px] font-semibold text-petrol-900">{sz(adat.T, 3)}</p>
            </div>
            <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
              <p className="text-[11px] text-naracs-700">xₛ</p>
              <p className="text-[14px] font-semibold text-naracs-900">{sz(adat.xs, 3)}</p>
            </div>
            <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
              <p className="text-[11px] text-naracs-700">yₛ</p>
              <p className="text-[14px] font-semibold text-naracs-900">{sz(adat.ys, 3)}</p>
            </div>
          </div>

          <div className="szamok finom-gorgeto mt-3 space-y-1.5 overflow-x-auto rounded-xl bg-petrol-50 p-4 text-[13px] text-petrol-800">
            <div>
              <M>{"x_s=\\frac{S_y}{T}=\\frac{\\int_a^b xf\\,dx}{\\int_a^b f\\,dx},\\qquad y_s=\\frac{S_x}{T}=\\frac{\\frac12\\int_a^b f^2dx}{\\int_a^b f\\,dx}"}</M>
            </div>
            {T.kepletek.map((k2, j) => (
              <div key={j}>
                <M>{k2}</M>
              </div>
            ))}
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">{T.magyarazat}</p>
        </div>
      </div>
    </div>
  );
}
