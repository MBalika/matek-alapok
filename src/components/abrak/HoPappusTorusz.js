"use client";

import { useEffect, useRef, useState } from "react";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";

const SZ = 560;
const MA = 380;

export default function HoPappusTorusz() {
  const [R, setR] = useState(2.4);
  const [r, setR2] = useState(0.8);
  const [fok, setFok] = useState(120);
  const [jatszik, setJatszik] = useState(false);
  const raf = useRef(null);

  useEffect(() => {
    if (!jatszik) return undefined;
    let utolso = performance.now();
    const lep = (most) => {
      const dt = most - utolso;
      utolso = most;
      setFok((f) => {
        const uj = f + dt * 0.055;
        return uj >= 360 ? 360 : uj;
      });
      raf.current = requestAnimationFrame(lep);
    };
    raf.current = requestAnimationFrame(lep);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [jatszik]);

  useEffect(() => {
    if (fok >= 360 && jatszik) setJatszik(false);
  }, [fok, jatszik]);

  const T = r * r * Math.PI;
  const K = 2 * r * Math.PI;
  const V = 2 * Math.PI * R * T;
  const A = 2 * Math.PI * R * K;

  /* vetítés */
  const ox = 268;
  const cy = 190;
  const leptek = Math.min(150 / (R + r), 46);
  const k = leptek;
  const ky = leptek;
  const lapit = 0.38;
  const px = (x, ro, fi) => ox + x * k + ro * Math.sin(fi) * k * lapit;
  const py = (ro, fi) => cy - ro * Math.cos(fi) * ky;

  const rad = (fok * Math.PI) / 180;

  /** Egy generáló kör a φ szögnél. */
  const korUt = (fi, db = 60) => {
    let d = "";
    for (let j = 0; j <= db; j++) {
      const t = (2 * Math.PI * j) / db;
      const x = r * Math.cos(t);
      const ro = R + r * Math.sin(t);
      d += `${j ? "L" : "M"}${px(x, ro, fi).toFixed(1)},${py(ro, fi).toFixed(1)} `;
    }
    return `${d}Z`;
  };

  /** A súlypont pályája 0-tól φ-ig. */
  const palya = (() => {
    let d = "";
    const db = Math.max(2, Math.round((fok / 360) * 90));
    for (let j = 0; j <= db; j++) {
      const fi = (rad * j) / db;
      d += `${j ? "L" : "M"}${px(0, R, fi).toFixed(1)},${py(R, fi).toFixed(1)} `;
    }
    return d;
  })();

  const kozbulso = [];
  for (let f = 0; f <= fok - 1; f += 15) kozbulso.push((f * Math.PI) / 180);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            {/* forgástengely */}
            <line x1={40} y1={cy} x2={SZ - 24} y2={cy} stroke="#475569" strokeWidth="1.4" strokeDasharray="8 5" />
            <text x={SZ - 20} y={cy + 4} fontSize="12" fontStyle="italic" fill="#475569">
              x
            </text>
            <text
              x={54}
              y={cy - 8}
              fontSize="11.5"
              fontWeight="650"
              style={{ fill: "#475569", paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              forgástengely
            </text>

            {/* a súlypont teljes pályája halványan */}
            <ellipse
              cx={ox}
              cy={cy}
              rx={R * k * lapit}
              ry={R * ky}
              fill="none"
              stroke={SZURKE}
              strokeWidth="1"
              strokeDasharray="4 4"
            />

            {/* a köztes helyzetek */}
            {kozbulso.map((fi, j) => (
              <path
                key={j}
                d={korUt(fi, 42)}
                fill={TEAL}
                fillOpacity="0.05"
                stroke={TEAL}
                strokeWidth="0.9"
                opacity="0.5"
              />
            ))}

            {/* a kiinduló és az aktuális helyzet */}
            <path d={korUt(0)} fill={TEAL} fillOpacity="0.16" stroke={TEAL} strokeWidth="2.2" />
            <path d={korUt(rad)} fill={NAR} fillOpacity="0.2" stroke={NAR} strokeWidth="2.4" />

            {/* a súlypont pályája */}
            <path d={palya} fill="none" stroke={LILA} strokeWidth="2.6" />
            <circle cx={px(0, R, 0)} cy={py(R, 0)} r="4.5" fill={LILA} stroke="white" strokeWidth="1.4" />
            <circle cx={px(0, R, rad)} cy={py(R, rad)} r="5.5" fill={LILA} stroke="white" strokeWidth="1.6" />

            {/* R és r jelölése a kiinduló helyzetben */}
            <line x1={ox} y1={cy} x2={px(0, R, 0)} y2={py(R, 0)} stroke={LILA} strokeWidth="1.6" />
            <text
              x={ox - 8}
              y={cy - (R * ky) / 2}
              fontSize="12.5"
              fontWeight="700"
              textAnchor="end"
              style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              R = {sz(R, 1)}
            </text>
            <line
              x1={px(0, R, 0)}
              y1={py(R, 0)}
              x2={px(r, R, 0)}
              y2={py(R, 0)}
              stroke={TEAL}
              strokeWidth="1.6"
            />
            <text
              x={px(0, R, 0)}
              y={py(R, 0) - r * ky - 10}
              fontSize="12.5"
              fontWeight="700"
              textAnchor="middle"
              style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              r = {sz(r, 1)}
            </text>

            <text
              x={16}
              y={26}
              fontSize="12.5"
              fontWeight="700"
              style={{ fill: NAR, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              elfordulás: {Math.round(fok)}°
            </text>
            <text
              x={16}
              y={MA - 16}
              fontSize="12"
              fontWeight="650"
              style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              a súlypont útja: 2πR = {sz(2 * Math.PI * R, 3)}
            </text>
          </svg>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
            Pappus–Guldin egy mondatban
          </p>
          <p className="mt-1.5 text-[13.5px] leading-relaxed text-petrol-700">
            A keletkező test térfogata = a forgatott síkidom területe <strong>szorozva</strong> azzal az úttal,
            amit a <strong>súlypontja</strong> megtesz. Felszínnél ugyanez a görbe ívhosszával.
          </p>

          <div className="mt-4 space-y-3">
            <Csuszka cimke="A kör középpontjának távolsága, R" ertek={R} min={1.5} max={3.4} lepes={0.1} tizedes={1} onChange={setR} />
            <Csuszka cimke="A kör sugara, r" ertek={r} min={0.3} max={1.2} lepes={0.05} tizedes={2} onChange={setR2} />
            <Csuszka
              cimke="Elfordulás"
              ertek={fok}
              egyseg="°"
              min={0}
              max={360}
              lepes={1}
              tizedes={0}
              onChange={(v) => {
                setJatszik(false);
                setFok(v);
              }}
            />
          </div>

          <button
            type="button"
            onClick={() => {
              if (fok >= 359) setFok(0);
              setJatszik((v) => !v);
            }}
            className="mt-3 rounded-lg bg-naracs-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-naracs-600"
          >
            {jatszik ? "❚❚ Állj" : "▶ Forgatás"}
          </button>

          <div className="szamok mt-4 space-y-1.5 rounded-xl bg-petrol-50 p-4 text-[13px] text-petrol-800">
            <div className="flex items-baseline justify-between">
              <span>
                a kör területe <M>{"T=r^2\\pi"}</M>
              </span>
              <span className="font-semibold">{sz(T, 3)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span>
                a kör kerülete <M>{"K=2r\\pi"}</M>
              </span>
              <span className="font-semibold">{sz(K, 3)}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-petrol-200 pt-1.5">
              <span>
                a súlypont útja <M>{"2\\pi R"}</M>
              </span>
              <span className="font-semibold">{sz(2 * Math.PI * R, 3)}</span>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
              <p className="text-[11px] text-naracs-700">
                <M>{"V=2\\pi R\\,T=2\\pi^2Rr^2"}</M>
              </p>
              <p className="szamok text-[15px] font-semibold text-naracs-900">{sz(V, 3)}</p>
            </div>
            <div className="rounded-xl border border-violet-200 bg-violet-50 px-2 py-2">
              <p className="text-[11px] text-violet-700">
                <M>{"A=2\\pi R\\,K=4\\pi^2Rr"}</M>
              </p>
              <p className="szamok text-[15px] font-semibold text-violet-900">{sz(A, 3)}</p>
            </div>
          </div>

          <div className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-[13px] leading-relaxed text-emerald-900">
            Miért igaz? Mert <M>{"V=\\pi\\int f^2dx = 2\\pi\\cdot\\frac12\\int f^2dx = 2\\pi S_x = 2\\pi y_s T"}</M> —
            a Pappus–Guldin-tétel nem új képlet, hanem a statikai nyomaték átírása. A tórusznál ezért nem kell
            egyetlen integrált sem kiszámolni: a kör területét és a súlypont körpályáját összeszorozva kész.
          </div>

          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-500">
            Próbáld ki: ha <M>{"r"}</M>-et megduplázod, a térfogat <strong>négyszereződik</strong> (mert{" "}
            <M>{"r^2"}</M>), a felszín viszont csak kétszereződik. Ha <M>{"R"}</M>-et duplázod, mindkettő pontosan
            kétszereződik.
          </p>
        </div>
      </div>
    </div>
  );
}
