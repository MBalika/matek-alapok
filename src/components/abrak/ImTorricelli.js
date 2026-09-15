"use client";

import { useState } from "react";
import FvRajz from "./FvRajz";
import { Csuszka } from "./Csuszka";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";
import { simpson } from "./ImNumerika";

const TEAL = "#0f766e";
const NAR = "#e2590a";
const SOTET = "#1d3c48";

const SZ = 560;
const MA = 262;
const OX = 56;
const SZEL = 462;
const XMAX = 12;
const Y0 = 138;
const R0 = 76; // az x = 1 helyen a sugár képpontban

const X = (x) => OX + ((x - 1) / (XMAX - 1)) * SZEL;
const R = (x) => R0 / x;

/** A palást integrandusa: (1/x)·√(1 + 1/x⁴). */
const palast = (x) => (1 / x) * Math.sqrt(1 + 1 / Math.pow(x, 4));

const terfogat = (d) => Math.PI * (1 - 1 / d);
const felszin = (d) => (d <= 1 ? 0 : 2 * Math.PI * simpson(palast, 1, d, 800));

export default function ImTorricelli() {
  const [d, setD] = useState(4);

  const V = terfogat(d);
  const F = felszin(d);

  // körkeresztmetszetek
  const korongok = [];
  for (let k = 0; k <= 14; k++) {
    const x = 1 + ((d - 1) * k) / 14;
    if (x > 1.0001) korongok.push(x);
  }

  let felso = "";
  let also = "";
  for (let k = 0; k <= 160; k++) {
    const x = 1 + ((d - 1) * k) / 160;
    felso += `${k ? "L" : "M"}${X(x).toFixed(1)},${(Y0 - R(x)).toFixed(1)} `;
    also = `L${X(x).toFixed(1)},${(Y0 + R(x)).toFixed(1)} ${also}`;
  }

  const tablazat = [10, 100, 1000, 10000].map((D) => ({
    D,
    V: terfogat(D),
    F: 2 * Math.PI * Math.log(D), // a 2π·ln d alsó becslés, nagy d-re gyakorlatilag a felszín
  }));

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            {/* tengely */}
            <line x1={OX - 24} y1={Y0} x2={OX + SZEL + 14} y2={Y0} stroke="#94a3b8" strokeWidth="1.1" strokeDasharray="6 4" />
            <text x={OX + SZEL + 18} y={Y0 + 4} fontSize="11" fontStyle="italic" fill="#64748b">
              x
            </text>

            {/* a test palástja */}
            <path d={`${felso} ${also} Z`} fill="#99f6e4" fillOpacity="0.55" stroke="none" />
            <path d={felso} fill="none" stroke={TEAL} strokeWidth="2.4" />
            <path d={also.replace(/^L/, "M")} fill="none" stroke={TEAL} strokeWidth="2.4" opacity="0.55" />

            {/* keresztmetszetek */}
            {korongok.map((x, k) => (
              <ellipse
                key={k}
                cx={X(x)}
                cy={Y0}
                rx={Math.max(2, R(x) * 0.22)}
                ry={R(x)}
                fill="none"
                stroke={TEAL}
                strokeWidth="0.9"
                opacity="0.4"
              />
            ))}

            {/* a nyílás x = 1-nél */}
            <ellipse cx={X(1)} cy={Y0} rx={R0 * 0.22} ry={R0} fill="#5eead4" fillOpacity="0.5" stroke={TEAL} strokeWidth="2.4" />
            {/* a vágás d-nél */}
            <ellipse cx={X(d)} cy={Y0} rx={Math.max(2, R(d) * 0.22)} ry={R(d)} fill="#fed7aa" fillOpacity="0.8" stroke={NAR} strokeWidth="2" />

            {/* feliratok */}
            <text x={X(1) - 22} y={Y0 - R0 - 12} fontSize="11.5" fontWeight="650" fill={TEAL}>
              x = 1
            </text>
            <text x={X(d)} y={Y0 - R(d) - 12} fontSize="11.5" fontWeight="650" fill={NAR} textAnchor="middle">
              x = {sz(d, 1)}
            </text>
            <text
              x={X(2.1)}
              y={Y0 - R(2.1) - 10}
              fontSize="12"
              fontWeight="650"
              style={{ fill: SOTET, paintOrder: "stroke", stroke: "white", strokeWidth: 3.5 }}
            >
              y = 1/x forgatva
            </text>

            {/* mérőszámok */}
            <rect x={OX} y={MA - 74} width={232} height={30} rx="7" fill="#ecfdf5" stroke="#a7f3d0" />
            <text x={OX + 12} y={MA - 54} fontSize="12.5" fontWeight="650" fill="#047857">
              Térfogat: {sz(V, 4)} → π = 3,1416
            </text>
            <rect x={OX + 244} y={MA - 74} width={218} height={30} rx="7" fill="#fff1f2" stroke="#fecdd3" />
            <text x={OX + 256} y={MA - 54} fontSize="12.5" fontWeight="650" fill="#be123c">
              Felszín: {sz(F, 3)} → ∞
            </text>
            <text x={SZ / 2} y={MA - 16} fontSize="11.5" fill="#64748b" textAnchor="middle">
              A térfogat 1/x², a felszín 1/x szerint halmozódik — ez a p = 1 határ két oldala.
            </text>
          </svg>

          <FvRajz
            xMin={1}
            xMax={XMAX}
            yMin={0}
            yMax={17}
            magassag={172}
            tengelyCimkek={{ x: "d", y: "" }}
            gorbek={[
              { fn: terfogat, szin: "#047857", vastag: 2.6, cimke: "V(d)", cimkeX: 9 },
              { fn: (u) => 2 * Math.PI * Math.log(u), szin: "#be123c", vastag: 2.6, cimke: "F(d) alsó becslése", cimkeX: 6.2 },
            ]}
            vizszintes={[{ y: Math.PI, szin: "#047857" }]}
          >
            {(S) => (
              <g>
                <circle cx={S.px(d)} cy={S.py(Math.min(V, 17))} r="4.5" fill="#047857" stroke="white" strokeWidth="1.5" />
                <circle cx={S.px(d)} cy={S.py(Math.min(F, 17))} r="4.5" fill="#be123c" stroke="white" strokeWidth="1.5" />
                <text x={S.margo.bal + 6} y={S.py(Math.PI) - 7} fontSize="11" fontWeight="650" fill="#047857">
                  π
                </text>
              </g>
            )}
          </FvRajz>
        </div>

        <div className="p-5">
          <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Gábriel kürtje</p>
          <p className="mt-2 text-[13.5px] leading-relaxed text-petrol-700">
            Forgasd meg az <M>{"y = 1/x"}</M> görbe <M>{"x \\ge 1"}</M> részét az <M>{"x"}</M> tengely körül, és vágd
            el a <M>{"d"}</M> helyen. Told a csúszkát: a térfogat beáll, a felszín nem.
          </p>

          <div className="mt-4">
            <Csuszka cimke="A levágás helye, d" ertek={d} min={1.2} max={12} lepes={0.1} tizedes={1} onChange={setD} />
          </div>

          <div className="mt-4 space-y-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <p className="text-[11px] font-bold tracking-[0.14em] text-emerald-700 uppercase">Térfogat</p>
              <div className="szamok mt-1 text-[13.5px] text-petrol-900">
                <M>{`V(d) = \\pi\\int_1^{d}\\frac{dx}{x^2} = \\pi\\left(1-\\frac1d\\right) = ${sz(V, 4).replace(",", "{,}")}`}</M>
              </div>
            </div>
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
              <p className="text-[11px] font-bold tracking-[0.14em] text-rose-700 uppercase">Felszín</p>
              <div className="szamok mt-1 text-[13.5px] text-petrol-900">
                <M>{`F(d) = 2\\pi\\int_1^{d}\\frac1x\\sqrt{1+\\frac{1}{x^4}}\\,dx = ${sz(F, 3).replace(",", "{,}")}`}</M>
              </div>
              <p className="mt-1 text-[12.5px] text-petrol-700">
                Alulról becsülve <M>{"F(d) \\ge 2\\pi\\ln d"}</M>, ami minden határon túl nő.
              </p>
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-petrol-100">
            <table className="szamok w-full text-[12.5px]">
              <thead className="bg-petrol-50 text-petrol-500">
                <tr>
                  <th className="px-3 py-1.5 text-left font-semibold">d</th>
                  <th className="px-3 py-1.5 text-right font-semibold">V(d)</th>
                  <th className="px-3 py-1.5 text-right font-semibold">F(d) ≥</th>
                </tr>
              </thead>
              <tbody className="text-petrol-800">
                {tablazat.map((s) => (
                  <tr key={s.D} className="border-t border-petrol-100">
                    <td className="px-3 py-1">{s.D}</td>
                    <td className="px-3 py-1 text-right">{sz(s.V, 4)}</td>
                    <td className="px-3 py-1 text-right">{sz(s.F, 1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-3 rounded-xl border border-violet-200 bg-violet-50 px-4 py-3">
            <p className="text-[11px] font-bold tracking-[0.14em] text-violet-700 uppercase">Festék-paradoxon</p>
            <p className="mt-1 text-[13px] leading-relaxed text-petrol-800">
              A kürt <M>{"\\pi"}</M> egységnyi festékkel <strong>tele tölthető</strong>, a belső falát mégsem lehetne{" "}
              <strong>befesteni</strong> — ahhoz végtelen sok festék kellene. A feloldás: a felszínszámítás nulla
              vastagságú réteget feltételez, a kitöltésnél viszont a réteg vastagsága a cső sugarával együtt fogy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
