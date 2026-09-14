"use client";

import { useEffect, useRef, useState } from "react";
import { M } from "@/components/ui/Keplet";
import { sz } from "@/lib/szamok";
import { Csuszka } from "./Csuszka";

/** Forgó mutató: z(t) = R·e^{iωt} a síkon, mellette a vetülete mint szinuszhullám. */
export default function ForgoMutato() {
  const [omega, setOmega] = useState(1.2); // rad/s
  const [R, setR] = useState(1);
  const [fazis, setFazis] = useState(0); // fok
  const [fut, setFut] = useState(true);
  const [t, setT] = useState(0);
  const tRef = useRef(0);
  const utolso = useRef(null);

  useEffect(() => {
    if (!fut) {
      utolso.current = null;
      return undefined;
    }
    let raf;
    const lepes = (most) => {
      if (utolso.current == null) utolso.current = most;
      const dt = (most - utolso.current) / 1000;
      utolso.current = most;
      tRef.current += dt;
      setT(tRef.current);
      raf = requestAnimationFrame(lepes);
    };
    raf = requestAnimationFrame(lepes);
    return () => cancelAnimationFrame(raf);
  }, [fut]);

  // geometria
  const CX = 150, CY = 150, L = 95; // kör
  const GX = 300, GW = 250; // grafikon
  const fi0 = (fazis * Math.PI) / 180;
  const szog = omega * t + fi0;
  const x = R * Math.cos(szog);
  const y = R * Math.sin(szog);
  const px = CX + x * L;
  const py = CY - y * L;

  // szinuszhullám: az elmúlt T ablak, a mostani érték a bal szélen
  const ABLAK = 8; // másodperc
  const pontok = [];
  for (let i = 0; i <= 160; i++) {
    const tau = (i / 160) * ABLAK;
    const yy = R * Math.sin(omega * (t - tau) + fi0);
    pontok.push(`${(GX + (i / 160) * GW).toFixed(1)},${(CY - yy * L).toFixed(1)}`);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.45fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg viewBox="0 0 570 322" className="abra w-full select-none">
            <defs>
              <marker id="fm-h" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 1 L 9 5 L 0 9 z" fill="#e2590a" />
              </marker>
            </defs>
            {/* tengelyek a körhöz */}
            <line x1={CX - 125} y1={CY} x2={CX + 125} y2={CY} stroke="#94a3b8" strokeWidth="1" />
            <line x1={CX} y1={CY + 125} x2={CX} y2={CY - 125} stroke="#94a3b8" strokeWidth="1" />
            <text x={CX + 116} y={CY + 14} fontSize="11" fontStyle="italic" fill="#64748b">Re</text>
            <text x={CX + 6} y={CY - 114} fontSize="11" fontStyle="italic" fill="#64748b">Im</text>
            <circle cx={CX} cy={CY} r={R * L} fill="none" stroke="#cbd5e1" strokeWidth="1.2" strokeDasharray="4 3" />

            {/* a mutató */}
            <line x1={CX} y1={CY} x2={px} y2={py} stroke="#e2590a" strokeWidth="3" strokeLinecap="round" markerEnd="url(#fm-h)" />
            <circle cx={px} cy={py} r="5" fill="#e2590a" stroke="white" strokeWidth="1.5" />
            {/* vetület a képzetes tengelyre */}
            <line x1={px} y1={py} x2={CX} y2={py} stroke="#0f766e" strokeWidth="1.2" strokeDasharray="4 3" />
            <circle cx={CX} cy={py} r="4" fill="#0f766e" />
            {/* összekötés a grafikon bal szélével */}
            <line x1={CX} y1={py} x2={GX} y2={py} stroke="#0f766e" strokeWidth="1" strokeDasharray="2 4" opacity="0.7" />

            <text x={CX - 125} y={300} fontSize="11.5" fontWeight="600" fill="#e2590a">z(t) = R·e^(iωt) — forog</text>
            <text x={CX - 125} y={315} fontSize="11" fill="#0f766e">Im z(t) = R·sin(ωt + φ₀) — rezeg</text>

            {/* grafikon */}
            <line x1={GX} y1={CY} x2={GX + GW + 8} y2={CY} stroke="#94a3b8" strokeWidth="1" />
            <line x1={GX} y1={CY + 120} x2={GX} y2={CY - 120} stroke="#94a3b8" strokeWidth="1" />
            <text x={GX + GW + 4} y={CY + 16} fontSize="11" fontStyle="italic" fill="#64748b" textAnchor="end">t (múlt →)</text>
            <polyline points={pontok.join(" ")} fill="none" stroke="#0f766e" strokeWidth="2.2" />
            <circle cx={GX} cy={py} r="4.5" fill="#0f766e" stroke="white" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="p-5">
          <div className="space-y-4">
            <Csuszka cimke="Körfrekvencia, ω" ertek={omega} egyseg="rad/s" min={0.2} max={4} lepes={0.1} tizedes={1} onChange={setOmega} />
            <Csuszka cimke="Amplitúdó, R" ertek={R} min={0.3} max={1.2} lepes={0.05} tizedes={2} onChange={setR} />
            <Csuszka cimke="Fázis, φ₀" ertek={fazis} egyseg="°" min={0} max={360} lepes={5} tizedes={0} onChange={setFazis} />
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => setFut((v) => !v)} className="rounded-lg bg-naracs-500 px-3.5 py-1.5 text-[12.5px] font-semibold text-white transition hover:bg-naracs-600">
              {fut ? "❚❚ Szünet" : "▶ Indítás"}
            </button>
            <button type="button" onClick={() => { tRef.current = 0; setT(0); }} className="rounded-lg bg-white px-3 py-1.5 text-[12.5px] font-medium text-petrol-700 ring-1 ring-petrol-200 transition hover:bg-petrol-50">
              ↺ Nullázás
            </button>
          </div>

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">Most</p>
            <div className="szamok mt-2 space-y-1.5 text-[13.5px] text-petrol-800">
              <div><M>{`\\omega t + \\varphi_0 = ${sz((((szog * 180) / Math.PI) % 360 + 360) % 360, 0)}^\\circ`}</M></div>
              <div><M>{`z(t) = ${sz(x, 2)} ${y < 0 ? "-" : "+"} ${sz(Math.abs(y), 2)}\\,i`}</M></div>
              <div><M>{`T = 2\\pi/\\omega = ${sz((2 * Math.PI) / omega, 2)}\\ \\text{s}`}</M></div>
            </div>
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-petrol-600">
            Egy harmonikus rezgés nem más, mint egy egyenletesen forgó komplex szám vetülete. Ezért írja a mérnök a
            rezgést <M>{"R e^{i\\omega t}"}</M> alakban: az amplitúdó és a fázis egyetlen komplex számban van, a
            deriválás pedig <M>{"i\\omega"}</M>-val való szorzás — vagyis 90°-os forgatás.
          </p>
        </div>
      </div>
    </div>
  );
}
