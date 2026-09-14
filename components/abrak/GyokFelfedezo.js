"use client";

import { useRef, useState } from "react";
import { Cimke, Fogopont, Nyil, NyilHegyek, SzogIv, Tengelyek } from "./SvgElemek";
import { M, MB } from "@/components/ui/Keplet";
import { normalizalSzog, sz, szK } from "@/lib/szamok";
import { K, abszolut, argFok, algK, gyokok, polarbol } from "@/lib/komplex";
import { Csuszka } from "./Csuszka";

const SZ = 560;
const MA = 380;
const OX = 280;
const OY = 190;
const LEPTEK = 40;

export default function GyokFelfedezo() {
  const [z, setZ] = useState(polarbol(4, 120));
  const [n, setN] = useState(3);
  const svgRef = useRef(null);

  const r = abszolut(z);
  const fi = argFok(z);
  const w = gyokok(z, n);
  const rho = w[0].r;

  const P = (p) => [OX + p.a * LEPTEK, OY - p.b * LEPTEK];
  const [zx, zy] = P(z);

  const huzas = (ev) => {
    ev.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const mozgat = (esem) => {
      const rect = svg.getBoundingClientRect();
      const px = ((esem.clientX - rect.left) / rect.width) * SZ;
      const py = ((esem.clientY - rect.top) / rect.height) * MA;
      const a = (px - OX) / LEPTEK;
      const b = (OY - py) / LEPTEK;
      const rr = Math.max(0.3, Math.min(4.4, Math.round(Math.hypot(a, b) * 10) / 10));
      const fok = Math.round(normalizalSzog((Math.atan2(b, a) * 180) / Math.PI));
      setZ(polarbol(rr, fok));
    };
    mozgat(ev);
    const vege = () => {
      window.removeEventListener("pointermove", mozgat);
      window.removeEventListener("pointerup", vege);
    };
    window.addEventListener("pointermove", mozgat);
    window.addEventListener("pointerup", vege);
  };

  const sokszog = w.map((p) => P(p).join(",")).join(" ");

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--keret)] bg-white">
      <div className="grid lg:grid-cols-[1.3fr_1fr]">
        <div className="racs-vilagos border-b border-[color:var(--keret)] p-3 lg:border-r lg:border-b-0">
          <svg ref={svgRef} viewBox={`0 0 ${SZ} ${MA}`} className="abra w-full touch-none select-none">
            <NyilHegyek />
            <Tengelyek ox={OX} oy={OY} balra={265} jobbra={265} fel={175} le={175} xCimke="Re" yCimke="Im" />

            {/* a gyökök köre és a szabályos sokszög */}
            <circle cx={OX} cy={OY} r={rho * LEPTEK} fill="none" stroke="#a78bfa" strokeWidth="1.2" strokeDasharray="4 3" />
            <polygon points={sokszog} fill="rgba(124,58,237,0.06)" stroke="#8b5cf6" strokeWidth="1.3" />

            {/* z */}
            <SzogIv ox={OX} oy={OY} sugar={40} kezdoFok={0} vegFok={fi} szin="var(--color-jel-ero)" cimke="φ" />
            <Nyil x1={OX} y1={OY} x2={zx} y2={zy} szin="ero" vastagsag={3.2} />
            <Cimke x={zx + (z.a >= 0 ? 14 : -14)} y={zy - 12} szin="var(--color-jel-ero)">z</Cimke>

            {/* gyökök */}
            {w.map((p) => {
              const [x, y] = P(p);
              return (
                <g key={p.k}>
                  <line x1={OX} y1={OY} x2={x} y2={y} stroke="var(--color-jel-eredo)" strokeWidth="1.6" opacity="0.7" />
                  <circle cx={x} cy={y} r="5.5" fill="var(--color-jel-eredo)" stroke="white" strokeWidth="1.8" />
                  <Cimke x={x + (p.a >= 0 ? 18 : -18)} y={y + (p.b >= 0 ? -10 : 18)} szin="var(--color-jel-eredo)" meret={12}>
                    w{"₀₁₂₃₄₅₆₇"[p.k]}
                  </Cimke>
                </g>
              );
            })}
            <SzogIv ox={OX} oy={OY} sugar={22} kezdoFok={0} vegFok={w[0].fok} szin="var(--color-jel-eredo)" />

            <Fogopont x={zx} y={zy} onPointerDown={huzas} />
          </svg>
          <p className="mt-1 text-center text-[11.5px] text-petrol-400">
            Húzd a z pontot, és állítsd az n értékét. A lila pontok az n-edik gyökök.
          </p>
        </div>

        <div className="p-5">
          <Csuszka cimke="A gyök kitevője, n" ertek={n} min={2} max={8} lepes={1} tizedes={0} onChange={setN} />

          <div className="mt-4 rounded-xl bg-petrol-50 p-4">
            <p className="text-[10.5px] font-bold tracking-[0.16em] text-petrol-500 uppercase">
              A gyökök képlete
            </p>
            <div className="szamok mt-2 space-y-1.5 text-[13.5px] text-petrol-800">
              <div><M>{`z = ${szK(r, 2)}\\,(\\cos ${szK(fi, 0)}^\\circ + i\\sin ${szK(fi, 0)}^\\circ)`}</M></div>
              <div><M>{`\\rho = \\sqrt[${n}]{${szK(r, 2)}} = ${szK(rho, 3)}`}</M></div>
              <div><M>{`\\alpha_k = \\dfrac{${szK(fi, 0)}^\\circ + k\\cdot 360^\\circ}{${n}},\\quad k = 0,\\dots,${n - 1}`}</M></div>
            </div>
          </div>

          <div className="mt-3 overflow-hidden rounded-xl border border-violet-200">
            <table className="szamok w-full text-[12.5px]">
              <thead className="bg-violet-50 text-[10.5px] text-violet-800 uppercase">
                <tr>
                  <th className="px-2.5 py-1.5 text-left font-semibold">k</th>
                  <th className="px-2.5 py-1.5 text-left font-semibold">αₖ</th>
                  <th className="px-2.5 py-1.5 text-left font-semibold">wₖ</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {w.map((p) => (
                  <tr key={p.k} className="border-t border-violet-100">
                    <td className="px-2.5 py-1">{p.k}</td>
                    <td className="px-2.5 py-1">{sz(p.fok, 1)}°</td>
                    <td className="px-2.5 py-1">
                      <M>{algK(K(p.a, p.b), 3)}</M>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-[12px] text-petrol-500">
            Szomszédos gyökök szöge: {sz(360 / n, 1)}°. Mind a {n} gyök a{" "}
            {sz(rho, 2)} sugarú körön van, szabályos {n}-szöget alkotva.
          </p>
        </div>
      </div>
    </div>
  );
}
