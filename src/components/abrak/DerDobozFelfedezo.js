"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz, szK } from "@/lib/szamok";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const LILA = "#7c3aed";
const SZURKE = "#94a3b8";
const SOTET = "#1d3c48";

const V = (x) => x * (1 - 2 * x) * (1 - 2 * x);
const Vder = (x) => (1 - 2 * x) * (1 - 6 * x);
const XMAX = 1 / 6;
const VMAX = 2 / 27;

export default function DerDobozFelfedezo() {
  const [x, setX] = useState(0.1);

  const a = 1 - 2 * x;
  const h = x;
  const terfogat = V(x);
  const meredekseg = Vder(x);

  /* --- lemez (bal) --- */
  const bx = 34;
  const by = 46;
  const BL = 150; // 1 m = 150 px
  const c = BL * x;
  const kereszt = [
    [bx + c, by],
    [bx + BL - c, by],
    [bx + BL - c, by + c],
    [bx + BL, by + c],
    [bx + BL, by + BL - c],
    [bx + BL - c, by + BL - c],
    [bx + BL - c, by + BL],
    [bx + c, by + BL],
    [bx + c, by + BL - c],
    [bx, by + BL - c],
    [bx, by + c],
    [bx + c, by + c],
  ]
    .map((p) => p.join(","))
    .join(" ");

  /* --- doboz (jobb), egyszerű axonometria --- */
  const ox = 318;
  const oy = 198;
  const L = 108;
  const P = (X, Y, Z) => [ox + (X + Y * 0.45) * L, oy - (Z + Y * 0.26) * L];
  const alap = [P(0, 0, 0), P(a, 0, 0), P(a, a, 0), P(0, a, 0)];
  const felso = [P(0, 0, h), P(a, 0, h), P(a, a, h), P(0, a, h)];
  const sokszog = (pts) => pts.map((p) => p.join(",")).join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox="0 0 560 250" className="abra w-full touch-none select-none">
            {/* ---- a lemez felülnézete ---- */}
            <text x={bx + BL / 2} y={30} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOTET}>
              1 m × 1 m lemez
            </text>
            <rect x={bx} y={by} width={BL} height={BL} fill="none" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3 3" />
            <polygon points={kereszt} fill="#ccfbf1" stroke={TEAL} strokeWidth="2" />
            {/* kivágott sarkok */}
            {[
              [bx, by],
              [bx + BL - c, by],
              [bx, by + BL - c],
              [bx + BL - c, by + BL - c],
            ].map((p, i) => (
              <rect
                key={i}
                x={p[0]}
                y={p[1]}
                width={c}
                height={c}
                fill="#fee2e2"
                stroke="#dc2626"
                strokeWidth="1.3"
                strokeDasharray="4 3"
              />
            ))}
            {/* hajtásvonalak */}
            <rect
              x={bx + c}
              y={by + c}
              width={BL - 2 * c}
              height={BL - 2 * c}
              fill="none"
              stroke={NAR}
              strokeWidth="1.4"
              strokeDasharray="5 3"
            />
            {/* x méret */}
            <line x1={bx} y1={by + BL + 12} x2={bx + c} y2={by + BL + 12} stroke={NAR} strokeWidth="2" />
            <text x={bx + c / 2} y={by + BL + 26} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={NAR}>
              x
            </text>
            <line
              x1={bx + c}
              y1={by + BL + 12}
              x2={bx + BL - c}
              y2={by + BL + 12}
              stroke={TEAL}
              strokeWidth="2"
            />
            <text x={bx + BL / 2} y={by + BL + 26} textAnchor="middle" fontSize="11.5" fontWeight="700" fill={TEAL}>
              1 − 2x
            </text>

            {/* ---- a felhajtott doboz ---- */}
            <text x={ox + 60} y={30} textAnchor="middle" fontSize="12" fontWeight="700" fill={SOTET}>
              a felhajtott doboz
            </text>
            {/* alaplap */}
            <polygon points={sokszog(alap)} fill="#99f6e4" stroke={TEAL} strokeWidth="1.6" opacity="0.85" />
            {/* hátsó falak (halvány) */}
            <polygon
              points={sokszog([alap[3], alap[2], felso[2], felso[3]])}
              fill="#5eead4"
              stroke={TEAL}
              strokeWidth="1.2"
              opacity="0.45"
            />
            <polygon
              points={sokszog([alap[0], alap[3], felso[3], felso[0]])}
              fill="#5eead4"
              stroke={TEAL}
              strokeWidth="1.2"
              opacity="0.45"
            />
            {/* elülső falak */}
            <polygon
              points={sokszog([alap[0], alap[1], felso[1], felso[0]])}
              fill="#2dd4bf"
              stroke={TEAL}
              strokeWidth="1.8"
              opacity="0.7"
            />
            <polygon
              points={sokszog([alap[1], alap[2], felso[2], felso[1]])}
              fill="#14b8a6"
              stroke={TEAL}
              strokeWidth="1.8"
              opacity="0.6"
            />
            {/* felső perem */}
            <polygon points={sokszog(felso)} fill="none" stroke={NAR} strokeWidth="2.2" />
            {/* magasság jelölése */}
            <line x1={felso[1][0] + 10} y1={felso[1][1]} x2={alap[1][0] + 10} y2={alap[1][1]} stroke={NAR} strokeWidth="2" />
            <text x={felso[1][0] + 16} y={(felso[1][1] + alap[1][1]) / 2 + 4} fontSize="11.5" fontWeight="700" fill={NAR}>
              x
            </text>
            <text
              x={(alap[0][0] + alap[1][0]) / 2}
              y={alap[0][1] + 15}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              style={{ fill: TEAL, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              1 − 2x
            </text>
            <text x={ox + 70} y={242} textAnchor="middle" fontSize="12.5" fontWeight="700" fill={SOTET}>
              V = x(1 − 2x)² = {sz(terfogat, 4)} m³
            </text>
          </svg>

          <div className="mt-1">
            <FvRajz
              xMin={0}
              xMax={0.52}
              yMin={0}
              yMax={0.085}
              magassag={210}
              gorbek={[{ fn: V, szin: TEAL, vastag: 2.6, ig: 0.5 }]}
              pontok={[{ x, y: terfogat, szin: NAR, r: 5.5 }]}
              fuggoleges={[{ x: XMAX, szin: LILA }]}
              vizszintes={[{ y: VMAX, szin: LILA }]}
              tengelyCimkek={{ x: "x", y: "V" }}
              className="abra w-full select-none"
            >
              {(S) => (
                <g>
                  <line
                    x1={S.px(x)}
                    y1={S.py(terfogat)}
                    x2={S.px(x)}
                    y2={S.py(0)}
                    stroke={SZURKE}
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                  />
                  <text
                    x={S.px(XMAX) + 6}
                    y={S.py(VMAX) - 7}
                    fontSize="11.5"
                    fontWeight="700"
                    style={{ fill: LILA, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
                  >
                    max: 2/27 ≈ 0,0741
                  </text>
                </g>
              )}
            </FvRajz>
          </div>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Told a csúszkát: a kivágás nő, az alaplap zsugorodik. A térfogat (m³) előbb nő, aztán csökken —
            a vízszintes tengelyen a kivágás oldala méterben.
          </p>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">A kivágott négyzet oldala</p>
          <div className="mt-3">
            <Csuszka
              cimke="x"
              ertek={x}
              egyseg="m"
              min={0.005}
              max={0.495}
              lepes={0.005}
              tizedes={3}
              onChange={setX}
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {[0.05, 0.1, 1 / 6, 0.25, 0.4].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setX(Math.round(v * 200) / 200)}
                className="rounded-lg bg-white px-2.5 py-1.5 text-[12px] font-medium text-petrol-600 ring-1 ring-petrol-200 transition hover:bg-petrol-50"
              >
                {Math.abs(v - 1 / 6) < 1e-9 ? "1/6 ≈ 0,167" : sz(v, 2)}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
              <p className="text-[11px] text-petrol-500">alapél</p>
              <p className="szamok text-[14px] font-semibold text-petrol-900">{sz(a, 3)} m</p>
            </div>
            <div className="rounded-xl border border-petrol-200 bg-white px-2 py-2">
              <p className="text-[11px] text-petrol-500">magasság</p>
              <p className="szamok text-[14px] font-semibold text-petrol-900">{sz(h, 3)} m</p>
            </div>
            <div className="rounded-xl border border-naracs-200 bg-naracs-50 px-2 py-2">
              <p className="text-[11px] text-naracs-700">térfogat</p>
              <p className="szamok text-[14px] font-semibold text-naracs-900">{sz(terfogat, 4)} m³</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">A derivált most</p>
            <div className="szamok mt-2 text-[13.5px] text-petrol-800">
              <M>{`V'(x) = (1-2x)(1-6x)`}</M>
            </div>
            <div className="szamok mt-1 text-[13.5px] text-petrol-800">
              <M>{`V'(${szK(x, 3)}) = ${szK(meredekseg, 4)}`}</M>
            </div>
            <p className="mt-2 text-[12.5px] text-petrol-600">
              {meredekseg > 0.0005
                ? "Pozitív: még érdemes nagyobb kivágást választani, a térfogat nő."
                : meredekseg < -0.0005
                  ? "Negatív: túl sokat vágtál ki, az alaplap már túl kicsi — a térfogat csökken."
                  : "Gyakorlatilag nulla: itt van a maximum."}
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-[13px] leading-relaxed text-violet-900">
            <p className="szamok font-semibold">
              Optimum: x = 1/6 ≈ 0,1667 m (16,7 cm), V = 2/27 ≈ 0,0741 m³ ≈ 74 liter
            </p>
            <p className="mt-1">
              Ott az alapél 2/3 m, a magasság 1/6 m: a doboz négyszer olyan széles, mint amilyen magas. A{" "}
              <span className="szamok">x = 1/2</span> gyök a tartomány széle — ott a térfogat nulla, tehát nem
              maximum.
            </p>
          </div>

          <div className="mt-3 rounded-xl border border-petrol-200 bg-white px-4 py-3 text-[12.5px] text-petrol-600">
            Az aktuális térfogat a maximum{" "}
            <span className="szamok font-semibold text-petrol-900">{sz((terfogat / VMAX) * 100, 1)}%</span>-a.
          </div>
        </div>
      </div>
    </div>
  );
}
